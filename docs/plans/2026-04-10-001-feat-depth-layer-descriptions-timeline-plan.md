---
title: "feat: Depth layer — descriptions, stakeholder detail, insights links, Gantt, gate checkpoints"
type: feat
status: active
date: 2026-04-10
---

# Depth layer — 5 усилений стратегического приложения

## Что делаем

Пять независимых улучшений, которые превращают приложение из набора красивых экранов в связный стратегический инструмент.

## 1. Описания фич — Feature.description

**Проблема:** фичи — немые точки с ID. Нет ни одной строки что это такое.

**Решение:**
- `types.ts`: добавить `description: string` в `Feature`
- `features.json`: описание для всех 45 фич (Russian, 1–2 предложения)
- `FeatureNode.tsx`: показывать description в hover-тултипе (расширить карточку)
- `StrategyPage.tsx`: показывать description в feature detail panel

## 2. Stakeholder detail — painPoints

**Проблема:** клик по стейкхолдеру тускнит фичи, но не объясняет почему именно эти.

**Решение:**
- `types.ts`: добавить `painPoints: string[]` в `Stakeholder`
- `stakeholders.json`: 3–4 боли для каждого из 8 стейкхолдеров
- `StrategyPage.tsx`: при выборе стейкхолдера — показывать pain points под списком стейкхолдеров в sidebar

## 3. Insights cross-links — ringRefs

**Проблема:** инсайты изолированы — непонятно какое кольцо они затрагивают.

**Решение:**
- `types.ts`: добавить `ringRefs?: string[]` в `InsightCard`
- `insights.json`: ringRefs для всех 10 карточек
- `InsightsPage.tsx`: показывать ring-бейджи на карточках

## 4. Roadmap Gantt timeline

**Проблема:** фазы показаны как стопка — не видно overlap и параллельности.

**Решение:**
- Добавить горизонтальный Gantt наверху RoadmapPage (0–36 мес)
- Цветные полосы для каждой фазы с overlap
- React + CSS, никаких d3

## 5. Gate metrics как visual checkpoints

**Проблема:** gate metrics выглядят как строчка текста, а не механизм безопасности.

**Решение:**
- Переработать разделители между фазами в RoadmapPage
- Чёткий визуальный checkpoint: иконка + крупный текст + цвет ring

## Файлы изменений

```
busy/src/data/types.ts              — Feature.description, Stakeholder.painPoints, InsightCard.ringRefs
busy/src/data/features.json         — 45 описаний
busy/src/data/stakeholders.json     — 8 × painPoints
busy/src/data/insights.json         — 10 × ringRefs
busy/src/components/viz/FeatureNode.tsx  — description в тултипе
busy/src/pages/StrategyPage.tsx     — description в панели, pain points в sidebar
busy/src/pages/RoadmapPage.tsx      — Gantt + gate checkpoint стиль
busy/src/pages/InsightsPage.tsx     — ring ref бейджи
```

## Acceptance Criteria

- [ ] Hover на любую ноду → тултип показывает описание
- [ ] Клик на ноду → detail panel показывает description
- [ ] Выбор стейкхолдера → под списком появляются 3-4 боли
- [ ] Инсайт-карточки → ring бейджи кликабельны
- [ ] Роадмап → Gantt chart наверху, overlap виден
- [ ] Gate dividers → выглядят как checkpoints, не текст
