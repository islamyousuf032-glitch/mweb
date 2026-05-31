# YOUSUF UNBOUND — The Empire Beyond Limits

> **This Is Not A Website. This Is An Experience.**
> A dark, cinematic, neo-noir digital empire — movie intro + game menu + AI control room + dark luxury portfolio, all in one immersive homepage.

Built with **React + Vite**, with a **C++ → WebAssembly engine** powering the heavy real-time math (particles, noise fields, aura curves, card-tilt physics, spotlight smoothing). If WebAssembly is unavailable, a **pure-JS fallback** takes over automatically with an identical API.

All visuals are **CSS / SVG / Canvas** and all audio is **synthesized with the Web Audio API** — no external image, font, or sound files. It runs fully offline.

---

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
```

Production build:

```bash
npm run build    # outputs to dist/
npm run preview  # serve the build
```

### Open it instantly — `standalone.html`

A fully **self-contained single file** is included at the project root:

```
standalone.html   # JS + CSS + the C++/WASM engine, all inlined (~290 KB)
```

Just **double-click `standalone.html`** (or preview it in the workspace) — no server,
no network, no install. Everything (including the WebAssembly engine as a base64
data URI and the synthesized audio) runs offline in the browser.

Regenerate it after code changes with:

```bash
npm run build:single
```

Open the site → you start at the **Dark Access Gate** (scan sequence → ENTER THE EMPIRE) → **Cinematic Loader** (ACCESS GRANTED) → the living homepage.

---

## What's inside

**Entrance & shell**
- Dark Access Gate with scan lines, thunder flash, smoke + blade-cut transition
- Cinematic loader (triple scanner, YU emblem, ACCESS GRANTED stamp)
- Dynamic living background (Red Moon → Empire Core grid → Smoke → Void) that shifts with scroll
- Film letterbox bars, grain, vignette, ambient light pulse that follows the cursor/aura
- Custom cursor with 6 modes (shadow dot, blade, target ring, text scan, portal, music pulse) + trail + click ripple

**Homepage sections (in order)**
1. Hero `YOUSUF UNBOUND` (glitch letters, light sweep) + live Empire Dashboard
2. Cinematic marquee
3. Featured Realms — 8 portal cards with WASM 3D tilt
4. Trending In The Empire — animated popularity meters + count-up views
5. Cinematic Showcase Slider (glitch wipe, autoplay, swipe, thumbnails)
6. Latest Drops timeline (glowing red line)
7. Chosen By The Empire — AI-feel recommendations (regenerate)
8. Empire Map — 8 realm nodes orbiting a glowing core (horizontal scroll on mobile)
9. Unbound Feed — filters, sort, search, load-more, skeleton, empty state
10. Visual Power Wall — masonry collage → lightbox
11. Coming Soon — locked realms
12. **Empire Console** — interactive villain terminal (`help`, `system status`, `unlock secret`, `who is yousuf`, `shadow king` …)
13. Story chapters / manifesto
14. Villain Quote Generator (typewriter)
15. Join The Unbound Circle (newsletter)
16. End-credit footer

**Realm sub-pages (in-app SPA routing)**
- All 8 realms (`Film Vault`, `Shadow Frames`, `Sound Chamber`, `AI Dreamforge`, `Game District`, `Black Market`, `App Arsenal`, `The Origin`) open as full cinematic pages via a blade page-transition.
- Each has its own hero, energy core, rain-on-glass, stats, collection grid, lightbox previews and cross-realm navigation.
- **Game District** ships a **playable Neon Hunter reflex mini-game** (WASM-seeded targets, score/time/best).
- "Back To Empire" returns home with a transition; works fully offline in `standalone.html`.

**Control Vault (Settings panel)**
- Music · SFX on/off · Master volume slider · Custom cursor · **Deep Noir Mode** · **Immersive Mode** · **Reduced Motion** · one-tap **Silent Mode**. Shortcut: `S`.

**Interactive systems**
- Dark Aura Level (01 → UNBOUND) tied to scroll, drives glow/particles/toasts
- Visitor Rank ladder (Shadow Guest → Unbound Member)
- Cinematic toast notifications, red alert banner, blade scroll-progress bar
- Page-transition overlay per realm
- Floating music + cursor + settings control orbs; synthesized dark ambient + SFX
- Magnetic hero buttons (pull toward cursor), music-pulse cursor (WASM waveform-driven glow)
- Dual cinematic marquees (crimson + gold reverse), throne silhouette + energy core in hero
- Mobile bottom action bar, tap ripple, reduced-particle path
- Desktop keyboard shortcuts: `M` music · `C` cursor · `V` vault · `T` trending · `D` drops · `/` search · `Esc` close

**Easter eggs**
- Logo ×5 → "THE UNBOUND SEES YOU"
- Console `shadow king` → KING MODE
- Hold music orb 3s → Deep Cinema Mode
- Footer YU emblem → "Every empire begins in silence."
- Konami code (↑↑↓↓←→←→ B A) → red lightning + secret unlock
- After midnight → deeper crimson palette

**Performance**
- `transform`/`opacity` animations, `requestAnimationFrame`, IntersectionObserver reveals
- pauses rendering when tab is hidden, passive listeners, `prefers-reduced-motion` support
- WASM-accelerated particle/noise math with JS fallback

---

## Project structure

```
src/
  App.jsx              # orchestrates stages, aura, shortcuts, easter eggs
  data.js              # all content (realms, trending, drops, quotes…)
  audio.js             # Web Audio ambient + SFX engine
  hooks.js             # reveal, scroll, count-up, typewriter, reduced-motion
  icons.jsx            # inline SVG icons
  wasm/
    core.js            # loader: WASM first, JS fallback
    fallback.js        # pure-JS mirror of the C++ engine
    empire_core.js     # Emscripten glue (generated)
    empire_core.wasm   # compiled engine (generated)
  components/          # every section + system
  styles/              # index.css (base) + components.css
wasm-src/
  empire_core.cpp      # the C++ source
  build.sh             # recompile WASM (needs Emscripten)
```

### Rebuilding the C++ engine
The compiled `.wasm` is committed, so you only need Emscripten if you change `empire_core.cpp`:

```bash
# install emsdk (see wasm-src/build.sh header), then:
cd wasm-src && bash build.sh
```

---

**EIGHT REALMS. ONE CORE. NO BOUNDARIES.**
© 2026 YOUSUF UNBOUND. All Realms Reserved.
