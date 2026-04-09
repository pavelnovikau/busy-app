# BusyBar — Продуктовая стратегия
**Дата:** 2026-04-08 | **Фреймворк:** theDots | **Автор:** Product Strategy

---

## Ключевой вопрос

> Как развивать экосистему BusyBar так, чтобы каждый шаг увеличивал ценность существующего железа — и только потом расширял его?

---

## Шаг 1. Большая картина: кто страдает и почему

**Основная проблема:**
Люди не могут защитить своё внимание. Нет инструмента, который синхронизирует физическое пространство ("не входи") с цифровым ("я в DND"). Все решают это вручную — или не решают вообще.

**Стейкхолдеры:**

| Кто | Главная боль |
|-----|-------------|
| 🧑‍💻 Focus Worker | Ручное переключение статусов в каждом инструменте, прерывания без предупреждения |
| 👨‍👩‍👧 Семья дома | Не знают, на звонке ли партнёр — нет физического сигнала |
| 👥 Коллеги | Не знают когда можно подойти, откладывают вопросы |
| 📊 Руководитель | Нет видимости фокус-ритма команды, культура постоянной доступности |
| 🎥 Стример | Нет физического "в эфире" сигнала внутри комнаты |
| ⚙️ Developer | Нет bridge между dev-инструментами и физическим миром |

→ Подробно: [`02_stakeholder_map.md`](02_stakeholder_map.md)

---

## Шаг 2. Кластеры проблем → суть решения

Из всех болей выделяются **5 кластеров**, и все они решаются одним продуктом:

| Кластер | Проблема | Как BUSY Bar закрывает |
|---------|---------|----------------------|
| **A. Невидимость** | Нет физического сигнала занятости | LED как универсальный язык: 🔴 = не беспокоить |
| **B. Ручное управление** | Статусы в разных инструментах не синхронизированы | Auto-status из Calendar, Zoom, Teams → один источник правды |
| **C. Слепые пятна** | Нет данных о реальном фокус-времени | Аналитика: сколько было deep work, паттерны дня |
| **D. Закрытая экосистема** | Конкуренты — замороженные USB-устройства | HTTP API + SDK + Matter = живая платформа |
| **E. Культура доступности** | Прерывать — норма, защищать фокус — грубость | Shared status создаёт новый social contract |

**Вывод:** BUSY Bar — не "умная лампочка". Это **физический якорь** для управления вниманием в цифровом мире.

---

## Шаг 3. Стратегический выбор

**Что НЕ выбираем:**
- ❌ Enterprise-first ($249 в мёртвой зоне закупок)
- ❌ Hardware expansion сейчас (рано, каннибализация)
- ❌ AI-features без данных
- ❌ Конкурировать с Luxafor по цене

**Что выбираем:**
> **Software-first стратегия** — каждое кольцо добавляет программную ценность к существующему железу.

BUSY Bar — **платформа управления вниманием** с физическим якорем. Не устройство с приложением.

---

## Шаг 4. Кольца роста и подфазы исполнения

```
Ring 0 → Ring 1 → Ring 1.5 → Ring 2 → Ring 2.5 → Ring 3
Сейчас   0-6 мес   6-9 мес    9-18 мес  12-24 мес 18-36 мес
```

### 🔴 Ring 0 — Core (сейчас)
LED + таймер + ручное управление. Устройство работает, но всё вручную.
**Слабое место:** пользователь должен помнить включить статус.

---

### 🟠 Ring 1 — Software Platform (0–6 мес) **← Приоритет**

**Фокус Ring 1:** `Auto Presence`

Это минимальный lovable product. Пользователь настраивает систему один раз, после чего BUSY сам понимает, когда человек занят, и сообщает это в рабочую и домашнюю среду.

**Что строим в Ring 1:**

**1. Auto-Status Engine**
- Google Calendar / Outlook → за 2 мин до встречи BUSY Bar автоматически меняется
- Zoom/Teams/Meet открылся → переключается в DND
- Параллельно обновляется Slack status

**2. Focus Analytics**
- Тепловая карта дня: deep work / meetings / available
- Focus Score, Best Hours, Weekly Streak
- Данные появляются сами — без ручного ввода

**3. Shared Presence**
- Family URL: `busy.app/status/pavel` — семья видит статус без приложения
- Кнопка "Нужно поговорить" → тихое уведомление на телефон
- Team view: коллеги видят кто в deep work (опционально, privacy-first)

**4. Desktop App**
- macOS + Windows, menubar indicator, горячие клавиши
- Работает в фоне — не нужно держать браузер

**Ключевые интеграции Ring 1:**
Google Calendar · Outlook · Zoom · Microsoft Teams · Google Meet · Slack

**Gate метрика:** 30-day retention ≥ 40%. Если < 20% — стоп.

→ Подробно: [`04_step1_software_platform.md`](04_step1_software_platform.md)

---

### 🔴 Ring 1.5 — Focus Memory (6–9 мес)

*Запускается только если Auto Presence надёжен и используется регулярно*

**Фокус Ring 1.5:** превратить статусы и сессии в понятную память рабочего дня.

**Что строим:**
- App tracking во время BUSY-сессий
- Auto-timesheet с разбивкой по приложениям
- Project tags / project context
- Heatmap дня, session breakdown
- Стоимость прерываний
- Best Hours / Focus Score
- App blocking на macOS как защиту от внешних прерываний

**Почему это отдельная подфаза:**
- Это другой слой ценности: не "система работает сама", а "система помогает понять мой день"
- Здесь выше техническая сложность и больше privacy-рисков
- Это не должно размывать первый aha moment Ring 1

**Gate метрика:** ≥ 30% активных пользователей возвращаются к аналитике каждую неделю.

---

### 🟡 Ring 2 — Open Platform (6–18 мес)

*Запускается только если Ring 1 gate пройден и Ring 1.5 не ломает core experience*

**Фокус Ring 2:** `Open Platform`

**1. Developer Platform**
- Developer Portal с документацией
- App Library: галерея community-интеграций (GitHub CI, Toggl, Notion, Home Assistant...)
- Webhook / install flow / showcase вокруг уже существующего SDK

**2. Matter + Smart Home**
- BUSY Bar как устройство умного дома (Apple HomeKit, Google Home, HA)
- Recipe-шаблоны: "встреча началась → приглуши свет + DND на doorbell"
- Конкуренты физически не могут добавить Matter (USB-only)

**3. Team Mesh**
- Workspace Dashboard для руководителя
- "BUSY for Teams" Slack Bot (бесплатный, trojan horse для B2B)
- Focus Windows: запланированные тихие часы для всей команды

**Gate метрика:** 200+ интеграций в App Library, 30% пользователей используют 1+ third-party.

→ Подробно: [`05_step2_open_platform.md`](05_step2_open_platform.md)

---

### 🟠 Ring 2.5 — Team + AI-Adjacent (12–24 мес)

*Подфаза после Platform, но до настоящего AI Coach*

**Фокус Ring 2.5:** расширить продукт в командную координацию и новые AI-driven workflows, не заходя в персональные AI-рекомендации.

**Что строим:**
- BUSY for Teams Slack Bot
- Focus Windows / quiet hours
- Team Dashboard в privacy-first форме
- AI Agent Monitor
- Cross-device tracking
- Toggl / Clockify / Harvest / export layer

**Почему это не Ring 3:**
- Эти use cases не требуют 90 дней персональных данных
- Они усиливают ecosystem и workflow gravity до AI Coach
- Это мост между platform value и intelligence value

### ⚪ Ring 3 — Ecosystem (18–36 мес)

*Только после Ring 2 и 2.5 gate*

- BUSY Bar Mini ($99–129) — расширение TAM
- AI Focus Coach — персональные рекомендации на основе накопленных данных
- Marketplace с revenue sharing для разработчиков
- Enterprise tier (если Team Mesh органически растёт)

→ Подробно: [`03_ecosystem_rings.md`](03_ecosystem_rings.md)

---

## Шаг 5. Ключевые риски и circuit breakers

| Риск | Вероятность | Действие |
|------|------------|---------|
| 30-day retention < 20% | Реальная | STOP. Переработать app strategy до любых следующих шагов |
| Microsoft выпускает Teams device < $79 | 25% | Pivot to prosumer/ADHD, drop enterprise roadmap |
| Bricking OTA update | Низкая, но катастрофичная | Rollback capability обязательна до launch |
| Community поворачивается враждебно | Средняя | Open-source больше firmware, price cut до $179 |
| Hardware expansion до валидации | Управляемый | Правило: no new hardware до 50K units + 40% retention |

---

## Главные неизвестные

| Вопрос | Когда проверить |
|--------|----------------|
| **Качество BUSY App** — retention > 40%? | Closed beta, 90 дней после отгрузки |
| **ADHD сегмент** — конвертируется в $249? | A/B тест messaging, 4 недели |
| **Developer community** — 50+ интеграций за 6 мес? | Developer Preview API за 3 мес до launch |

---

## Одностраничная версия

```
СЕЙЧАС  →  R1         →  R1.5          →  R2             →  R2.5              →  R3
Core       Auto Presence  Focus Memory    Open Platform     Team + AI-adjacent    Intelligence

LED+таймер macOS App      App tracking    Developer Portal  Slack Bot             AI Coach
ручной     Calendar/Zoom  Timesheet       App Library       Team Dashboard        Focus Profile
статус     Slack/Family   Interruption $  Home Assistant    AI Agent Monitor      Marketplace
           Desktop App    Heatmap/Score   Recipes           Cross-device          BUSY Mini
```
