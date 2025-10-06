import json
import os
import re
from pathlib import Path
from typing import Dict, List
import subprocess
import sys

ROOT = Path(__file__).resolve().parent
PAGES_DIR = ROOT / "pages"
SEARCH_JSON = ROOT / "search.json"
DATA_DIR = ROOT / "assets" / "data"
LATEST_JSON = DATA_DIR / "latest.json"


def extract_articles_from_md(file_path: Path) -> List[Dict]:
    """Extract article titles and links from a markdown file.
    Returns a list of {title, url, category} dicts for each outbound link.
    """
    try:
        content = file_path.read_text(encoding="utf-8")

        # Extract category from the first H1; default to filename stem
        m = re.search(r"^#\s+(.*?)\s*$", content, re.MULTILINE)
        category = m.group(1) if m else file_path.stem

        # Extract articles: list items formatted as - [text](url)
        article_matches = re.findall(r"-\s*\[(.*?)\]\((https?://[^)\s]+)\)", content)

        articles: List[Dict] = []
        for title, url in article_matches:
            articles.append({
                "title": title.strip(),
                "url": url.strip(),
                "category": category.strip()
            })
        return articles
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return []


def build_search_index() -> List[Dict]:
    """Generate consolidated search data from all markdown files in pages/"""
    search_data: List[Dict] = []
    if PAGES_DIR.exists():
        for filename in os.listdir(PAGES_DIR):
            if filename.endswith(".md"):
                file_path = PAGES_DIR / filename
                search_data.extend(extract_articles_from_md(file_path))
    search_data.sort(key=lambda x: x.get("title", ""))
    return search_data


def write_json(path: Path, data: object) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")


def _run_git(args: List[str]) -> str | None:
    try:
        completed = subprocess.run(["git"] + args, cwd=str(ROOT), capture_output=True, text=True, check=True)
        return completed.stdout
    except Exception as e:
        print(f"git command failed: {' '.join(args)} -> {e}", file=sys.stderr)
        return None


def _is_git_repo() -> bool:
    out = _run_git(["rev-parse", "--is-inside-work-tree"])
    return bool(out and out.strip() == "true")


def build_latest_from_git(since_days: int = 180, top_n: int = 3) -> List[Dict]:
    """Inspect git history for added links in pages/*.md and build a latest list.
    Parses added markdown list items of the form: +- [Title](http...) in patches.
    """
    if not _is_git_repo():
        return []

    # Prepare git log with patches for pages/*.md, including ISO dates per commit
    pretty = "commit:%H%nDate:%ad"
    args = [
        "log",
        f"--since={since_days}.days",
        "--date=iso-strict",
        f"--pretty=format:{pretty}",
        "--patch",
        "--",
        "pages"
    ]
    out = _run_git(args)
    if not out:
        return []

    added_link_re = re.compile(r"^\+\s*-\s*\[(.*?)\]\((https?://[^)\s]+)\)")
    commit_date_iso: str | None = None
    latest_by_url: Dict[str, Dict] = {}

    for line in out.splitlines():
        if line.startswith("commit:"):
            commit_date_iso = None  # reset; will set when Date: appears
            continue
        if line.startswith("Date:"):
            # capture ISO date
            commit_date_iso = line.split("Date:", 1)[1].strip()
            continue
        # Skip diff headers
        if line.startswith("+++") or line.startswith("---") or line.startswith("@@"):
            continue
        m = added_link_re.match(line)
        if m and commit_date_iso:
            title, url = m.group(1).strip(), m.group(2).strip()
            # Simplify date to YYYY-MM-DD
            date_simple = commit_date_iso.split('T', 1)[0] if 'T' in commit_date_iso else commit_date_iso[:10]
            prev = latest_by_url.get(url)
            # Keep the most recent date per URL
            if not prev or date_simple > prev.get("date", ""):
                latest_by_url[url] = {
                    "title": title,
                    "url": url,
                    "date": date_simple
                }

    latest = sorted(latest_by_url.values(), key=lambda x: x.get("date", ""), reverse=True)[:top_n]
    return latest


def main() -> int:
    # 1) Build search index and write search.json
    search_data = build_search_index()
    write_json(SEARCH_JSON, search_data)
    print(f"Wrote {SEARCH_JSON} with {len(search_data)} items")

    # 2) Build latest.json strictly from git history; write empty list if unavailable
    latest = build_latest_from_git(since_days=365, top_n=3)
    if latest is None:
        latest = []
    write_json(LATEST_JSON, latest)
    print(f"Wrote {LATEST_JSON} with {len(latest)} items")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
