---
title: "feat: Simple Mode — Story Landing для BUSY Bar"
type: feat
status: active
date: 2026-04-18
origin: docs/brainstorms/2026-04-18-simple-mode-requirements.md
---

# feat: Simple Mode — Story Landing для BUSY Bar

## Overview

Добавить упрощённый режим просмотра (`/simple`) и landing-страницу (`/`), которые рассказывают историю BUSY Bar через нарратив **Desire → Problem → Solution → Transformation**. Текущая full-версия переезжает на `/strategy`. Цель: человек, незнакомый с продуктом, за 2 минуты понимает суть и хочет открыть full-версию.

(see origin: docs/brainstorms/2026-04-18-simple-mode-requirements.md)

## Problem Statement

Full-версия перегружена: кольца, SVG, данные. Реальная обратная связь — человек открыл страницу и не понял ничего. Нет нарратива — только структура. Simple mode решает это последовательным storytelling с эмоциональным крюком в первые 3 секунды.

## Proposed Solution

**8 глав** в формате `Desire → Problem → Solution (×5 фаз) → Transformation`. Каждая глава:
- 100dvh полноэкранная секция
- Заголовок (большой) + абзац + 3 ключевые точки
- Flexoki-цвет акцента (уникальный для каждой главы)
- `whileInView` fade-in через `motion`

Sticky bottom bar показывает текущую главу и открывает bottom sheet (TOC) со списком глав и кнопкой «Полная версия →».

## Colour Map (Flexoki)

| # | Глава | Токен | Роль |
|---|-------|-------|------|
| 1 | Желание | `--cy` Cyan | Возможность, aspirational |
| 2 | Враг | `--ma` Magenta | Разрушение, tension |
| 3 | Сигнал (R0) | `--sl` Slate | Physical, grounded — ring-0 |
| 4 | Автопилот (R1.0) | `--re` Red | Active — ring-1 |
| 5 | Зеркало (R1.5) | `--ye` Yellow | Insight, analytics |
| 6 | Платформа (R2) | `--or` Orange | Growth — ring-2 |
| 7 | Интеллект (R3) | `--bl` Blue | AI, depth — ring-3 |
| 8 | Трансформация | `--gr` Green | Achievement |

Кольцевые цвета R0–R3 идентичны full-версии — когнитивная связность.

## Routing Changes

```
БЫЛО                    СТАНЕТ
/           → StrategyPage    →  /strategy    (переименование)
—                             →  /            LandingPage (новый index)
—                             →  /simple      SimplePage (новый)
/roadmap    → без изменений
/insights   → без изменений
/prototypes → без изменений
/system     → без изменений
/about      → без изменений
```

`AppShell.tsx` navItems: обновить `{ to: '/' }` на `{ to: '/strategy' }`.
`vercel.json` rewrite остаётся — SPA rewrite `/(.*) → /index.html`.

## Implementation Phases

### Phase 1 — Data & Types

**Файлы:**
- `busy/src/data/simple-story.json` — 8 глав, полный контент
- `busy/src/data/types.ts` — добавить тип `SimpleChapter`
- `busy/src/lib/data.ts` — добавить `getSimpleStory()`

#### `SimpleChapter` type (добавить в `types.ts`)

```ts
export interface SimpleChapter {
  id: string                // 'desire' | 'enemy' | 'signal' | ...
  index: number             // 1–8
  name: string              // 'Желание'
  color: string             // '--cy' (CSS var name)
  headline: string          // главный заголовок
  body: string              // абзац поддержки
  bridge?: string           // 'yes, but...' переход (опционально)
  keyPoints: [string, string, string]  // ровно 3 точки
}
```

#### `simple-story.json` — схема

```json
[
  {
    "id": "desire",
    "index": 1,
    "name": "Желание",
    "color": "--cy",
    "headline": "Ты хочешь одного: заканчивать день с ощущением, что сделал что-то настоящее.",
    "body": "Не «был занят». Не «отвечал на сообщения». А сделал что-то, что имеет значение.",
    "keyPoints": [
      "2–4 часа глубокой работы — именно столько нужно мозгу для сложной задачи",
      "Конец дня с ощущением прогресса — конкретное состояние, которого хочет каждый",
      "Разрыв между «занят» и «продуктивен» — это разные вещи, и ты это чувствуешь"
    ]
  },
  {
    "id": "enemy",
    "index": 2,
    "name": "Враг",
    "color": "--ma",
    "headline": "Проблема не в тебе.",
    "body": "Каждое прерывание стоит 23 минуты восстановления. Три раза в день — почти два часа потеряно. Без исключений. Каждый день.",
    "keyPoints": [
      "23 минуты на восстановление — Stanford Research, каждый раз",
      "Инструменты не знают друг о друге — Flow, Qbserve, Toggl работают отдельно",
      "Нет единого потока — который наблюдал бы за тобой и помогал становиться лучше"
    ]
  },
  {
    "id": "signal",
    "index": 3,
    "name": "Сигнал",
    "color": "--sl",
    "headline": "Красный свет на столе. Люди видят — и не входят.",
    "body": "BUSY Bar — физический сигнал: я занят, не беспокой. Работает без телефона, без слов, без объяснений.",
    "bridge": "Но ты всё равно должен помнить включить.",
    "keyPoints": [
      "Pomodoro Timer + LED — физический ритм сессии, виден всем вокруг",
      "Status Button — одна кнопка: занят / пауза / доступен",
      "WiFi + Matter + HTTP API — живая платформа, не замороженный гаджет"
    ]
  },
  {
    "id": "autopilot",
    "index": 4,
    "name": "Автопилот",
    "color": "--re",
    "headline": "Система сама знает, когда ты занят.",
    "body": "Началась встреча в Calendar — BUSY включился. Открыл Zoom — статус в Slack обновился. Семья видит через Family URL без приложения.",
    "bridge": "Но ты всё ещё не знаешь, как реально устроен твой день.",
    "keyPoints": [
      "Calendar + Zoom auto-detection — macOS App, статус живёт сам",
      "Slack Sync — один источник правды для стола и чата",
      "Family URL — физическое и цифровое говорят одним языком"
    ]
  },
  {
    "id": "mirror",
    "index": 5,
    "name": "Зеркало",
    "color": "--ye",
    "headline": "BUSY Bar видел каждое прерывание. Теперь он показывает тебе цену.",
    "body": "Не тайм-трекер. Не wellness-дашборд. Зеркало: что реально происходит с твоим фокусом — на основе физического контекста, а не экранного.",
    "bridge": "Но твои инструменты всё ещё живут отдельно.",
    "keyPoints": [
      "Interruption Cost — сколько минут стоило каждое прерывание",
      "Focus Heatmap — реальный ритм дня, построенный автоматически",
      "Auto-Timesheet — история работы без ручного логирования"
    ]
  },
  {
    "id": "platform",
    "index": 6,
    "name": "Платформа",
    "color": "--or",
    "headline": "BUSY становится протоколом, не продуктом.",
    "body": "Одна компания не построит все интеграции. Но community построит — если дать правильные инструменты. Каждый пользователь BUSY подтягивает 3–5 новых через Slack и Family URL.",
    "bridge": "Но кто помогает тебе становиться лучше?",
    "keyPoints": [
      "Developer Portal + SDK — TypeScript/Python, GitHub CI, Home Assistant, Notion",
      "Matter + App Library — distribution в сообщества, где уже строят сценарии",
      "Slack Bot — бесплатный trojan horse: команда присоединяется без покупки"
    ]
  },
  {
    "id": "intelligence",
    "index": 7,
    "name": "Интеллект",
    "color": "--bl",
    "headline": "90 дней данных о твоих прерываниях. AI Coach видит то, чего ты сам не замечаешь.",
    "body": "По вторникам твой пик — с 10 до 12. После трёх встреч подряд тебе нужен перерыв. Не спамит — говорит, когда важно.",
    "keyPoints": [
      "AI Focus Coach — рекомендации на основе твоих паттернов, не generic советов",
      "Team Dashboard — командный ритм без surveillance, поверх Slack Bot",
      "Marketplace + revenue sharing — разработчики строят экономику вокруг твоего устройства"
    ]
  },
  {
    "id": "transformation",
    "index": 8,
    "name": "Трансформация",
    "color": "--gr",
    "headline": "Ты снова открываешь ноутбук вечером.",
    "body": "И на этот раз знаешь: что сделал, почему это важно, что делать завтра.",
    "keyPoints": [
      "Твой день измерен — не вручную, а автоматически",
      "Твоё окружение тебя уважает — физически и цифрово, синхронно",
      "Система учится вместе с тобой — каждую неделю чуть точнее"
    ]
  }
]
```

#### `data.ts` — добавить

```ts
import simpleStoryRaw from '@data/simple-story.json'
const simpleStory = simpleStoryRaw as SimpleChapter[]
export function getSimpleStory(): SimpleChapter[] { return simpleStory }
```

---

### Phase 2 — Routing

**Файл: `busy/src/App.tsx`**

```tsx
// Добавить lazy import
const LandingPage = lazy(() => import('./pages/LandingPage'))
const SimplePage  = lazy(() => import('./pages/SimplePage'))

// Изменить index route + добавить новые:
<Route path="/" element={<AppShell />}>
  {/* БЫЛО: <Route index element={<Suspense>StrategyPage</Suspense>} /> */}
  <Route index element={<Suspense fallback={<PageFallback />}><LandingPage /></Suspense>} />
  <Route path="simple" element={<Suspense fallback={<PageFallback />}><SimplePage /></Suspense>} />
  <Route path="strategy" element={<Suspense fallback={<PageFallback />}><StrategyPage /></Suspense>} />
  {/* остальные маршруты без изменений */}
</Route>
```

**Файл: `busy/src/components/layout/AppShell.tsx`**

```ts
// БЫЛО:
{ to: '/', label: 'Стратегия' }
// СТАНЕТ:
{ to: '/strategy', label: 'Стратегия' }
```

Значение `end={to === '/'}` на `<NavLink>` заменить на явную проверку:
`end={to === '/strategy'}` — чтобы `/strategy` не подсвечивал активный стейт на `/` и `/simple`.

---

### Phase 3 — LandingPage

**Файл: `busy/src/pages/LandingPage.tsx`**

Полноэкранная центрированная страница (100dvh). Без `AppShell` навигации по содержанию — но `AppShell` всё равно оборачивает, поэтому нижний nav bar виден.

```tsx
// Структура компонента
export default function LandingPage() {
  return (
    <div style={containerStyle}>
      <p style={hookStyle}>Суверенитет над своим вниманием.</p>
      <div style={buttonsStyle}>
        <Link to="/simple">
          <button style={simpleButtonStyle}>SIMPLE</button>
        </Link>
        <Link to="/strategy">
          <button style={fullButtonStyle}>FULL</button>
        </Link>
      </div>
    </div>
  )
}
```

**Стили (inline CSS vars, без magic numbers):**
- Контейнер: `display: flex`, `flexDirection: column`, `alignItems: center`, `justifyContent: center`, `minHeight: calc(100dvh - var(--nav-height))`, `gap: var(--space-8)`
- Хук-строка: `--text-2xl` / `--text-3xl`, `--tx`, `textAlign: center`, `maxWidth: 560px`
- Кнопка SIMPLE: primary style — `--color-primary` border/text, `--bg` background, `--radius-lg`, `--space-4` padding
- Кнопка FULL: secondary style — `--border` border, `--tx-2` text, `--bg` background
- Hover state: через `motion.button` `whileHover={{ scale: 1.02 }}`

---

### Phase 4 — SimplePage + Components

#### `busy/src/pages/SimplePage.tsx`

Контейнер, загружает данные, рендерит главы + bottom bar.

```tsx
import { getSimpleStory } from '@lib/data'
import SimpleChapter from '@components/simple/SimpleChapter'
import SimpleBottomBar from '@components/simple/SimpleBottomBar'

export default function SimplePage() {
  const chapters = getSimpleStory()
  const [activeChapterId, setActiveChapterId] = useState(chapters[0].id)
  const [tocOpen, setTocOpen] = useState(false)

  return (
    <div style={{ paddingBottom: 'var(--nav-clearance)' }}>
      {chapters.map(chapter => (
        <SimpleChapter
          key={chapter.id}
          chapter={chapter}
          onVisible={setActiveChapterId}
        />
      ))}
      <SimpleBottomBar
        chapters={chapters}
        activeChapterId={activeChapterId}
        onTocOpen={() => setTocOpen(true)}
      />
      <SimpleTOC
        chapters={chapters}
        open={tocOpen}
        onClose={() => setTocOpen(false)}
      />
    </div>
  )
}
```

#### `busy/src/components/simple/SimpleChapter.tsx`

```tsx
interface Props {
  chapter: SimpleChapter
  onVisible: (id: string) => void
}
```

Структура секции:
- Root: `<section id={chapter.id}>` с `min-height: 100dvh`, `display: flex`, `flexDirection: column`, `justifyContent: center`, `padding: var(--space-9) var(--space-7)`, `maxWidth: 560px`, `margin: 0 auto`
- Цветовой акцент: маленький pill/тег сверху с `background: color-mix(in srgb, var({chapter.color}) 15%, var(--bg))`, `color: var({chapter.color})`, текст `chapter.name`
- Заголовок: `--text-3xl` (mobile) / `--text-4xl` (desktop), `--tx`, `font-weight: 600`
- Абзац: `--text-base` / `--text-lg`, `--tx-2`, `marginTop: var(--space-4)`
- Key points: 3 строки с маленьким цветным `→` (цвет `chapter.color`) + текст `--text-sm`, `--tx-2`
- Bridge (если есть): курсив, `--tx-3`, `--text-sm`, `marginTop: var(--space-6)`, `borderLeft: 2px solid var({chapter.color})`, `paddingLeft: var(--space-4)`

**`whileInView` анимация** (паттерн из `PhaseSection.tsx`):
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-60px' }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
>
```

**`onVisible` через IntersectionObserver** (нативный API, не motion):
```tsx
const ref = useRef<HTMLElement>(null)
useEffect(() => {
  const obs = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) onVisible(chapter.id) },
    { threshold: 0.5 }
  )
  if (ref.current) obs.observe(ref.current)
  return () => obs.disconnect()
}, [chapter.id, onVisible])
```

#### `busy/src/components/simple/SimpleBottomBar.tsx`

Sticky bar (позиционируется как `position: fixed`, `bottom: var(--nav-height)`, не конфликтует с app nav):

```
[ ≡ ]  [  Зеркало  ]
```

- Высота: `48px`
- Background: `var(--surface)`, `backdrop-filter: blur(12px)`, `border-top: 1px solid var(--border)`
- Иконка оглавления (≡): `<button>` с `onClick={onTocOpen}`, иконка из `lucide-react` (`AlignJustify` или `List`)
- Название главы: `--text-sm`, `--tx-2`, по центру, обновляется при смене `activeChapterId`

#### `busy/src/components/simple/SimpleTOC.tsx`

Bottom sheet через `motion` + `AnimatePresence` (паттерн как в `PrototypesPage.tsx`):

```tsx
<AnimatePresence>
  {open && (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'var(--overlay)', zIndex: 40 }}
      />
      {/* Sheet */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        role="dialog"
        aria-modal="true"
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          background: 'var(--surface)',
          borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
          padding: 'var(--space-6)',
          zIndex: 50,
          paddingBottom: 'calc(var(--nav-height) + var(--space-6))'
        }}
      >
        {/* Drag handle */}
        <div style={{ width: 40, height: 4, background: 'var(--border-2)', borderRadius: 2, margin: '0 auto var(--space-5)' }} />

        {/* Chapter list */}
        {chapters.map(chapter => (
          <button key={chapter.id} onClick={() => scrollToChapter(chapter.id)}>
            <span style={{ color: `var(${chapter.color})` }}>→</span>
            {chapter.name}
          </button>
        ))}

        {/* Full version CTA */}
        <Link to="/strategy">
          <button style={fullVersionStyle}>Полная версия →</button>
        </Link>
      </motion.div>
    </>
  )}
</AnimatePresence>
```

`scrollToChapter(id)`: `document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })`, затем `onClose()`.

---

### Phase 5 — Last chapter CTA

На последней секции (Трансформация, `index === 8`) добавить inline кнопку «Полная версия →» внутри `SimpleChapter`:

```tsx
{chapter.index === chapters.length && (
  <Link to="/strategy">
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={fullCTAStyle}
    >
      Полная версия →
    </motion.button>
  </Link>
)}
```

---

## Acceptance Criteria

- [ ] R1. `/` — landing с двумя кнопками SIMPLE и FULL, hook-строка
- [ ] R2. `/simple` — 8 полноэкранных секций, вертикальный скролл
- [ ] R3. Все 8 глав с заголовком, абзацем, 3 key points, bridge-переходом (где есть)
- [ ] R4. Каждая solution-глава имеет bridge ("yes, but...") → нарастание к трансформации
- [ ] R5. Flexoki-цвет на каждую главу — pill-тег + `→` маркеры + bridge border
- [ ] R6. Sticky bottom bar (48px, `bottom: --nav-height`) с иконкой и названием главы
- [ ] R7. Bottom sheet открывается по тапу на иконку, показывает 8 глав + CTA
- [ ] R8. Кнопка «Полная версия →» в TOC и на последней секции → `/strategy`
- [ ] R9. Только CSS vars, никаких hex/magic numbers в компонентах
- [ ] R10. Геisт Variable для заголовков (`--text-3xl`/`--text-4xl`), `--tx-2` для текста
- [ ] R11. mobile-first, max-width 560px centered на десктопе
- [ ] R12. `whileInView` fade-in на каждой главе (`once: true`)
- [ ] Текущий `/` → `StrategyPage` переехал на `/strategy`
- [ ] Nav item «Стратегия» ведёт на `/strategy`
- [ ] `simple-story.json` — единственный источник контента

## Technical Decisions

| Вопрос | Решение | Причина |
|--------|---------|---------|
| Bottom sheet | `motion` + `AnimatePresence` | Консистентно с `PrototypesPage`, нет новых зависимостей |
| Scroll detection | Нативный `IntersectionObserver` | `whileInView` — для анимации, observer — для state |
| Landing nav | LandingPage внутри AppShell | Единая оболочка, нижний nav bar виден везде |
| Contaner width | `maxWidth: 560px, margin: 0 auto` | Читаемость на десктопе, мобайл-first |

## File Checklist

```
busy/src/data/simple-story.json          ← создать (Phase 1)
busy/src/data/types.ts                   ← добавить SimpleChapter (Phase 1)
busy/src/lib/data.ts                     ← добавить getSimpleStory() (Phase 1)
busy/src/App.tsx                         ← routing changes (Phase 2)
busy/src/components/layout/AppShell.tsx  ← nav item /strategy (Phase 2)
busy/src/pages/LandingPage.tsx           ← создать (Phase 3)
busy/src/pages/SimplePage.tsx            ← создать (Phase 4)
busy/src/components/simple/
  SimpleChapter.tsx                      ← создать (Phase 4)
  SimpleBottomBar.tsx                    ← создать (Phase 4)
  SimpleTOC.tsx                          ← создать (Phase 4)
```

## Sources

- **Origin document:** [docs/brainstorms/2026-04-18-simple-mode-requirements.md](../brainstorms/2026-04-18-simple-mode-requirements.md)
  - Key decisions carried forward: storytelling format D→P→S→T, семантические имена глав, routing `/` → `/strategy`
- **Story narrative:** [docs/brainstorms/2026-04-18-simple-mode-story.md](../brainstorms/2026-04-18-simple-mode-story.md)
- `busy/src/App.tsx` — routing pattern (lines 9–47)
- `busy/src/components/layout/AppShell.tsx` — navItems pattern (lines 5–12)
- `busy/src/pages/PrototypesPage.tsx` — motion overlay pattern (lines 628–827)
- `busy/src/components/roadmap/PhaseSection.tsx` — whileInView pattern (lines 29–33)
- `busy/src/lib/data.ts` — data getter pattern
- `busy/src/data/types.ts` — type definitions
- `busy/src/styles/tokens.css` — CSS vars: `--cy`, `--ma`, `--sl`, `--re`, `--ye`, `--or`, `--bl`, `--gr`
