# Local Setup (Astro + Bun)

## Prerequisites

Install these tools first:

1. Bun: https://bun.sh
2. Python 3.11+ (3.13 is fine): https://www.python.org/downloads/
3. Docker Desktop: https://www.docker.com/products/docker-desktop/
4. Visual Studio Code: https://code.visualstudio.com/

## Quick Start

```bash
bun install
bun run dev
```

Site runs on `http://localhost:4321`.

## Build

```bash
bun run build
```

This runs `python update_search.py` before building Astro, and outputs static files to `dist/`.

## Docker

```bash
docker compose up --build
```

Site runs on `http://localhost:4321` in container mode.

## VS Code

- Recommended extensions are in `.vscode/extensions.json`
- Build/run tasks are in `.vscode/tasks.json`
- Dev container config is in `.devcontainer/devcontainer.json`
