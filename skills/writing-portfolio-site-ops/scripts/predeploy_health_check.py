#!/usr/bin/env python3
"""Run repeatable local checks before deploying Writing Portfolio."""

from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
from pathlib import Path


class CheckFailure(Exception):
    """Raised when a required check fails."""


def run(cmd: list[str], cwd: Path, title: str) -> None:
    print(f"\n[STEP] {title}")
    print(f"[CMD ] {' '.join(cmd)}")
    completed = subprocess.run(cmd, cwd=cwd)
    if completed.returncode != 0:
        raise CheckFailure(f"{title} failed with exit code {completed.returncode}")
    print(f"[PASS] {title}")


def require_path(path: Path, label: str) -> None:
    if not path.exists():
        raise CheckFailure(f"{label} not found at {path}")
    print(f"[PASS] {label}: {path}")


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Run local readiness checks for Writing Portfolio deploys.",
    )
    parser.add_argument(
        "--repo",
        default=".",
        help="Path to repository root (default: current directory).",
    )
    parser.add_argument(
        "--skip-update-search",
        action="store_true",
        help="Skip running update_search.py.",
    )
    parser.add_argument(
        "--skip-check",
        action="store_true",
        help="Skip bun run check.",
    )
    parser.add_argument(
        "--skip-build",
        action="store_true",
        help="Skip bun run build.",
    )
    args = parser.parse_args()

    repo = Path(args.repo).resolve()
    if not repo.exists():
        print(f"[FAIL] Repo path does not exist: {repo}")
        return 1

    if shutil.which("bun") is None:
        print("[FAIL] Bun executable not found on PATH.")
        return 1

    update_search = repo / "update_search.py"
    search_json = repo / "public" / "search.json"
    latest_json = repo / "public" / "assets" / "data" / "latest.json"
    dist_dir = repo / "dist"

    try:
        print(f"[INFO] Repo: {repo}")

        if not args.skip_update_search:
            require_path(update_search, "update_search.py")
            run([sys.executable, "update_search.py"], repo, "Regenerate derived data")

        require_path(search_json, "search index")
        require_path(latest_json, "latest posts data")

        if not args.skip_check:
            run(["bun", "run", "check"], repo, "Run Astro checks")

        if not args.skip_build:
            run(["bun", "run", "build"], repo, "Run production build")
            require_path(dist_dir, "dist output directory")

        print("\n[OK] Pre-deploy health check passed.")
        return 0
    except CheckFailure as exc:
        print(f"\n[FAIL] {exc}")
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
