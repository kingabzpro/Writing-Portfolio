import os
import re
from datetime import datetime


def get_pages():
    """Get list of available pages."""
    pages_dir = os.path.join(os.path.dirname(__file__), "pages")
    pages = [f for f in os.listdir(pages_dir) if f.endswith(".md")]
    return pages


def add_to_specific_page(page_name, title, url):
    """Add link to specific category page."""
    page_path = os.path.join(os.path.dirname(__file__), "pages", page_name)

    with open(page_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Create new link in markdown format (without excerpt)
    new_link = f"\n- [{title}]({url})\n"

    # Find the back button and insert the new link before it
    back_button_match = re.search(
        r'<a href="/".*?Back to Home.*?</a>', content, re.DOTALL
    )
    if back_button_match:
        insert_point = back_button_match.start()
        # Add a newline before the back button
        updated_content = (
            content[:insert_point] + new_link + "\n" + content[insert_point:]
        )
    else:
        # If no back button found, add at the end
        updated_content = content + new_link

    with open(page_path, "w", encoding="utf-8") as f:
        f.write(updated_content)


def add_to_latest_content(title, url, excerpt):
    """Add link to Latest Content section on front page, maintaining only 4 latest links."""
    index_path = os.path.join(os.path.dirname(__file__), "index.md")

    with open(index_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Create new card for latest content (compact design with improved styling)
    new_card = f'''
  <div class="content-card" style="background: var(--sidebar-bg); padding: 1rem; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); transition: transform 0.2s ease; border: 1px solid rgba(255,255,255,0.1);">
    <p style="margin: 0;"><a href="{url}" style="text-decoration: none; color: var(--primary-color); font-size: 0.95em; font-weight: bold;">{title}</a></p>
    <p style="font-size: 0.85em; color: var(--body-color-light); margin: 0.5rem 0; line-height: 1.4;">{excerpt}</p>
    <small style="color: var(--body-color-light); font-size: 0.8em; opacity: 0.8;">Added: {datetime.now().strftime("%Y-%m-%d")}</small>
  </div>'''

    # Find the Latest Content section
    latest_section_match = re.search(
        r'(## 🆕 Latest Content\s*\n\s*<div class="content-grid.*?>)(.*?)(\s*</div>)',
        content,
        re.DOTALL,
    )
    if latest_section_match:
        section_start, existing_cards, section_end = latest_section_match.groups()

        # Split existing cards into list
        cards = re.findall(
            r'(<div class="content-card".*?</div>)', existing_cards, re.DOTALL
        )

        # Add new card at the beginning
        cards.insert(0, new_card.strip())

        # Keep only the 4 most recent cards
        cards = cards[:4]

        # Join cards back together
        updated_cards = "\n".join(cards)

        # Update the content
        updated_content = (
            content[: latest_section_match.start()]
            + section_start
            + "\n"
            + updated_cards
            + "\n"
            + section_end
            + content[latest_section_match.end() :]
        )

        with open(index_path, "w", encoding="utf-8") as f:
            f.write(updated_content)


def main():
    print("=== Add New Link to Writing Portfolio ===")

    # Get link details
    title = input("Enter link title: ")
    url = input("Enter URL: ")
    excerpt = input("Enter a brief excerpt/description: ")

    # Show available pages
    pages = get_pages()
    print("\nAvailable categories:")
    for i, page in enumerate(pages, 1):
        print(f"{i}. {page[:-3]}")  # Remove .md extension

    # Get category selection
    while True:
        try:
            selection = int(input("\nSelect category number: ")) - 1
            if 0 <= selection < len(pages):
                selected_page = pages[selection]
                break
            print("Invalid selection. Please try again.")
        except ValueError:
            print("Please enter a number.")

    # Add to specific page (without excerpt)
    add_to_specific_page(selected_page, title, url)

    # Add to Latest Content only
    add_to_latest_content(title, url, excerpt)

    print("\nLink added successfully!")


if __name__ == "__main__":
    main()
