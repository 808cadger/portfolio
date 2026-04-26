# Christopher Cadger — AI Engineer Portfolio

<!-- INSTALL-START -->
## Install and run

These instructions install and run `portfolio` from a fresh clone.

### Clone
```bash
git clone https://github.com/808cadger/portfolio.git
cd portfolio
```

### Web app
```bash
npm install
python3 -m http.server 8080
```

### Desktop app
```bash
npm run electron
npm run electron:dist
```

### Notes
- Use Node.js 22 or newer for the current package set.

### AI/API setup
- If the app has AI features, add the required provider key in the app settings or local `.env` file.
- Browser-only apps store user-provided API keys on the local device unless a backend endpoint is configured.

### License
- Apache License 2.0. See [`LICENSE`](./LICENSE).
<!-- INSTALL-END -->


> AI engineer based in Honolulu, Hawaii. Building and shipping production AI apps with Claude AI, Python, and computer vision.

[**Live Site →**](https://cadger808.codeberg.page/portfolio) · [Resume (PDF)](https://cadger808.codeberg.page/portfolio/Christopher-Cadger-Resume.pdf) · [Codeberg](https://codeberg.org/cadger808)

---

## Apps

| App | What it does | Install |
|-----|-------------|---------|
| **GlowAI** | AI skin analysis — Claude Vision scan, personalized routines, progress tracking | [PWA](https://cadger808.codeberg.page/glowai) · [APK](https://codeberg.org/cadger808/glowai/releases) |
| **ArcherTravel** | AI travel booking + Claude Vision ID verification | [PWA](https://cadger808.codeberg.page/archertravel) · [APK](https://codeberg.org/cadger808/archertravel/releases) |
| **CourtAide** | AI legal assistant for pro se court filings | [PWA](https://cadger808.codeberg.page/courtaide) · [APK](https://codeberg.org/cadger808/courtaide/releases) |
| **FarmSense** | AI farm monitoring — crop health, pest ID, harvest planner | [PWA](https://cadger808.codeberg.page/farmsense) · [APK](https://codeberg.org/cadger808/farmsense/releases) |
| **time~save~shopping** | AI grocery assistant with GPS store detection | [APK](https://codeberg.org/cadger808/time-save-shopping/releases) |

All PWA apps install in one tap — no app store, no account. Just open the link and tap "Add to Home Screen."

---

## Tech stack

`Claude AI (Anthropic)` · `Python` · `JavaScript` · `Capacitor` · `Electron` · `React Native / Expo` · `FastAPI` · `TensorFlow Lite` · `YOLOv8`

---

## Install portfolio site

**PWA:** Open [cadger808.codeberg.page/portfolio](https://cadger808.codeberg.page/portfolio) → "Add to Home Screen"

**Linux desktop:** Download `.AppImage` or `.rpm` from [Releases](https://codeberg.org/cadger808/portfolio/releases)

---

## Dev quick start

```bash
git clone https://codeberg.org/cadger808/portfolio.git
cd portfolio && npm install

npx serve .             # browser dev
npm run electron:dist   # Electron build
```

---

## Contact

- Email: cadger808@gmail.com
- LinkedIn: [linkedin.com/in/christopher-cadger](https://linkedin.com/in/christopher-cadger)
- Codeberg: [codeberg.org/cadger808](https://codeberg.org/cadger808)
---

© 2026 cadger808 — All rights reserved.
