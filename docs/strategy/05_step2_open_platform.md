# Шаг 2: Open Platform Strategy
**Временной горизонт:** 6–18 месяцев  
**Фокус:** Developer ecosystem + Smart Home + Team features  
**Gate:** Ring 1 retention ≥ 40%, 60%+ с активными интеграциями  
**Дата:** 2026-04-08

---

## TL;DR

> **Задача Ring 2:** Превратить BUSY Bar из личного инструмента в открытую платформу. Разработчики строят интеграции бесплатно. Умный дом становится частью системы. Команды видят фокус-ритм коллективно.

**Одна строка:** *BUSY Bar становится языком на котором твой workflow говорит с физическим миром.*

> **Важно:** Ring 2 = `Open Platform`. Team-heavy features и AI-adjacent workflows можно вынести в подфазу Ring 2.5, если нужно защитить фокус команды разработки.

---

## Три направления Ring 2

### Направление А — Developer Platform

**Что запускаем:**

> **SDK уже существует.** Python, TypeScript, Go SDK анонсированы и выпущены с Day 1 вместе с HTTP REST API и MQTT. Ring 2 не строит SDK — он строит экосистему вокруг уже готового SDK.

**Пример использования существующего SDK:**
```typescript
import { BusyBar } from '@busy/sdk'

const bar = new BusyBar({ deviceId: 'my-bar' })

// Реагировать на GitHub CI статус
github.on('workflow_run', async (run) => {
  if (run.status === 'in_progress') await bar.setStatus('building')
  if (run.conclusion === 'failure') await bar.setStatus('error')
  if (run.conclusion === 'success') await bar.setStatus('done')
})
```

**Developer Portal:** docs.busy.app
- API Reference с интерактивным playground
- Showcase лучших community-интеграций
- "Build Your First Integration" за 15 минут

**App Library v1:**
- Галерея community-созданных интеграций
- GitHub Actions, GitLab CI, Jira, Linear, Toggl, Notion...
- Каждая интеграция = карточка с install в 1 клик

**Killer integrations (первые 6):**
1. GitHub CI/CD — цвет по статусу сборки
2. Home Assistant — двунаправленная автоматизация
3. Toggl/Clockify — цвет по трекеру времени
4. Obsidian/Notion — focus mode в writing tool
5. Spotify — "слушаю музыку во время работы" статус
6. Physical timer button → автоматически создаёт событие в Toggl

---

### Направление Б — Matter + Smart Home

**Что даёт Matter:**
- BUSY Bar виден в Apple HomeKit, Google Home, Home Assistant
- Автоматизации: "встреча началась → приглуши свет + включи вентилятор + DND на doorbell"
- Обратно: "кто-то открыл входную дверь → уведомление на BUSY Bar"

**Готовые recipe-шаблоны:**
```
"Focus Mode ON" recipe:
  TRIGGER: BUSY Bar → красный
  ACTIONS:
    → Philips Hue: освещение 4000K 80%
    → Sonos: режим тишины
    → Smart Lock: не открывать без разрешения
    → Ring Doorbell: silent mode

"Meeting Mode" recipe:
  TRIGGER: Zoom открылся
  ACTIONS:
    → BUSY Bar: красный + пульсация
    → Умный свет: кинематографическое освещение
    → "В эфире" на умном дисплее у двери
```

**Почему это важно:**
- Ни один конкурент не имеет WiFi + Matter (все USB)
- Home Assistant community: 500K+ активных пользователей = готовая аудитория
- Создаёт реальный switching cost: 15+ настроенных автоматизаций не переносятся на другое устройство

---

### Направление В — Team Mesh + Leadership View

**Team Status Board:**
- Руководитель видит агрегированный статус команды
- Privacy-first: каждый сам решает что показывать
- No tracking без consent

**Focus Windows:**
- Запланировать "тихие часы" для всей команды
- BUSY Bar у каждого автоматически переходит в "не беспокоить"
- Calendar блоки синхронизируются между участниками

**"BUSY for Teams" Slack Bot (бесплатный):**
```
/busy-status             → видеть кто в deep work прямо сейчас
/busy-when @pavel        → когда Pavel будет свободен?
/busy-focus 90min        → запустить сессию фокуса для всей команды
```
- Бесплатный trojan horse: использует без BUSY Bar
- Для полного опыта нужно устройство → conversion funnel

> **Scope note:** если Ring 2 перегружен, Team Mesh можно формально перенести в Ring 2.5 вместе с AI Agent Monitor и time-tracking exports. Это не ломает platform logic.

---

## Метрики Gate для перехода к Ring 3

| Метрика | Цель | Критично |
|---------|------|---------|
| App Library: кол-во интеграций | ≥ 200 | ≥ 50 |
| Third-party интеграции у пользователей | ≥ 30% используют 1+ | — |
| GitHub stars (SDK репо) | ≥ 5,000 | ≥ 1,000 |
| Home Assistant интеграций активных | ≥ 10K устройств | — |
| Team Mesh: компании с 5+ устройствами | ≥ 500 | — |

---

## Что НЕ делаем в Ring 2

| Нет | Почему |
|-----|--------|
| Новое железо | Circuit Breaker #5 из Tesla Playbook — фокус важнее |
| Enterprise RFP / Fortune 500 | $249 в мёртвой зоне закупок; Flipper brand = liability |
| Платный App Library | Сначала volume, потом monetization |
| AI features | Нужно накопить достаточно данных (Ring 3) |

---

## Connection to Ring 3

Успешный Ring 2 создаёт:
- **Data flywheel:** миллионы фокус-сессий → AI может давать персональные рекомендации
- **Developer community:** 50+ поддерживаемых интеграций → Marketplace с revenue sharing
- **Enterprise signal:** если Team Mesh органически растёт в 500+ компаний → можно строить enterprise tier
- **Hardware justification:** доказанный ecosystem → BUSY Bar Mini имеет смысл (не каннибализм, а расширение)

## Connection to Ring 2.5

После Platform логичный следующий слой:
- Team workflows (`Slack Bot`, `Focus Windows`, `Team Dashboard`)
- AI-adjacent workflow integrations (`AI Agent Monitor`)
- time-tracking distribution layer (`Toggl`, `Clockify`, exports`)

Этот слой ещё не требует персонального AI Coach, но уже усиливает workflow gravity.

---

## Экраны и прототипы

→ Полные экраны: [`docs/prototypes/step2_screens.html`](../prototypes/step2_screens.html)

**Ключевые экраны:**
1. **Developer Portal landing** — SDK, docs, showcase
2. **App Library** — галерея интеграций с install в 1 клик
3. **Smart Home setup** — Matter pairing + recipe builder
4. **Team Dashboard** — aggregate focus view для руководителя
5. **Slack Bot UI** — team status в Slack interface
