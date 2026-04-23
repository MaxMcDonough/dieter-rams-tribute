# Dieter Rams · A Designer's Tribute

A six-page editorial tribute website honouring Dieter Rams — the German industrial designer who spent forty-two years at Braun and wrote the ten principles of good design in 1976.

**Final project for INTD-215 · Designing for Screens · Spring 2026**
**Author:** Max McDonough · **Instructor:** Colby May

---

## Open the site

There is no build step. Open any of the HTML files directly in a browser, or serve the folder with any simple static server:

```bash
# Option 1 — open the cover directly in your browser
open index.html

# Option 2 — serve the whole folder locally
python3 -m http.server 8000
# then visit http://localhost:8000
```

---

## File structure

```
Dieter Rams Portfolio Website/
│
├── index.html                  Cover page · Hero + table of contents
├── about.html                  Chapter I  · Biography + Braun T 1000 Timeline
├── principles.html             Chapter II · Ten Principles · ET 66 Calculator
├── work.html                   Chapter III· Nine Objects in Detail (parallax)
├── impact.html                 Chapter IV · Studio Meters + Hi-fi Rack + Designers
├── invitation.html             Chapter V  · The Eleventh Principle + Closing Mantra
│
├── style.css                   Single stylesheet for all 6 pages (~5,400 lines)
├── script.js                   Single script for all 6 pages (~1,300 lines)
│
├── images/                     Public-domain Braun & Vitsœ product photographs
│   ├── dieter-rams-portrait.jpg
│   ├── braun-sk4.jpg
│   └── …(10 images)
│
├── process-book.html           Comprehensive process documentation (read this!)
├── presentation-script.md      Per-page talking points for the recorded video
├── README.md                   This file
│
├── process/                    UX research deliverables (10 PDFs)
│   ├── 01_User_Persona.pdf
│   ├── 02_Empathy_Map.pdf
│   ├── 03_Journey_Map.pdf
│   ├── 04_User_Flow.pdf
│   ├── 05_Site_Map.pdf
│   ├── 06_Mood_Board.pdf
│   ├── 07_Precedent_Research.pdf
│   ├── 08_Wireframes.pdf
│   ├── Dieter_Rams_Design_Board.pdf
│   └── Dieter_Rams_HiFi.pdf
│
├── _process_snapshots/         Evolution snapshots — every major version
│   ├── v1_original_self_coded/      (Phase 1 · Hand-coded base, no AI, no plugins)
│   ├── v2_pre_immersive/            (Phase 2 · After 21st.dev plugin integration)
│   ├── v3_immersive_singlepage/     (Phase 3 · After Claude Code Braun-instrument build-out)
│   └── v4_multipage_final/          (Phase 4 · Current · Multi-page chapter restructure)
│
└── _archive/                   Original brief PDFs and unrelated working files
```

---

## The four build phases

### v1 · Self-coded base
Hand-written HTML, CSS, vanilla JS. No frameworks, no plugins, no AI. The clean foundational version.

### v2 · 21st.dev plugins
Four open-source React/TSX components from [21st.dev](https://21st.dev) — community-curated UI components — re-implemented from React/Tailwind into vanilla HTML/CSS/JS to fit the existing host:
- **Dot-Pattern Quote** — bordered frame with corner squares + dot grid background
- **Parallax Scroll Feature** — alternating left/right product feature rows with scroll-driven reveals
- **Wave-Path Interactive Line** — spring-physics SVG (later removed in v4)
- **Text-Rotate Scroll Gallery** — sticky text rotation synced to scrolling cards (powers the Designers section)

### v3 · Claude Code · Skeuomorphic Braun-instrument language
Used Anthropic's [Claude Code](https://claude.com/claude-code) coding agent (running on Claude Sonnet, in Cowork mode) as a pair-programmer to rebuild every interactive section around an actual Braun product as its interface metaphor:
- **Hero** wrapped in a Braun device faceplate
- **Principles** rebuilt as a Braun ET 66 calculator keypad
- **Timeline** rebuilt as a Braun T 1000 World Receiver tuning dial
- **Index (numbers)** rebuilt as a studio meter rack
- **Legacy** rebuilt as a six-channel hi-fi rack
- **Persistent HUD** added as a tape-deck readout pinned to every page

### v4 · Multi-page architecture
Following Colby May's critique note that a single endless scroll inherently violates "less, but better," restructured the entire site into six focused pages — a cover plus five chapters — connected by a chapter rail and shared shell.

Full evolution snapshots are preserved in `_process_snapshots/`.

---

## Keyboard shortcuts

These work on every page:

| Key | Action |
|-----|--------|
| `0` | Cover |
| `1` | Chapter I · Biography |
| `2` | Chapter II · Principles |
| `3` | Chapter III · Work |
| `4` | Chapter IV · Impact |
| `5` | Chapter V · Invitation |
| `j` | Next chapter |
| `k` | Previous chapter |
| `?` | Toggle keyboard help panel |
| `gg` | Scroll to top |
| `Esc` | Close panel |

On the **principles** page (Chapter II), inside the calculator: `1`–`9` and `0` press the corresponding principle key. Arrow keys cycle through them.

---

## Browser support

Tested on the latest stable versions of Chrome, Firefox, and Safari. All animations respect `prefers-reduced-motion`. Mobile responsive down to 360px viewport width.

---

## Credits

- **Type:** [IBM Plex](https://www.ibm.com/plex/) (Sans, Serif, Mono) — open-source via Google Fonts
- **Components:** Four micro-interactions originally from [21st.dev](https://21st.dev) (open-source community library), re-implemented in vanilla
- **Coding agent:** [Claude Code](https://claude.com/claude-code) by Anthropic, used as a pair-programmer for Phases 3 and 4
- **Portrait:** Photograph of Dieter Rams by Vitsœ, used under CC BY-SA 3.0 (see `_archive/` for source)
- **Product photography:** Public-domain Braun and Vitsœ catalogue images

---

## Honest accounting

A full, itemised AI Use Declaration is included on the last page of `process-book.html`. The short version: the original concept, designer selection, narrative arc, design system, and Braun-instrument metaphors are all mine. Build Phase 1 was 100% self-coded with no AI. Build Phases 3 and 4 were done as pair-programming with Claude Code, with me directing every design decision. All UX research artefacts (10 PDFs) were authored by me prior to any AI involvement.

---

## Educational use

Educational tribute site. Not affiliated with Dieter Rams, Braun GmbH, or Vitsœ Ltd. All product imagery and trademarks are the property of their respective owners.

— Max McDonough · April 2026
