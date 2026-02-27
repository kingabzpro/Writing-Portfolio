# Migration Checklist: Jekyll to Astro

This checklist tracks parity between the previous Jekyll implementation and the Astro implementation.

## Route and Asset Parity

| Item | Required Path | Status |
| --- | --- | --- |
| Homepage | `/` | Implemented |
| Topic pages | `/pages/<slug>` | Implemented |
| Search index | `/search.json` | Implemented |
| Content data | `/assets/data/content.json` | Implemented |
| Latest data | `/assets/data/latest.json` | Implemented |
| Robots | `/robots.txt` | Implemented |
| Sitemap | `/sitemap.xml` | Implemented |
| Favicons | `/assets/favicon/*` | Implemented |
| Custom domain | `/CNAME` | Implemented |

## Feature Parity

| Feature | Source | Status |
| --- | --- | --- |
| Homepage author section | `src/pages/index.astro` | Implemented |
| Latest posts widget | `src/components/LatestPosts.astro` | Implemented |
| Search widget | `src/components/SearchPanel.astro` | Implemented |
| Expertise cards | `public/assets/data/content.json` | Implemented |
| Topic cards | `public/assets/data/content.json` | Implemented |
| Sidebar categories | `src/components/Sidebar.astro` | Implemented |
| Social links | `src/components/SocialLinks.astro` | Implemented |
| Contact form action | `pages/contact.md` | Implemented |
| SEO meta + canonical | `src/layouts/BaseLayout.astro` | Implemented |
| OG/Twitter/JSON-LD | `src/layouts/BaseLayout.astro` | Implemented |
| Google Analytics | `src/layouts/BaseLayout.astro` | Implemented |

## Tooling Parity

| Tooling Area | Target | Status |
| --- | --- | --- |
| Bun dev/build scripts | `package.json` | Implemented |
| Search/latest generator | `update_search.py` | Implemented |
| Docker local dev | `Dockerfile`, `docker-compose.yml` | Implemented |
| VS Code tasks and extensions | `.vscode/*` | Implemented |
| Dev container | `.devcontainer/devcontainer.json` | Implemented |
| GitHub Pages deployment | `.github/workflows/deploy.yml` | Implemented |
