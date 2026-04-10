# BUSY Bar — Ring Strategy Context for Analysis

## Product
BUSY Bar — физический LED-индикатор занятости с WiFi, Matter-ready, HTTP API, $249.
Стратегия: software-first расширение через кольца. Каждое кольцо добавляет программную ценность к существующему железу.

## Кольца (phases)

### Ring 0 — Core (сейчас)
LED + таймер + ручное управление. Устройство работает, но всё вручную.
Слабое место: пользователь должен помнить включить статус.
Метрика: 8–15K units отгружено.

### Ring 1 — Auto Presence (0–6 мес)
Минимально lovable product. Система сама понимает контекст и управляет статусом.
- Calendar auto-status (Google/Outlook → 2 мин до встречи → BUSY меняется)
- Video call detection (Zoom/Teams/Meet → автоматически DND)
- Slack bidirectional sync
- Family URL: busy.app/status/pavel — семья видит статус без приложения
- Desktop app macOS + Windows

GATE: 30-day retention ≥ 40%. Если < 20% — STOP.

### Ring 1.5 — Focus Memory (6–9 мес)
Запускается только если Auto Presence надёжен и используется регулярно.
- App tracking во время BUSY-сессий
- Auto-timesheet с разбивкой по приложениям
- Interruption cost visualization
- Focus Score, Best Hours, Weekly Streak
- App blocking на macOS

GATE: ≥ 30% активных пользователей возвращаются к аналитике каждую неделю.

### Ring 2 — Open Platform (9–18 мес)
Превращение BUSY в расширяемую систему. Запускается только если Ring 1 gate пройден.
- TypeScript SDK + Python SDK + Developer Portal
- App Library: 200+ community интеграций (GitHub CI, Toggl, Notion, Home Assistant)
- Matter full support (HomeKit, Google Home, HA)
- Automation Recipes ("встреча → приглуши свет + DND")
- Team Mesh: workspace dashboard для руководителя

GATE: 200+ apps в App Library, 30% пользователей используют 1+ third-party интеграцию.

### Ring 2.5 — Team + AI-Adjacent (12–24 мес)
Командная координация и AI-driven workflows без персонального AI Coach.
- BUSY for Teams Slack Bot (бесплатный, trojan horse для B2B)
- Team Dashboard в privacy-first форме
- Focus Windows / quiet hours
- AI Agent Monitor (BUSY Bar меняется когда AI агент работает)
- Cross-device tracking, Toggl/Clockify exports

GATE: Team Mesh organic adoption ≥ 100 команд

### Ring 3 — Intelligence + Expansion (18–36 мес)
Только после Ring 2 + 2.5 gates.
- AI Focus Coach (персональные рекомендации на основе 90+ дней данных)
- BUSY Bar Mini ($99–129) — расширение TAM
- Marketplace с revenue sharing для разработчиков
- Enterprise tier (если Team Mesh органически растёт)

GATE: Ring 2 metrics + 50K units

## Стратегический контекст

**Почему software-first:** BUSY Bar — платформа управления вниманием с физическим якорем, не устройство с приложением. Каждое кольцо увеличивает ценность существующего железа.

**Конкуренты:**
- Ring 0: Luxafor Flag, Kuando Busylight (USB-only, frozen, нет API)
- Ring 1+: прямых конкурентов нет
- Ring 3: категория "Focus OS" ещё не существует

**Circuit breakers:**
- Retention < 20% в Ring 1 → STOP
- Microsoft выпускает Teams device < $79 → pivot to ADHD/prosumer
- No new hardware до 50K units + 40% retention

## Задача для аналитиков

Цель: проверить и усилить логику перехода между кольцами. Для каждого кольца ответить:
1. Зачем это кольцо — какую проблему оно решает принципиально
2. Чтобы что — какой конкретный результат оно создаёт для пользователя и бизнеса
3. Что за ценность — почему пользователь останется/заплатит больше/расскажет другу
4. Почему именно в этот момент — почему раньше было нельзя, позже было бы поздно

Конечный артефакт: короткое (3–5 предложений) введение для каждого кольца/фазы, которое войдёт в продуктовый роадмап.
