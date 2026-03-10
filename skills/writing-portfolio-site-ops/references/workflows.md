# Writing Portfolio Workflows

## Quick Commands

```bash
# install dependencies
bun install

# local dev server
bun run dev

# regenerate derived content data
python update_search.py

# static analysis/type checks
bun run check

# production build (runs prebuild first)
bun run build
```

## Deployment Pipeline

- Workflow file: `.github/workflows/deploy.yml`
- Trigger: push to `main` or manual `workflow_dispatch`
- Build environment:
  - Bun `1.3.5`
  - Python `3.13`
- Publish artifact: `dist/`
- Deployment target: GitHub Pages

## Change-Type Checklist

- Content-only updates (`pages/*.md`):
  - Run `python update_search.py`
  - Verify `public/search.json` and `public/assets/data/latest.json` changed as expected
  - Run `bun run build`

- UI or config updates (`src/*`, `astro.config.mjs`):
  - Run `bun run check`
  - Run `bun run build`
  - Preview locally with `bun run preview` when needed

- Dependency updates (`package.json`, `bun.lock`):
  - Run `bun install`
  - Run `bun run check`
  - Run `bun run build`

- Deployment workflow updates (`.github/workflows/deploy.yml`):
  - Confirm artifact path remains `./dist`
  - Confirm `configure-pages`, `upload-pages-artifact`, and `deploy-pages` steps remain intact

## Failure Triage

- `bun run check` fails:
  - Fix reported type/content issues first; do not deploy with failing checks.

- `bun run build` fails:
  - Confirm `update_search.py` completes.
  - Inspect Astro build errors in the output and fix source content/components.

- Deploy job blocked:
  - Confirm `build` job passed.
  - Confirm repository GitHub Pages settings are configured for Actions deployment.

- Generated files unexpectedly empty:
  - Ensure `pages/*.md` entries use `- [Title](https://...)`.
  - Ensure local git history exists for latest-link extraction in `update_search.py`.
