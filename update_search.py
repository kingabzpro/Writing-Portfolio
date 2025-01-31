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
            category = (
                title_match.group(1)
                if title_match
                else os.path.basename(file_path).replace(".md", "")
            )

            # Extract articles using regex - now keeping both title and URL
            article_matches = re.findall(r"- \[(.*?)\]\((.*?)\)", content)

            # Create individual entries for each article
            articles = []
            for title, url in article_matches:
                articles.append(
                    {
                        "title": title,
                        "url": url,
                        "category": category,
                        "content": f"{title} - {category} article about {title.lower()}",
                    }
                )

            return articles

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
                articles = extract_articles_from_md(file_path)
                if articles:
                    search_data.extend(articles)

    # Sort entries by title
    search_data.sort(key=lambda x: x["title"])

    # Write to search.json
    with open("search.json", "w", encoding="utf-8") as f:
        json.dump(search_data, f, indent=2, ensure_ascii=False)

    print(f"Successfully generated search.json with {len(search_data)} articles")


if __name__ == "__main__":
    generate_search_json()
