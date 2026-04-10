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
Ring 0 → Ring 1 → Ring 1.5 → Ring 2 → Ring 3
Сейчас   0-6 мес   6-9 мес    9-18 мес  18-36 мес
```

### 🔴 Ring 0 — Core (сейчас)
LED + таймер + ручное управление. Устройство работает, но всё вручную.
**Слабое место:** пользователь должен помнить включить статус.

---

### 🟠 Ring 1 — Software Platform (0–6 мес) **← Приоритет**

**Фокус Ring 1:** `Auto Presence`

Это минимальный lovable product. Пользователь настраивает систему один раз, после чего BUSY сам понимает, когда человек занят, и сообщает это в рабочую и домашнюю среду.

**Платформа:** macOS-only. Windows — Ring 2.

**Бизнес-модель:** Free tier (auto-presence базовый) + **BUSY Pro $4.99/мес** (аналитика, Focus Memory, история, AI). Целевая конверсия: 5–10%.

**Что строим в Ring 1:**

**1. Auto-Status Engine**
- Google Calendar → за 2 мин до встречи BUSY Bar автоматически меняется
- Zoom / Google Meet запущен → переключается в DND
- Slack bidirectional sync: BUSY Bar ↔ Slack status

**2. Smart Focus Intent (AI)**
- On-device: AI детектирует рабочий контекст из запущенных приложений (редактор / IDE открыт, нет активных звонков ≥ 90 мин)
- Автоматически предлагает или включает фокус-режим — без встречи в календаре
- Работает с первого дня, без накопленной истории. Расширяет auto-presence на сценарий deep work без calendario-события
- Privacy-first: всё локально, ничего не отправляется

**3. Shared Presence**
- Family URL: `busy.app/status/pavel` — семья видит статус без приложения
- Кнопка "Нужно поговорить" → тихое уведомление на телефон

**4. macOS Desktop App**
- Menubar indicator, автозапуск, горячие клавиши
- Работает в фоне — не нужно держать браузер

**Ключевые интеграции Ring 1:**
Google Calendar · Zoom · Google Meet · Slack

**Принцип onboarding:** каждый touchpoint Ring 1 должен доставлять видимую ценность в первые 72 часа. Anxiety ("гаджет будет пылиться") — главный блокер adoption у всех сегментов. Первый auto-trigger должен случиться до конца первого рабочего дня.

**Вирусный механизм:** каждый покупатель создаёт 3–5 пассивных пользователей бесплатно — семья через Family URL, коллеги через Slack auto-sync. Это growth engine, не побочная фича. Messaging: "твоя семья наконец знает когда ты свободен".

**Gate метрика:** 30-day retention ≥ 30%. Retention = устройство подключено к WiFi + минимум 1 auto-status trigger за 30 дней. Если < 15% — стоп.

→ Подробно: [`04_step1_software_platform.md`](04_step1_software_platform.md)

---

### 🔴 Ring 1.5 — Focus Memory (6–9 мес)

*Запускается только если Auto Presence надёжен и используется регулярно*

**Фокус Ring 1.5:** превратить статусы и сессии в понятную память рабочего дня. Это ядро **BUSY Pro** подписки.

**Что строим:**
- Focus Analytics: тепловая карта дня, Focus Score, Best Hours, Weekly Streak
- App tracking во время BUSY-сессий
- Auto-timesheet с разбивкой по приложениям
- Project tags / project context
- Стоимость прерываний (Stanford: 1 context switch = 23 мин)
- App blocking на macOS как защиту от внешних прерываний
- **AI Agent Monitor**: Claude Code / Copilot / Cursor активен → BUSY Bar меняет цвет. Джоб "AI работает — не прерывай" появился сейчас, окно для захвата нарратива — 2026

**Почему это отдельная подфаза:**
- Другой слой ценности: не "система работает сама", а "система помогает понять мой день"
- Analytics + AI Agent Monitor усиливают BUSY Pro — платные фичи, видные каждый день
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

**Вирусный рычаг Ring 2:** Slack Bot (/busy-status, /busy-when) — бесплатный, без BUSY Bar работает. Каждый пользователь BUSY подтягивает коллег в экосистему пассивно. Это ускоряет B2B adoption без enterprise sales.

**Surveillance принцип:** Team Dashboard требует зрелого privacy design. Риск: если воспринимается как слежка — разрушает доверие у Focus Worker И Team Lead одновременно. Полный Dashboard откладывается в Ring 3 до проработки privacy-first UX.

**Gate метрика:** 200+ интеграций в App Library, 30% пользователей используют 1+ third-party.

→ Подробно: [`05_step2_open_platform.md`](05_step2_open_platform.md)

---

### ⚪ Ring 3 — Ecosystem (18–36 мес)

*Только после Ring 2 gate*

- BUSY Bar Mini ($99–129) — расширение TAM
- AI Focus Coach — персональные рекомендации на основе накопленных данных
- Team Dashboard + Slack Bot (Trojan horse в B2B)
- AI Agent Monitor (Claude Code / Codex hooks → физический статус)
- Marketplace с revenue sharing для разработчиков
- Enterprise tier (если Team Mesh органически растёт)
- HSA/FSA eligibility исследование (ADHD сегмент)

→ Подробно: [`03_ecosystem_rings.md`](03_ecosystem_rings.md)

---

## Шаг 5. Ключевые риски и circuit breakers

**Enforcement:** circuit breakers публикуются в открытом investor update или блоге. Без внешнего accountability они декоративны.

| Риск | Вероятность | Действие |
|------|------------|---------|
| 30-day retention < 15% при 6 мес | Реальная | STOP Ring 1. Переработать app strategy до любых следующих шагов |
| Нет подписочной конверсии (< 2%) к Ring 1.5 | Средняя | Пересмотреть free/pro split до запуска аналитики |
| Microsoft выпускает Teams device < $79 | 25% | Pivot to prosumer/ADHD, drop enterprise roadmap |
| Bricking OTA update | Низкая, но катастрофичная | Rollback capability обязательна до launch |
| Community поворачивается враждебно | Средняя | Open-source больше firmware, price cut до $179 |
| Hardware expansion до валидации | Управляемый | Правило: no new hardware до 50K units + 30% retention |

---

## Главные неизвестные

| Вопрос | Когда проверить |
|--------|----------------|
| **Качество BUSY App** — retention > 30%? | Closed beta, 90 дней после отгрузки |
| **BUSY Pro конверсия** — 5-10% от активных? | 3 мес после Ring 1.5 launch |
| **ADHD сегмент** — конвертируется в $249 + Pro? | A/B тест messaging, 4 недели |
| **Developer community** — 50+ интеграций за 6 мес? | Developer Preview API за 3 мес до launch |
| **Smart Focus Intent** — снижает ли он manual friction? | Activation metric: сколько сессий запускается через AI vs. вручную |

---

## Одностраничная версия

```
СЕЙЧАС  →  R1              →  R1.5          →  R2                →  R3
Core       Auto Presence      Focus Memory    Open Platform         Intelligence

LED+таймер macOS App          App tracking    Developer Portal      AI Focus Coach
ручной     Google Cal/Zoom    Timesheet       App Library           Focus Profile
статус     Slack Sync         Interruption $  Home Assistant        Marketplace
           Family URL         Heatmap/Score   Windows App           Team Dashboard
           AI Focus Intent    [BUSY Pro]      Matter Full           BUSY Mini
           [Free + Pro]                       Recipes               AI Agent Monitor
```

**Позиционирование:**
- **Основной сегмент:** ADHD и нейроотличия — $20B рынок, идеально совпадает с продуктом
- **Второй сегмент:** Focus workers (разработчики, дизайнеры, менеджеры) в гибридном офисе
- **ADHD не fallback** — это основное messaging с первого дня
