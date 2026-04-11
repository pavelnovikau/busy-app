---
title: review: BUSY React + Vite implementation vs plan
type: review
status: completed
date: 2026-04-09
source_plan: docs/plans/2026-04-09-001-feat-busy-react-vite-strategy-app-plan.md
---

# BUSY React + Vite Implementation Review

## Scope

Проверка реализации `busy/` против плана в:

- `docs/plans/2026-04-09-001-feat-busy-react-vite-strategy-app-plan.md`

Проверялись:

- структура проекта
- data layer
- страницы и навигация
- roadmap / prototypes интеграция
- design system discipline
- build / lint состояние

---

## Short Verdict

Реализация уже большая, живая и явно не "заглушка":

- app собирается
- 4 страницы есть
- data layer в JSON есть
- rings / roadmap / prototypes / system pages реально работают
- phase model `1.0 / 1.5 / 2.0 / 2.5` уже присутствует

Но от плана есть несколько важных расхождений:

1. roadmap связывает фазы с концептуально неправильными прототипами
2. prototype gallery уже плана: нет фильтрации по stakeholder и phase
3. hooks / loader-based data layer из плана не реализованы
4. `features.json` пока не стал расширенным каноническим источником для detail panels
5. design-system discipline нарушена: в коде очень много inline styles
6. lint не проходит

---

## What Matches Well

### Foundation

- `busy/` создан как отдельное React + Vite приложение
- `react`, `vite`, `motion`, `d3-*`, `geist`, `tailwind`, `react-router` подключены
- есть `vercel.json`
- fonts и tokens вынесены отдельно

### Pages

- есть 4 страницы:
  - `StrategyPage`
  - `RoadmapPage`
  - `PrototypesPage`
  - `SystemPage`

### Data Layer

- есть отдельные JSON:
  - `rings.json`
  - `features.json`
  - `stakeholders.json`
  - `focus-path.json`
  - `subphases.json`
  - `roadmap.json`
  - `prototypes.json`
  - `insights.json`

### Visualization

- есть ring geometry math
- есть отдельные viz-компоненты
- есть focus constellation overlay
- есть subphase labels

### Roadmap / Prototype direction

- roadmap реально рендерит phases из JSON
- roadmap умеет встраивать live preview прототипов
- prototypes page уже умеет expand / collapse и lazy-feel presentation

---

## Findings

### P1. Roadmap phase-to-prototype mapping is semantically wrong

Files:

- `busy/src/data/roadmap.json`
- `busy/src/data/prototypes.json`
- `busy/src/pages/RoadmapPage.tsx`

Проблема:

- `Phase 1.0 — Auto Presence` показывает `ai-focus-mentor`, который относится к `r3`
- `Phase 1.5 — Focus Memory` показывает `energy-prediction`, который тоже относится к `r3`
- `Phase 2.0 — Open Platform` показывает `team-flow-dashboard`, который ближе к `2.5`
- `Phase 0 — Core` показывает `focus-heatmap`, который относится к `r1.5`

Это ломает саму идею roadmap как последовательности развития. Сейчас thumbnails визуально красивые, но стратегически вводят в заблуждение.

### P1. Prototype gallery does not meet planned filtering model

Files:

- `busy/src/pages/PrototypesPage.tsx`
- `busy/src/data/prototypes.json`

Проблема:

- в плане указана фильтрация по фазе и по stakeholder
- в реализации есть только фильтр по ring

Из-за этого страница prototype gallery не помогает смотреть систему глазами конкретного пользователя или конкретной фазы.

### P1. Lint is failing

Files:

- `busy/src/components/ui/button.tsx`

Состояние:

- `npm run build` проходит
- `npm run lint` падает на `react-refresh/only-export-components`

Это значит, что проект технически ещё не в clean state, даже если build зелёный.

### P2. Planned typed hooks / loader-based data access are not implemented

Files:

- `busy/src/App.tsx`
- `busy/src/pages/StrategyPage.tsx`
- `busy/src/pages/RoadmapPage.tsx`
- `busy/vite.config.ts`

Проблема:

- в плане были `useRingsData`, `useRoadmapData`, `useFocusPath`
- также был заявлен loader-oriented router pattern
- в реализации страницы импортируют JSON напрямую

Это не ломает app сейчас, но уменьшает управляемость data layer и делает дальнейшую эволюцию менее чистой.

### P2. `features.json` is still too thin for the role promised in the plan

Files:

- `busy/src/data/features.json`
- `busy/src/components/viz/FeatureNode.tsx`

Проблема:

- в плане `features.json` должен был стать расширенным источником для detail panels
- фактически там только короткое имя, ring, phase, priority и cluster
- detail panel по сути остаётся hover tooltip, а не полноценным rich detail layer

То есть data split создан, но смысл его пока не реализован до конца.

### P2. Design-system discipline is weaker than promised

Files:

- `busy/src/pages/*.tsx`
- `busy/src/components/proto/*.tsx`
- `busy/src/components/layout/AppShell.tsx`

Проблема:

- план декларирует token-first подход и отдельный design-system layer
- в реальности большая часть layout и прототипов написана через большие inline style objects
- в `Phase 3` отдельно написано "никаких inline-стилей", но текущая реализация идёт ровно через них

Это не критично для демо, но создаёт высокий cost на polish и переиспользование.

### P2. Current navigation is simpler than the strategy workflow actually needs

Files:

- `busy/src/components/layout/AppShell.tsx`
- `busy/src/pages/StrategyPage.tsx`

Проблема:

- top nav реализован и соответствует одной из веток плана
- но исчез contextual rail / control surface, который в текущем `strategy.html` играет важную роль:
  - focus toggle
  - stakeholders context
  - ring legend

В React-версии это пока частично растворилось по странице, и стратегический инструмент стал чуть менее "instrument-like".

### P3. Some planned structure is still missing or simplified

Files:

- `busy/src/`

Наблюдения:

- нет `hooks/`
- нет `components/ui` gallery кроме очень узкого набора
- нет отдельных `PageHeader`, `Sidebar`
- нет `lib/constellation.ts`

Это не обязательно плохо, но это значит, что реализация уже пошла по slightly different architecture path, чем описано в плане.

### P3. Plan says “visual parity with strategy.html”, implementation is directionally close but not parity

Files:

- `busy/src/pages/StrategyPage.tsx`
- `busy/src/components/viz/*.tsx`

Проблема:

- базовая логика и композиция есть
- но parity с текущим `docs/viz/strategy.html` пока скорее conceptual, чем visual/interaction parity

Особенно это касается:

- richer detail panels
- stakeholder context rail
- focus-mode polish
- map interaction depth

---

## Suggestions

### 1. Fix roadmap/prototype truth first

Сделать один канонический mapping:

- либо каждая phase показывает только prototype своего этапа
- либо roadmap явно различает:
  - `phase prototypes`
  - `future concept previews`

Сейчас эти два режима смешаны.

### 2. Add `phase` to prototypes and filter gallery by phase + stakeholder

В `prototypes.json` стоит добавить:

- `phase`
- возможно `status` (`concept`, `high-fidelity`, `in-roadmap`)

Тогда gallery станет реально продуктовым инструментом, а не просто стеной экранов.

### 3. Introduce thin data hooks before app grows further

Минимально:

- `useRingsData`
- `useFeaturesData`
- `useRoadmapData`
- `usePrototypesData`

Даже без router loaders это уже вернёт архитектурную дисциплину.

### 4. Upgrade feature details into a real info layer

Нужно расширить `features.json`:

- `title`
- `summary`
- `whyNow`
- `phaseNarrative`
- `stakeholders`
- `dependencies`

Тогда стратегия станет действительно living document, а не только diagram.

### 5. Freeze token discipline and stop growth of inline styles

Практический следующий шаг:

- вынести repeated card/layout patterns в reusable components
- для prototype screens хотя бы создать 3-4 shared wrappers:
  - `ProtoFrame`
  - `ProtoHeader`
  - `ProtoSection`
  - `ProtoLabel`

Это резко уменьшит расползание стилей.

### 6. Restore contextual controls for Strategy page

Даже если top nav остаётся, Strategy page просит отдельный control rail:

- focus toggle
- legend
- stakeholder filters
- maybe insight cards

Именно это делает экран инструментом, а не просто SVG-страницей.

### 7. Bring project back to green lint state immediately

Это маленькая, но важная дисциплинарная правка:

- починить `button.tsx`
- прогонять `build + lint` как обязательный gate

---

## Suggested Priority Order

### Fix now

1. Починить roadmap/prototype mapping
2. Починить lint
3. Добавить phase + stakeholder filtering в prototypes

### Next

4. Ввести data hooks
5. Расширить `features.json`
6. Вернуть contextual rail на Strategy

### Later polish

7. Уменьшить inline styles
8. Подтянуть visual parity к `strategy.html`
9. Расширить system page до реального component showcase

---

## Verification

Проверено вручную по коду и через команды:

- `npm run build` — проходит
- `npm run lint` — падает
