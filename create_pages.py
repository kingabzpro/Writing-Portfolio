import os
import re
from pathlib import Path


def extract_sections(readme_content):
    # Dictionary to store section titles and their content
    sections = {}

    # Split content into sections using ## as delimiter
    section_blocks = re.split(r"\n##\s+", readme_content)

    for block in section_blocks[1:]:  # Skip the first block (intro)
        # Get the section title and content
        lines = block.split("\n", 1)
        if len(lines) < 2:
            continue

        title = lines[0].strip()
        content = lines[1].strip()

        # Skip the Categories section
        if title == "Categories":
            continue

        # Extract all links from the content
        links = re.findall(r"- \[(.*?)\]\((.*?)\)(?:\s*-\s*([^\n]*))?", content)

        # Format links into markdown
        formatted_links = []
        for link_text, link_url, description in links:
            if description:
                formatted_links.append(f"- [{link_text}]({link_url}) - {description}")
            else:
                formatted_links.append(f"- [{link_text}]({link_url})")

        if formatted_links:
            sections[title] = "\n".join(formatted_links)

    return sections


def create_page(title, content, output_dir):
    # Convert title to filename-friendly format
    filename = title.lower().replace(" ", "-").replace("(", "").replace(")", "")

    # Create pages directory if it doesn't exist
    Path(output_dir).mkdir(parents=True, exist_ok=True)

    # Prepare the markdown content
    page_content = f"""# {title}

A collection of resources, tutorials, and articles about {title}.

## Articles

{content}

## Related Resources
- [Back to Home](/)
"""

    # Write the file
    output_path = os.path.join(output_dir, f"{filename}.md")
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(page_content)

    print(f"Created {output_path}")


def main():
    # Read README.md
    with open("README.md", "r", encoding="utf-8") as f:
        readme_content = f.read()

    # Extract sections
    sections = extract_sections(readme_content)

    # Create pages directory
    pages_dir = "pages"

    # Process each section
    for title, content in sections.items():
        create_page(title, content, pages_dir)


if __name__ == "__main__":
    main()
