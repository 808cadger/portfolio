# CLAUDE.md — Portfolio

AI engineer portfolio site.
Stack: HTML + Electron | Deploy: PWA + Electron AppImage/RPM (no Android APK)

## Repo Identity
- Codeberg: https://codeberg.org/cadger808/portfolio
- PWA: https://cadger808.codeberg.page/portfolio
- Releases: https://codeberg.org/cadger808/portfolio/releases

## Key Files
- `index.html` — portfolio page
- `resume.html` — resume page
- `Christopher-Cadger-Resume.pdf` — downloadable resume
- `api-client.js` — Claude API calls
- `avatar-widget.js` / `share-widget.js` — floating UI widgets
- `electron/main.js` — Electron desktop entry
- `.github/workflows/deploy-pages.yml` — PWA CI
- `.gitea/workflows/build-electron.yml` — Electron CI

## Commands
```bash
npm install
npm run electron:dist
```

## Assumption-Driven Coding

When generating or editing code:
1. Add a comment for each non-trivial assumption using `// #ASSUMPTION: ...` (or language equivalent).
2. Ask: "What test or edge case would break this assumption?"
3. Add minimal defensive checks or `// TODO: validate ...` comments where needed.
4. Before finishing, do a mental review pass on all `#ASSUMPTION` lines.
