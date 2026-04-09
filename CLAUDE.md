# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Product strategy + visualization workspace for **BUSY Bar** — a hardware focus indicator with a 4-ring software expansion strategy. The repo holds strategy documentation, interactive HTML visualizations, and (upcoming) a React+Vite app called `busy/`.

**Current state:** Pure documentation. No build tooling exists yet. The `busy/` React app is planned — see `docs/plans/2026-04-09-001-feat-busy-react-vite-strategy-app-plan.md`.

---

## Важно — правила разработки

**Выполнение плана:**
- Работай по активному плану в `docs/plans/`. Шаги выполняются последовательно если есть зависимости, параллельно если независимы.
- После завершения каждого пункта плана — сразу отмечай его как выполненный прямо в файле плана (`- [x]` вместо `- [ ]`). Не накапливай — отмечай по мере выполнения.
- Если в процессе находишь подзадачи, которых не было в плане — добавляй их в план (не держи в голове).

**Скиллы:**
- Использовать Compound Engineering скиллы: `ce:plan`, `ce:work`, `ce:brainstorm`, `ce:ideate` и специализированные агенты (reviewers, researchers) когда задача это оправдывает.

**Тесты:**
- Проект некоммерческий, не продакшн. Тесты только если логика нетривиальна (геометрические вычисления для rings, парсинг JSON).

**Данные:**
- Стратегический контент — только в JSON (`busy/src/data/`). Никаких хардкоженных строк, чисел, цветов, фич в компонентах. Компоненты читают данные, не содержат их.
- Источник правды для данных: `docs/viz/strategy.html` → JSON файлы. При расхождении — JSON в приложении первичен после миграции.
- Язык в JSON-контенте и стратегических текстах — русский. Язык в коде, комментариях, именах переменных — английский.

**Дизайн-система — единый источник правды:**
- Все цвета, шрифты, радиусы, spacing — исключительно через CSS-переменные в `src/styles/tokens.css`. Нигде в компонентах не используются hex-значения, magic numbers или инлайн-стили для визуальных свойств.
- Семантические токены (`--color-primary`, `--ring-1`, `--tx`, `--border`) — не примитивные значения. Компонент использует `--ring-1`, а не `oklch(0.45 0.22 25)`.
- shadcn-компоненты в `src/components/ui/` — кастомизируются один раз, применяются везде. Прото-экраны (`src/components/proto/`) используют только эти компоненты + токены.
- Поменял токен → изменился весь интерфейс. Это единственный допустимый способ менять внешний вид глобально.

**Коммиты:**
- Коммитить после завершения каждой логической единицы работы (пункт плана или группа связанных пунктов). Не коммитить частично рабочий код.

**Деплой:**
- Хостинг: Vercel. Роутинг: BrowserRouter (не HashRouter). В `busy/vercel.json` — SPA rewrite: `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`.

**Dev-команды** (актуальны после scaffold `busy/`):
```bash
cd busy
npm run dev      # dev server
npm run build    # production build
npm run preview  # preview production build
```

---

## Directory structure

```
docs/
├── strategy/        # 9 canonical strategy docs (Russian, 01–09)
├── viz/             # Self-contained HTML visualizations (vanilla JS)
│   └── strategy.html  ← master data source: RINGS, STAKEHOLDERS, FOCUS_PATH
├── design_system.md # Color palette + typography for busy.bar and busy.app
├── research/        # Raw competitive + stakeholder research
└── plans/           # Implementation plans (ce:plan format)

busy/                # ← React+Vite app (to be scaffolded)
```

---

## Core data model

All product data originates in `docs/viz/strategy.html` (JS script block). When the `busy/` app is built, this data moves to JSON files in `busy/src/data/`.

**4 Rings:**
- `r0` Core — hardware + SDK (exists now); radius 72px
- `r1` Software — Auto Presence + Focus Memory (0–9m); radius 175px; gate: 30-day retention ≥ 40%
- `r2` Platform — Open Platform + Team (9–24m); radius 285px; gate: 200+ apps, 30% active 3rd party
- `r3` Ecosystem — Intelligence + Expansion (18–36m); radius 390px; gate: Ring 2 + 50K units

**Focus Constellation** (`FOCUS_PATH` in strategy.html) — the critical product path:
`0.1 Pomodoro (Ritual) → 1.9 macOS App (Hub) → 1.12 Slack (Presence) → 2.4 App Library (Platform) → 3.1 AI Coach (Intelligence) → 3.5 Focus Profile (Identity)`

Note: The constellation anchor is `0.1 Pomodoro Timer` (the human ritual), not `0.13 LED Matrix` (hardware output). LED Matrix is a context node, not an anchor.

**Feature IDs** follow `ring.sequence` format: `0.1`, `1.9`, `2.4`, etc. References always use this format.

---

## Planned `busy/` app — tech stack

When implementing, follow the plan exactly:

| | Choice | Reason |
|---|---|---|
| Build | Vite 6 + `@vitejs/plugin-react-swc` | No Babel plugins needed |
| UI | shadcn/ui `new-york` style + Tailwind v4 | Owned source, full control |
| Animation | `motion` package (not `framer-motion`) | Import from `motion/react` |
| D3 | Sub-packages only (`d3-scale`, `d3-shape`, `d3-array`, `d3-path`, `d3-interpolate`) | D3 does math only — never touches the DOM |
| Fonts | `@fontsource-variable/geist` + `@fontsource-variable/geist-mono` + Geist Pixel `.woff2` manually in `public/fonts/` | `geist` npm package is Next.js only, breaks in Vite |
| Data | JSON files in `src/data/` loaded via React Router v7 loaders | All content separated from UI |

**Geist Pixel gotcha:** The `geist` npm package uses `next/font` internals — importing it in Vite throws `TypeError: (0, import_local.default) is not a function`. Download `.woff2` files from github.com/vercel/geist-font/releases and self-host via `@font-face`.

**shadcn init gotcha:** After `npx shadcn@latest init`, check `globals.css` for circular self-reference `--font-sans: var(--font-sans)` — replace with literal font names.

**Tailwind v4:** CSS-first config via `@theme inline { }` in `index.css`. No `tailwind.config.ts`. Colors in `oklch()`.

---

## Design system

Two visual registers for the same brand:

- **busy.bar** (hardware site): white/light-gray bg, orange `#EA5212` accent, Pragmatica Next VF
- **busy.app** (software site): black bg, red `#ED0018` accent, Pragmatica Next VF + Inter

**Strategy/ops UI** (viz HTML files + `busy/` app): Geist + Geist Mono, warm-white `#FBFAF7` light / near-black `#090909` dark, ring colors: r1=red, r2=orange, r3=blue.

---

## Strategy documents

Written in Russian. Key docs:

- `01_strategy.md` — one-page summary, gate metrics, circuit breakers
- `02_stakeholder_map.md` — 8 stakeholders with priority (P0–P3) and ring reach
- `03_ecosystem_rings.md` — ring-by-ring breakdown with clusters
- `08_feature_map.md` — canonical feature list with priority (●/◐/○) and ring assignments

**Stakeholder priorities:** Focus Worker P0, Family + Developer + Team Lead P1, Smart Home + Streamer + Colleagues P2, IT Manager P3.

**Circuit breakers to know:**
- If Microsoft ships Teams hardware < $79 → pivot to ADHD/prosumer, drop enterprise roadmap
- No new hardware before 50K units + 40% retention
- If Ring 1 retention < 15% at 6 months → stop all Ring 1 work
