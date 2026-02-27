# Abid's Writing Portfolio (Astro)

This repository powers [abid.work](https://abid.work), a writing portfolio focused on AI, data science, machine learning, and engineering resources.

## Stack

- Astro (static site generation)
- Bun (package manager and task runner)
- Python (`update_search.py` for `search.json` and `latest.json` generation)
- Docker + docker-compose for local containerized dev
- GitHub Pages deployment via GitHub Actions

## Local Development

```bash
bun install
bun run dev
```

Site runs on `http://localhost:4321`.

## Build

```bash
bun run build
```

Build output goes to `dist/`.

## Data Pipeline

- Source content remains in `pages/*.md`
- Search index is generated to `public/search.json`
- Latest posts are generated to `public/assets/data/latest.json`

To regenerate data directly:

```bash
python update_search.py
```

## Docker

```bash
docker compose up --build
```

## VS Code

- Recommended extensions: `.vscode/extensions.json`
- Tasks: `.vscode/tasks.json`
- Dev container: `.devcontainer/devcontainer.json`

## Deployment

GitHub Pages deployment is configured in `.github/workflows/deploy.yml` and publishes `dist/` from `main`.
