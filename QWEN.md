# QWEN.md — Project Safety Rules

## Critical Rules

1. **Never delete existing files** unless explicitly asked.
2. **Never redesign existing UI** unless explicitly asked.
3. **Never remove** routes, header, sidebar, title, theme, language system, font controls, or orbit animation.
4. **Before modifying any page**, inspect existing project files first.
5. **Modify only the requested page** — do not touch unrelated files.
6. **Keep English, Urdu, and Both modes working** after every change.
7. **Keep correct text visibility** in dark/light themes at all times.
8. **Before major changes**, create a backup snapshot or commit.
9. **After each task**, report:
   - Files changed
   - Manual testing steps

## Architecture Overview

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 with CSS custom properties
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Fonts**: Inter (English), Noto Nastaliq Urdu (Urdu)

## File Structure

```
src/
├── App.tsx              — Main app with routing
├── main.tsx             — Entry point
├── index.css            — Tailwind + theme tokens
├── contexts/
│   └── AppContext.tsx   — Language, theme, font size state
├── components/
│   ├── Header.tsx       — Fixed header with centered title
│   ├── Sidebar.tsx      — Slide-in navigation
│   ├── Footer.tsx       — Site footer
│   ├── SolarSystem.tsx  — Orbit animation
│   ├── PlanetModal.tsx  — Planet info modal
│   └── BilingualText.tsx— Bilingual text renderer
├── data/
│   ├── translations.ts  — All UI translations
│   └── planets.ts       — Planet data
└── pages/
    ├── Home.tsx         — Home page with 8 sections
    └── PlaceholderPage.tsx — Placeholder for future pages
```

## Theme System

Uses CSS custom properties set on `<html>`:
- `--bg`, `--surface`, `--surface-muted`
- `--text-primary`, `--text-secondary`
- `--border`, `--accent`
- Classes: `.dark` and `.light` on `<html>`

## Language System

Three modes: `en`, `ur`, `both`
- Stored in localStorage key `sslh-lang`
- Urdu uses `.font-urdu` class with RTL direction
- Both mode stacks English above Urdu vertically

## Font Size System

Three sizes: `sm` (14px), `md` (16px), `lg` (18px)
- Stored in localStorage key `sslh-fontsize`
- Applied via `--font-size-base` CSS variable
