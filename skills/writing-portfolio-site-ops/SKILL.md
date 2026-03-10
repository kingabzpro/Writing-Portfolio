---
name: writing-portfolio-site-ops
description: Maintain, test, and deploy the Writing Portfolio Astro site. Use when requests involve updating `pages/*.md` content, regenerating `public/search.json` and `public/assets/data/latest.json`, running local quality/build checks, preparing or validating GitHub Pages releases, troubleshooting `.github/workflows/deploy.yml`, or doing post-deploy verification for `abid.work`.
---

# Writing Portfolio Site Ops

## Overview

Use this skill to execute repeatable operational workflows for this repository.
Run maintenance changes safely, validate build readiness locally, and deploy through the existing GitHub Pages pipeline.

## Workflow

1. Identify change scope.
Run `git status -sb` and inspect changed files.
Map each changed area to required checks:
- `pages/*.md`: regenerate derived data with `python update_search.py`.
- `src/`, `astro.config.mjs`, dependencies: run full quality + build checks.
- `.github/workflows/deploy.yml`: validate deployment logic and artifact path.

2. Apply maintenance updates.
Edit content and code first, then regenerate derived files.
When touching content, keep outbound links in markdown list format:
```md
- [Article title](https://example.com)
```
`update_search.py` only indexes links matching that format.

3. Run local test and build gates.
Prefer the bundled script for consistent checks:
```bash
python skills/writing-portfolio-site-ops/scripts/predeploy_health_check.py --repo .
```
If needed, run individual commands:
```bash
python update_search.py
bun run check
bun run build
```

4. Deploy with GitHub Actions.
Deployment is automatic on push to `main` via `.github/workflows/deploy.yml`.
For manual releases, trigger `workflow_dispatch` on the same workflow.
Treat `dist/` as the only Pages artifact source.

5. Verify release outcome.
Confirm the workflow reaches successful `build` and `deploy` jobs.
Verify generated assets still exist after build:
- `public/search.json`
- `public/assets/data/latest.json`
Verify site availability at `https://abid.work`.

## Troubleshooting

- `bun install --frozen-lockfile` fails:
Check `bun.lock` consistency and re-run `bun install` locally before retrying.
- `update_search.py` returns empty output unexpectedly:
Confirm markdown list lines still match `- [Title](https://...)`.
- `latest.json` has fewer recent entries:
Confirm updates were committed to git; latest extraction uses git history patches.
- Pages deploy runs but site looks stale:
Confirm push landed on `main`, not another branch.

## Resources

- Use [references/workflows.md](references/workflows.md) for command cheatsheet and failure triage.
- Use [scripts/predeploy_health_check.py](scripts/predeploy_health_check.py) to run repeatable local readiness checks.
