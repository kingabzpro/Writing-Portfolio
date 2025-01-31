import json
import os
import re


def extract_articles_from_md(file_path):
    """Extract article titles and links from markdown file."""
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

            # Extract title from the first h1
            title_match = re.search(r"# (.*?)\n", content)
            title = (
                title_match.group(1)
                if title_match
                else os.path.basename(file_path).replace(".md", "")
            )

            # Extract articles using regex - now keeping both title and URL
            article_matches = re.findall(r"- \[(.*?)\]\((.*?)\)", content)
            articles_with_urls = [
                {"title": title, "url": url} for title, url in article_matches
            ]

            # Create a summary of articles with their URLs
            articles_text = []
            for article in articles_with_urls:
                articles_text.append(f"{article['title']} ({article['url']})")
            articles_summary = "; ".join(articles_text) if articles_text else ""

            # Get the relative URL
            relative_url = "/Writing-Portfolio/pages/" + os.path.basename(
                file_path
            ).replace(".md", "")

            # Create the basic description based on the content between title and articles
            description = ""
            desc_match = re.search(r"# .*?\n\n(.*?)\n\n", content, re.DOTALL)
            if desc_match:
                description = desc_match.group(1).strip()

            # Create searchable content that includes both description and full article details
            searchable_content = description
            if articles_summary:
                searchable_content = (
                    f"{description} Articles include: {articles_summary}"
                )

            return {
                "title": title,
                "url": relative_url,
                "content": searchable_content,
                "articles": articles_with_urls,  # Adding full article data
            }
    except Exception as e:
        print(f"Error processing {file_path}: {str(e)}")
        return None


def generate_search_json():
    """Generate search.json by processing all markdown files in pages directory."""
    pages_dir = "pages"
    search_data = []

    # Process each markdown file in the pages directory
    if os.path.exists(pages_dir):
        for filename in os.listdir(pages_dir):
            if filename.endswith(".md"):
                file_path = os.path.join(pages_dir, filename)
                page_data = extract_articles_from_md(file_path)
                if page_data:
                    search_data.append(page_data)

    # Sort entries by title
    search_data.sort(key=lambda x: x["title"])

    # Write to search.json
    with open("search.json", "w", encoding="utf-8") as f:
        json.dump(search_data, f, indent=2, ensure_ascii=False)

    print(f"Successfully generated search.json with {len(search_data)} entries")


if __name__ == "__main__":
    generate_search_json()
