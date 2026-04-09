---
title: feat: BUSY — React + Vite Strategy Visualization App
type: feat
status: active
date: 2026-04-09
---

# BUSY — React + Vite Strategy Visualization App

## Overview

Построить `busy/` — React 19 + Vite 6 приложение, которое живёт внутри репозитория `busy-app/` и служит тремя вещами одновременно:

1. **Living strategy document** — интерактивная визуализация 4-кольцевой стратегии (porting из `strategy.html`), Focus Constellation, стейкхолдеры
2. **Product roadmap** — вертикальная временная шкала по фазам (Ring 0→3) с gate-метриками и вписанными в неё прототипами экранов
3. **UI prototype gallery + design system** — shadcn-based компоненты, типографика Geist, цветовые токены — всё в одном месте

**Ключевой принцип:** весь контент (данные о кольцах, фичах, стейкхолдерах, roadmap-тексты, инсайты) хранится в JSON-файлах. Интерфейс ничего не знает о конкретных значениях — только читает данные. Менять стратегию = менять JSON, не трогая компоненты.

---

## Структура проекта

```
busy-app/
├── docs/                    # existing markdown + HTML
├── busy/                    # ← NEW React+Vite app
│   ├── public/
│   │   └── fonts/           # Geist Pixel .woff2 (5 variants)
│   ├── src/
│   │   ├── data/            # ← JSON data layer (content-separated)
│   │   │   ├── rings.json
│   │   │   ├── stakeholders.json
│   │   │   ├── focus-path.json
│   │   │   ├── roadmap.json
│   │   │   ├── insights.json
│   │   │   └── types.ts     # TypeScript interfaces for all JSON shapes
│   │   │
│   │   ├── components/
│   │   │   ├── ui/          # shadcn/ui components (owned, customized)
│   │   │   ├── viz/         # Data visualization
│   │   │   │   ├── RingsDiagram.tsx        # 4-ring SVG diagram
│   │   │   │   ├── ConstellationOverlay.tsx # Focus path edges + nodes
│   │   │   │   ├── StakeholderNodes.tsx
│   │   │   │   ├── FeatureNode.tsx
│   │   │   │   └── RingLabel.tsx
│   │   │   ├── proto/       # UI prototype screens
│   │   │   │   ├── FocusSessionScreen.tsx
│   │   │   │   ├── MacMenubarApp.tsx
│   │   │   │   ├── SlackSyncUI.tsx
│   │   │   │   ├── AppLibraryScreen.tsx
│   │   │   │   ├── AICoachChat.tsx
│   │   │   │   └── FocusProfilePage.tsx
│   │   │   └── layout/
│   │   │       ├── AppShell.tsx
│   │   │       ├── Sidebar.tsx
│   │   │       └── PageHeader.tsx
│   │   │
│   │   ├── pages/
│   │   │   ├── StrategyPage.tsx    # rings + constellation + stakeholders
│   │   │   ├── RoadmapPage.tsx     # vertical timeline + prototypes
│   │   │   ├── PrototypesPage.tsx  # prototype gallery
│   │   │   └── SystemPage.tsx      # design system showcase
│   │   │
│   │   ├── hooks/
│   │   │   ├── useRingsData.ts     # typed hook over rings.json
│   │   │   ├── useRoadmapData.ts
│   │   │   └── useFocusPath.ts
│   │   │
│   │   ├── lib/
│   │   │   ├── cn.ts               # clsx + tailwind-merge
│   │   │   ├── ring-geometry.ts    # D3 math for ring layout
│   │   │   └── constellation.ts    # Focus path edge calculations
│   │   │
│   │   ├── styles/
│   │   │   ├── index.css           # Tailwind v4 + font imports + tokens
│   │   │   └── fonts.css           # @font-face for Geist Pixel
│   │   │
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   └── tsconfig.node.json
```

---

## Стек технологий

| Слой | Пакет | Версия | Обоснование |
|------|-------|--------|-------------|
| Build | `vite` + `@vitejs/plugin-react-swc` | 6.x | Быстрее plugin-react на HMR, нет нужды в Babel-плагинах |
| UI Framework | `react` + `react-dom` | 19.x | React Compiler ready, concurrent режим |
| Types | `typescript` | 5.x | строгий режим |
| Routing | `react-router` | v7 | File-based routing option, loader API для JSON |
| Design system | `shadcn/ui` (CLI v4) | latest | Копирует исходники — полный контроль |
| CSS | `tailwindcss` v4 + `@tailwindcss/vite` | 4.x | oklch-токены, CSS-first конфиг |
| Animation | `motion` (пакет, бывший framer-motion) | 12.x | `pathLength` для SVG rings, `AnimatePresence` для роутинга |
| D3 (math only) | `d3-scale` `d3-shape` `d3-array` `d3-path` `d3-interpolate` | 7.x | DOM не трогает — только математика |
| Fonts (sans/mono) | `@fontsource-variable/geist` + `@fontsource-variable/geist-mono` | latest | Self-hosted, variable fonts, Vite-совместимо |
| Fonts (pixel) | manual `.woff2` в `public/fonts/` | — | `geist` npm-пакет — Next.js only, не работает в Vite |
| Path aliases | `vite-tsconfig-paths` | latest | читает `tsconfig.app.json` автоматически |
| Tests | `vitest` + `@testing-library/react` | 3.x | shared vite config |

---

## Data Layer — JSON Schema

Все данные хранятся в `src/data/`. Интерфейсы описаны в `types.ts` и используются везде в приложении.

### `rings.json`

```jsonc
{
  "rings": [
    {
      "id": "r0",
      "label": "Ring 0",
      "sub": "Core · Сейчас",
      "short": "Core",
      "colorVar": "--ring-0",
      "radius": 72,
      "gate": null,
      "features": [
        { "id": "0.1",  "short": "Pomodoro Timer",   "phase": null },
        { "id": "0.13", "short": "LED Matrix",        "phase": null },
        // ...
      ]
    },
    {
      "id": "r1",
      "label": "Ring 1",
      "sub": "Auto Presence + Focus Memory · 0–9 мес",
      "short": "Software",
      "colorVar": "--ring-1",
      "radius": 175,
      "gate": "Gate: 30-day retention ≥ 40%",
      "features": [ /* ... */ ]
    }
    // r2, r3 ...
  ]
}
```

### `focus-path.json`

```jsonc
{
  "title": "Focus Constellation",
  "subtitle": "Ritual → Presence → Platform → Intelligence",
  "anchors": ["r0:0.1", "r1:1.9", "r1:1.12", "r2:2.4", "r3:3.1", "r3:3.5"],
  "anchorLabels": {
    "r0:0.1":  "Ritual",
    "r1:1.9":  "Hub",
    "r1:1.12": "Presence",
    "r2:2.4":  "Platform",
    "r3:3.1":  "Intelligence",
    "r3:3.5":  "Identity"
  },
  "nodes": [ "r0:0.1", "r0:0.2", /* ... */ ],
  "edges": [
    { "from": "r0:0.1",  "to": "r0:0.13", "type": "local"  },
    { "from": "r0:0.13", "to": "r1:1.9",  "type": "bridge" }
    // ...
  ],
  "stakeholders": ["fw", "dev", "fam", "col", "lead", "sh"]
}
```

### `roadmap.json`

```jsonc
{
  "phases": [
    {
      "id": "p0",
      "ring": "r0",
      "label": "Phase 0 — Core",
      "horizon": "Сейчас",
      "months": [0, 0],
      "gate": null,
      "circuitBreakers": [
        "Если 30-day retention < 15% через 6 месяцев → остановить все Ring 1 работы"
      ],
      "prototypes": ["FocusSessionScreen", "MacMenubarApp"],
      "milestones": [
        { "label": "Hardware ship", "date": "2025-Q4" }
      ]
    },
    {
      "id": "p1",
      "ring": "r1",
      "label": "Phase 1.0 — Auto Presence",
      "horizon": "0–6 мес",
      "months": [0, 6],
      "gate": "30-day retention ≥ 40%; < 20% = STOP",
      "circuitBreakers": [
        "Если Microsoft выпускает Teams hardware < $79 → pivot to ADHD/prosumer"
      ],
      "prototypes": ["SlackSyncUI"],
      "milestones": []
    }
    // p1.5, p2.0, p2.5, p3 ...
  ]
}
```

### `stakeholders.json`

```jsonc
{
  "stakeholders": [
    {
      "id": "fw",
      "emoji": "◉",
      "name": "Focus Worker",
      "role": "Основной пользователь",
      "priority": "P0",
      "rings": ["r0", "r1", "r2", "r3"],
      "angle": -68
    }
    // ...
  ]
}
```

### `insights.json`

```jsonc
{
  "insights": [
    {
      "id": "i1",
      "category": "strategic",
      "title": "Focus Constellation",
      "body": "Шесть точек соединяют ритуал с идентичностью...",
      "relatedFeatures": ["0.1", "1.9", "1.12", "2.4", "3.1", "3.5"]
    }
    // ...
  ]
}
```

---

## Страницы и интерфейс

### Navigation — фиксированный левый сайдбар

```
┌─────────────────────────────────────────────────────┐
│  ● BUSY BAR          [Strategy] [Roadmap] [Proto] [System]  │ ← desktop: top nav
└─────────────────────────────────────────────────────┘

или

┌──────────┬──────────────────────────────────────────┐
│ BUSY BAR │                                          │
│          │                                          │
│ Strategy │            <main content>                │
│ Roadmap  │                                          │
│ Prototypes│                                         │
│ System   │                                          │
│          │                                          │
│ ─────── │                                          │
│ ☀ / ☾   │                                          │
└──────────┴──────────────────────────────────────────┘
```

Выбор макета — top nav (проще для широкого контента viz) или left sidebar. Для Strategy и Roadmap нужно максимум горизонтального пространства → **top nav** с фиксированной высотой 44px.

### Page 1: Strategy View

Прямой порт `strategy.html` в React:

- SVG `viewBox="0 0 1200 960"` с 4 концентрическими кольцами
- Фичи как точки на кольцах (угловое размещение через D3 math)
- Стейкхолдеры на внешнем орбите
- Субфазовые аннотации (1.0, 1.5, 2.0, 2.5)
- **Focus Constellation mode** — кнопка-тоггл, подсвечивает конкретные ноды, рисует edges
- Theme toggle (light ↔ dark)
- Click on feature node → detail panel (shadcn Sheet или Popover)

Animation:
```tsx
// Staggered ring entrance
rings.map((ring, i) => (
  <motion.circle
    key={ring.id}
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity: 1 }}
    transition={{ delay: i * 0.15, duration: 0.8, ease: "easeOut" }}
  />
))

// Constellation edges draw in
edges.map(edge => (
  <motion.path
    initial={{ pathLength: 0 }}
    animate={{ pathLength: 1 }}
    transition={{ duration: 0.6, ease: "easeInOut" }}
  />
))
```

### Page 2: Roadmap

Вертикальная полоса прокрутки. Сверху вниз: Ring 0 → Ring 3. Каждая фаза — отдельная секция:

```
┌────────────────────────────────────────────────────────┐
│  ●━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━● │
│  RING 0 · CORE · СЕЙЧАС                                │
│                                                        │
│  ┌──────────────────┐  ┌──────────────────┐           │
│  │ [FocusSession]   │  │ [MacMenubar]      │  ← прото │
│  └──────────────────┘  └──────────────────┘           │
│                                                        │
│  ●━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━● │
│  GATE: 30-day retention ≥ 40%                         │  ← gate-разделитель
│  ●━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━● │
│                                                        │
│  RING 1 · AUTO PRESENCE · 0–6 МЕС                     │
│  ⚠ Circuit breaker: Если Microsoft Teams HW < $79...   │
│                                                        │
│  ┌──────────────────┐                                  │
│  │ [SlackSyncUI]    │                                  │
│  └──────────────────┘                                  │
│                                                        │
```

Prototype thumbnails в roadmap — это реальные React-компоненты в `proto/`, отрендеренные в scaled-down `<div style={{ transform: 'scale(0.3)' }}>`. Клик → expand через `layoutId` (Motion shared element transition).

Scroll animations: `whileInView={{ opacity: 1, y: 0 }}` для каждой фазовой секции.

### Page 3: Prototypes Gallery

Grid-галерея всех прото-экранов с фильтрацией по:
- Фазе (Ring 0 / 1 / 2 / 3)
- Стейкхолдеру (Focus Worker / Developer / Team Lead…)

Клик на thumbnail → fullscreen overlay через `AnimatePresence` + `layoutId`.

**Прототипы (приоритет):**

| ID | Экран | Фаза | Стейкхолдер |
|----|-------|------|-------------|
| `FocusSessionScreen` | Активная сессия фокуса (LED + таймер + статус) | Ring 0 | Focus Worker |
| `MacMenubarApp` | macOS menubar дропдаун | Ring 1 | Focus Worker |
| `SlackSyncUI` | Slack статус + правила синхронизации | Ring 1 | Focus Worker, Коллеги |
| `AppLibraryScreen` | Галерея приложений (1-click install) | Ring 2 | Developer |
| `AICoachChat` | AI Focus Coach чат-интерфейс | Ring 3 | Focus Worker |
| `FocusProfilePage` | Публичная страница `busy.app/status/name` | Ring 3 | Семья, Коллеги |

### Page 4: Design System

- Typography specimen (Geist Sans / Geist Mono / Geist Pixel Square + Grid + Circle)
- Color palette (tokens из CSS vars — ring colors, surfaces, text)
- Component gallery: Button, Badge, Card, Input, Sheet, Popover, Tag — с вариантами
- Animation examples (ring entrance, constellation draw, page transition)

---

## Дизайн-система и токены

### CSS tokens (в `src/styles/index.css` через Tailwind v4 `@theme`)

```css
@theme inline {
  /* Fonts */
  --font-sans:         "Geist Variable", ui-sans-serif, system-ui, sans-serif;
  --font-mono:         "Geist Mono Variable", ui-monospace, monospace;
  --font-pixel:        "Geist Pixel Square", monospace;
  --font-pixel-grid:   "Geist Pixel Grid", monospace;

  /* Ring colors */
  --ring-0:  oklch(0.50 0.000 0);    /* grayscale — Core exists now */
  --ring-1:  oklch(0.45 0.22 25);    /* red  — Ring 1 */
  --ring-2:  oklch(0.50 0.18 45);    /* orange — Ring 2 */
  --ring-3:  oklch(0.48 0.16 245);   /* blue — Ring 3 */

  /* Semantic surfaces */
  --bg:      oklch(0.98 0.005 80);   /* warm white */
  --surface: oklch(1.00 0.000 0);
  --border:  oklch(0.88 0.005 80);
  --tx:      oklch(0.12 0.000 0);
  --tx-2:    oklch(0.40 0.000 0);
  --tx-3:    oklch(0.65 0.000 0);
}

/* Dark theme override */
[data-theme="dark"] {
  --bg:      oklch(0.09 0.005 260);
  --surface: oklch(0.13 0.005 260);
  --border:  oklch(0.20 0.010 260);
  --tx:      oklch(0.93 0.005 80);
  --tx-2:    oklch(0.65 0.005 80);
}
```

### shadcn кастомизация

- `new-york` стиль (sharp edges, более плотный)
- `zinc` база → заменяем на custom ring-colors для accent
- Добавляем variant `ring` к Button, Badge, Tag
- Добавляем `viz` variant к Card (прозрачный bg, ring-color border)

---

## Анимации — Philosophy

| Контекст | Библиотека | Паттерн |
|----------|-----------|---------|
| Page transitions | `motion/react` `AnimatePresence` | `opacity` + `y: 10→0`, duration 200ms |
| Ring entrance | `motion.circle` `pathLength` | staggered delay 0.15s per ring |
| Constellation draw | `motion.path` `pathLength` | sequential, 0.6s ease-in-out |
| Feature node pop | `motion.circle` `scale: 0→1` | spring, стагг 0.02s per node |
| Roadmap sections | `motion.section` `whileInView` | `opacity` + `y: 30→0`, once: true |
| Prototype expand | `motion` `layoutId` shared | `AnimatePresence` exit: scale+opacity |
| Button hover | CSS (no JS) | `transform: scale(1.02)`, 100ms |
| Theme switch | CSS `transition` | color vars 200ms |

**LazyMotion** для bundle: async import `domMax`, initial JS ~4.6kb.

---

## Решённые архитектурные вопросы

| Вопрос | Решение |
|--------|---------|
| Хостинг | Vercel (стандартный деплой из `busy/`) |
| Роутинг | BrowserRouter (не HashRouter — Vercel поддерживает SPA rewrites) |
| Прото-экраны | Отдельная задача-согласование до Phase 3: описать и утвердить каждый экран перед кодом |
| JSON data | Критичный шаг Phase 0 — схема продумывается до scaffold |

---

## Критично: JSON Data Schema — архитектурные решения

Это самый важный шаг Phase 0. Неправильная схема = переделка всего.

### Принципы схемы

**1. Разделение: данные vs вычисляемые координаты**

Углы фич на кольцах НЕ хранятся в JSON — они вычисляются в `ring-geometry.ts` на основе:
- Принадлежности к фазе (1.0 vs 1.5 → разные угловые секторы кольца)
- Порядка в массиве фич

Исключения (в JSON): углы стейкхолдеров — это дизайнерские решения, не вычисляемые значения.

**2. Цвета — только через семантические ID, не hex**

JSON содержит `"ring": "r1"` → компонент резолвит в CSS-токен `--ring-1`. Никаких `#ED0018` в JSON.

**3. Фазы и кольца — разные сущности**

Кольцо (ring) = уровень зрелости продукта. Фаза (phase) = хронологический шаг разработки.
Одно кольцо может иметь несколько фаз (r1 → фаза 1.0 и фаза 1.5).
Связь: `phase.ring = "r1"` (многие фазы к одному кольцу).

**4. Прототипы — отдельный файл**

`prototypes.json` описывает метаданные экранов. `roadmap.json` ссылается на ID прототипов, не на имена компонентов. Компонент-маппинг живёт в коде.

**5. Subphase аннотации**

Координаты subphase-меток (`1.0`, `1.5`) в `strategy.html` хардкоженные screen-space. В JSON храним угловой диапазон (`angleDeg: { start, end }`) и радиус размещения — компонент вычисляет экранные координаты.

### Итоговая схема файлов

```
src/data/
├── rings.json          # кольца + фичи (без координат и цветов-hex)
├── features.json       # расширенные описания фич (для detail panels)
├── stakeholders.json   # стейкхолдеры с angle (дизайнерское решение)
├── focus-path.json     # конstellация: anchors, nodes, edges, labels
├── subphases.json      # аннотации фаз на диаграмме (угловые диапазоны)
├── roadmap.json        # фазы, gates, circuit breakers, ссылки на прото
├── prototypes.json     # метаданные прото-экранов
├── insights.json       # инсайты для таба Insights
└── types.ts            # TypeScript interfaces для всего
```

### Ключевые интерфейсы (TypeScript)

```ts
// Кольцо — архитектурный уровень
interface Ring {
  id: 'r0' | 'r1' | 'r2' | 'r3'
  label: string          // "Ring 0"
  short: string          // "Core"
  sub: string            // "Core · Сейчас"
  radiusPx: number       // 72 | 175 | 285 | 390
  gate: string | null
}

// Фича — строго привязана к кольцу и фазе
interface Feature {
  id: string             // "0.1", "1.9", "2.4"
  short: string          // "Pomodoro Timer"
  ring: RingId           // "r0" | "r1" | "r2" | "r3"
  phase: string | null   // "1.0" | "1.5" | "2.0" | "2.5" | null (r0)
  priority: '●' | '◐' | '○'
  problemCluster: 'A' | 'B' | 'C' | 'D' | 'E' | null
}

// Стейкхолдер
interface Stakeholder {
  id: string
  emoji: string
  name: string
  role: string
  priority: 'P0' | 'P1' | 'P2' | 'P3'
  rings: RingId[]
  angleDeg: number       // позиция на внешней орбите — дизайнерское решение
}

// Focus Constellation edge
interface ConstellationEdge {
  from: string           // "r0:0.1"
  to: string             // "r0:0.13"
  type: 'local' | 'bridge'  // local = внутри кольца, bridge = между кольцами
}

// Roadmap phase (не то же что Ring)
interface RoadmapPhase {
  id: string             // "p0", "p1.0", "p1.5"
  ring: RingId
  label: string
  horizon: string        // "Сейчас" | "0–6 мес"
  monthsRange: [number, number]   // [0, 0] | [0, 6]
  gate: string | null
  circuitBreakers: string[]
  prototypeIds: string[] // ссылки на prototypes.json
  milestones: Milestone[]
}

// Прототип экрана
interface Prototype {
  id: string             // "focus-session"
  title: string
  description: string
  phase: string          // "p0" | "p1.0" etc
  stakeholders: string[] // ["fw", "fam"]
  componentName: string  // "FocusSessionScreen" — только для документации
}
```

---

## Фазы реализации

### Phase 0 — Foundation

**0a. JSON Data Schema (приоритет, блокирует всё остальное)** ✅ 2026-04-09
- [x] Прочитать `strategy.html` полностью — зафиксировать все данные
- [x] Создать `src/data/types.ts` — все интерфейсы по схеме выше
- [x] Создать `rings.json` — 4 кольца + все фичи с ring/phase/priority
- [x] Создать `features.json` — 45 фич с расширенными описаниями
- [x] Создать `stakeholders.json` — 8 стейкхолдеров с angleDeg
- [x] Создать `focus-path.json` — anchors начиная с `r0:0.1`, 19 nodes, 18 edges
- [x] Создать `subphases.json` — 4 subphase аннотации с angleDeg ranges
- [x] Создать `roadmap.json` — 6 фаз с gates и circuit breakers
- [x] Создать `prototypes.json` — заглушки для 6 прото-экранов
- [x] Создать `insights.json` — 3 группы / 10 карточек

**0b. Scaffold + Setup** ✅ 2026-04-09
- [x] `npm create vite@latest busy -- --template react-ts`
- [x] Установить все deps (motion, react-router, @fontsource-variable/*, d3-*, tailwindcss, shadcn, vite-tsconfig-paths)
- [x] `npx shadcn@latest init -d` (new-york style) — circular ref в globals.css исправлен
- [x] Настроить `vite.config.ts`: plugin-react-swc + @tailwindcss/vite + vite-tsconfig-paths + path aliases
- [x] Скопировать Geist Pixel woff2 в `public/fonts/` (Square + Grid; Circle/Triangle/Line — не в релизе)
- [x] Vercel: добавить `vercel.json` с SPA rewrite
- [x] `npm run build` проходит чисто

**0c. Design System Foundation** ✅ 2026-04-09
- [x] `src/styles/tokens.css` — все токены (ring 0–3, surfaces, text, spacing, radius, transitions) в обоих темах oklch()
- [x] `src/styles/fonts.css` — @font-face для Geist Pixel Square + Grid (Circle/Triangle/Line закомментированы — нет в релизе)
- [x] `src/styles/index.css` — только imports
- [x] AppShell.tsx — sticky nav 44px, BUSY dot, 4 NavLink табы, theme toggle
- [x] React Router BrowserRouter + 4 page stubs (Strategy, Roadmap, Prototypes, System)
- [x] `npm run build` проходит без ошибок

**Deliverable:** ✅ `npm run build` — 235kb JS, 28kb CSS, 119ms

### Phase 1 — Strategy View ✅ 2026-04-09

- [x] `lib/ring-geometry.ts` — функции: `featureAngle(feature, allFeaturesInRing)`, `stakeholderPosition(stakeholder, radius)`, `constellationEdgePath(from, to, rings)`
- [x] `RingsDiagram.tsx` — SVG `viewBox="0 0 1200 960"`, 4 кольца с Motion pathLength entrance
- [x] `FeatureNode.tsx` — circle + shadcn Popover с данными из features.json
- [x] `StakeholderNodes.tsx` — внешний орбит, emoji + name
- [x] `SubphaseLabel.tsx` — аннотации 1.0 / 1.5 / 2.0 / 2.5 по углам
- [x] `ConstellationOverlay.tsx` — edges (Motion pathLength draw) + highlighted nodes
- [x] Focus Constellation mode toggle
- [x] Theme toggle (light ↔ dark) — реализован в AppShell (Phase 0c)

**Deliverable:** ✅ `npm run build` — 377kb JS, 126ms

### Phase 2 — Roadmap Page

- [x] Вертикальная scrollable layout
- [x] `PhaseSection.tsx` — баннер фазы (ring color) + список фич
- [x] `GateDivider.tsx` — gate-метрика между фазами
- [x] `CircuitBreaker.tsx` — предупреждение-карточка
- [x] `PrototypeSlot.tsx` — placeholder (заполняется в Phase 3)
- [x] Scroll-triggered entrance (`whileInView`)
- [x] Данные из `roadmap.json`

**Deliverable:** ✅ `npm run build` — 386kb JS, 152ms. Roadmap полностью работает с placeholder-слотами для прото

### Phase 3 — Prototype Screens

**6 согласованных экранов** (выбраны 2026-04-09, критерий: широта видения):

| Компонент | Название | Кольцо | UI-паттерн |
|-----------|----------|--------|------------|
| `FocusHeatmap.tsx` | Focus Heatmap | R1.5 | Grid-визуализация год/месяц/неделя/день/час |
| `AIFocusMentor.tsx` | AI Focus Mentor | R3 | Полукруглый ring вокруг таймера + инсайты |
| `EnergyPrediction.tsx` | Energy Prediction | R3 | Календарь с AI-предсказанием окон фокуса |
| `TeamFlowDashboard.tsx` | Team Flow Dashboard | R2.5 | Кто сейчас в deep work — командный вид |
| `FocusProfile.tsx` | Focus Profile | R3 | Публичная карточка фокус-идентичности |
| `BodyDoublingRoom.tsx` | Body Doubling Room | R3 | Виртуальная комната совместного фокуса |

Остальные 9 идей — `docs/strategy/10_prototype_ideas_backlog.md`

- [x] Реализовать `FocusHeatmap.tsx`
- [x] Реализовать `AIFocusMentor.tsx`
- [x] Реализовать `EnergyPrediction.tsx`
- [x] Реализовать `TeamFlowDashboard.tsx`
- [x] Реализовать `FocusProfile.tsx`
- [x] Реализовать `BodyDoublingRoom.tsx`
- [x] Каждый экран — только токены + shadcn `ui/`, никаких инлайн-стилей
- [x] Интеграция в roadmap: scaled thumbnails
- [x] `PrototypesPage.tsx` — grid-галерея с фильтрами по ring/stakeholder
- [x] `layoutId` expand/collapse (Motion shared element transition)

**Deliverable:** 6 прото-экранов в roadmap + gallery page

### Phase 4 — Design System + Polish

- [x] `SystemPage.tsx` — typography specimen, color tokens, component gallery
- [x] Performance: LazyMotion async, route-level code splitting
- [x] `AICoachChat.tsx` + `FocusProfilePage.tsx` (Ring 3 прото)

**Deliverable:** ✅ `npm run build` — initial chunk 227kb (был 462kb). Полностью законченный инструмент

---

## Технические решения и обоснования

### Почему shadcn, а не Material UI / Radix напрямую

shadcn копирует исходники компонентов в `src/components/ui/`. Это значит:
- Полный контроль над стилями без CSS specificity войн
- Можно добавить `viz` и `ring` варианты к любому компоненту без переопределений
- Нет версионного замка на библиотеку компонентов

### Почему D3 только для математики

D3 DOM manipulation несовместима с React reconciler — вызовет stale refs и двойные рендеры. Паттерн: `useMemo` для вычисления координат через d3-scale/d3-shape, React рендерит SVG элементы, Motion анимирует их.

### Geist Pixel — woff2 вручную

`geist` npm-пакет экспортирует `NextFontWithVariable` инстансы — они вызывают `next/font` internals и падают в Vite (`TypeError: (0, import_local.default) is not a function`). Fontsource ещё не добавил Geist Pixel. Решение: скачать `.woff2` из `github.com/vercel/geist-font/releases` и self-host через `@font-face` в CSS.

### JSON vs TypeScript constants

Данные в JSON (не в `.ts` файлах), потому что:
1. Можно загружать динамически (Vite импортирует JSON как ES модуль)
2. В будущем можно переключиться на fetch из CDN/API без изменения кода
3. Редактор данных (не программист) может менять JSON не трогая TS код
4. TypeScript интерфейсы в `types.ts` дают полную типизацию на уровне приложения

### React Router v7 loader для JSON

```tsx
// App.tsx
import { createBrowserRouter } from "react-router"

export const router = createBrowserRouter([
  {
    path: "/strategy",
    lazy: () => import("./pages/StrategyPage"),
    loader: async () => {
      const [rings, focusPath, stakeholders] = await Promise.all([
        import("./data/rings.json"),
        import("./data/focus-path.json"),
        import("./data/stakeholders.json"),
      ])
      return { rings: rings.default, focusPath: focusPath.default, stakeholders: stakeholders.default }
    }
  }
])
```

---

## Acceptance Criteria

### Functional
- [ ] Все 4 страницы роутятся без перезагрузки
- [ ] Strategy view визуально идентичен `strategy.html` в части колец и стейкхолдеров
- [ ] Focus Constellation mode включается/выключается, рисует edges анимированно
- [ ] Roadmap прокручивается вертикально, показывает все фазы + gate dividers
- [ ] Prototype gallery фильтруется по фазе и стейкхолдеру
- [ ] Light/dark theme переключается без перезагрузки
- [ ] Данные любого JSON можно изменить → интерфейс обновляется без кода

### Design
- [ ] Geist Sans, Geist Mono, Geist Pixel Square рендерятся корректно
- [ ] Ring colors соответствуют: r0 gray, r1 red, r2 orange, r3 blue
- [ ] Все анимации плавные (60fps), нет layout shift
- [ ] Prototype screens выглядят как реальные UI (не wireframes)

### Technical
- [ ] TypeScript strict mode, ноль `any`
- [ ] Все данные проходят через JSON + typed interfaces
- [ ] D3 нигде не трогает DOM напрямую
- [ ] Build проходит без warnings (`vite build`)
- [ ] Lighthouse performance > 85 на Strategy page

---

## Зависимости и риски

| Риск | Вероятность | Митигация |
|------|-------------|-----------|
| Geist Pixel woff2 недоступен | Низкая | Fallback на Geist Mono для pixel стилей |
| D3 geometry для колец сложнее расчётного | Средняя | Сначала port exact координат из strategy.html, потом рефакторить |
| Prototype screens занимают много времени | Высокая | Phase 3 — только 4 ключевых экрана, остальные как placeholders |
| shadcn init перезапишет globals.css | Известный баг | После `shadcn init`: проверить circular self-reference `--font-sans: var(--font-sans)` и заменить на literal |

---

## Sources & References

### Internal
- `docs/viz/strategy.html` — исходные JS данные (RINGS, STAKEHOLDERS, FOCUS_PATH, SUBPHASES, INSIGHTS)
- `docs/strategy/08_feature_map.md` — канонический список фич с приоритетами
- `docs/strategy/01_strategy.md` — gate метрики
- `docs/design_system.md` — color palette, typography scale

### External
- [shadcn/ui Vite installation](https://ui.shadcn.com/docs/installation/vite) — официальный гайд
- [Motion for React docs](https://motion.dev/docs/react) — pathLength, AnimatePresence, layoutId
- [D3 + React pattern](https://2019.wattenberger.com/blog/react-and-d3) — React renders, D3 does math
- [@fontsource-variable/geist](https://fontsource.org/fonts/geist) — Vite-compatible font
- [Geist font releases](https://github.com/vercel/geist-font/releases) — Pixel woff2 download
- [Tailwind v4 @theme](https://tailwindcss.com/docs/v4-beta) — oklch tokens, CSS-first config
