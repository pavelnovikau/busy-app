# BusyBar — Feature Map
**Дата:** 2026-04-08 | Все фичи по уровням и проблемам

Легенда приоритета: `●` must have · `◐` should have · `○` nice to have · `—` на усмотрение

---

## Ring 0 — Core (уже есть / в железе)

| Фича | Проблема | Приоритет | Примечание |
|------|---------|-----------|-----------|
| LED матрица, RGB, 72×16px | A: Невидимость | ● | Уже в железе |
| Pomodoro / кастомный таймер | B: Ручное управление | ● | Уже в железе |
| Кнопка ручной смены статуса | A: Невидимость | ● | Уже в железе |
| OLED дисплей на обратной стороне | A: Невидимость | ● | Уже в железе |
| WiFi 6 + Matter (сертифицировано) | D: Закрытость | ● | Certified Feb 2026 |
| HTTP API + MQTT | D: Закрытость | ● | Уже анонсировано |
| SDK: Python / TypeScript / Go | D: Закрытость | ● | Уже анонсировано |
| OBS / mic auto-detection "ON CALL" | A: Невидимость | ● | Уже в железе |
| Офлайн-режим (8GB eMMC) | — | ◐ | Хранение анимаций, логов |

---

## Ring 1 — Auto Presence (0–6 мес)

### Проблема A: Невидимая занятость

| Фича | Приоритет | Примечание |
|------|-----------|-----------|
| Family Shared URL (`busy.app/status/name`) | ● | Без установки приложения |
| Кнопка "Нужно поговорить" → тихий ping | ◐ | Уведомление на телефон |
| Team Presence View (opt-in, privacy-first) | ○ | Коллеги видят статус друг друга |

### Проблема B: Ручное управление статусами

| Фича | Приоритет | Примечание |
|------|-----------|-----------|
| Google Calendar → автостатус | ● | За 2 мин до встречи → красный |
| Outlook Calendar → автостатус | ● | |
| Zoom / Meet / Teams → автодетект активного звонка | ● | |
| Slack bidirectional sync | ● | BUSY Bar ↔ Slack DND |
| Microsoft Teams presence sync | ◐ | |
| Smart transitions (cooling period после встречи) | ◐ | 15 мин "остывания" → зелёный |
| Override: "я работаю" без встречи в календаре | ● | Ручное включение фокуса |
| Hotkey быстрого переключения статуса | ◐ | `⌥⌘B` и аналог Windows |

### Desktop App

| Фича | Приоритет | Примечание |
|------|-----------|-----------|
| macOS app (menubar) | ● | Основа для всех Ring 1 фич |
| Windows app (system tray) | ● | |
| Автозапуск при старте ОС | ● | |
| Background sync без открытого браузера | ● | |
| Hotkeys | ◐ | |
| Linux (snap / flatpak) | ○ | После macOS/Win |

---

## Ring 1.5 — Focus Memory (6–9 мес)

### Проблема C: Слепые пятна продуктивности

| Фича | Приоритет | Примечание |
|------|-----------|-----------|
| **App tracking во время BUSY-сессий** | ● | Трекинг активных приложений только когда девайс "занят" |
| **Auto-timesheet с разбивкой по приложениям** | ● | Productive / Neutral / Distracting |
| **Тэг проекта перед сессией** | ● | "Клиент X / свой проект / admin" → основа для биллинга |
| **Стоимость прерываний — сделать видимой** | ● | Stanford: 1 context switch = 23 мин. BUSY Bar знает каждый прерванный таймер |
| **App blocking (macOS Focus Modes API)** | ● | Стабильнее iOS/Android. Защита от внешних прерываний, не самоконтроль |
| Daily Focus Heatmap | ● | Тепловая карта дня: deep work / meetings / available |
| Focus Score (0–100) | ◐ | Агрегированная метрика дня |
| Best Hours паттерн | ◐ | Лучшее время для фокуса за 30 дней |
| Weekly Streak | ○ | Gamification: серии продуктивных дней |
| Session breakdown: deep work / meetings / distracted | ● | |

---

## Ring 2 — Open Platform (9–18 мес)

### Time Tracking — вход в B2B / Medium Business

Эти фичи можно трактовать как поздний Ring 2 или как отдельный Ring 2.5, если нужно не перегрузить Open Platform.

| Фича | Приоритет | Примечание |
|------|-----------|-----------|
| Экспорт таймшита: CSV / JSON | ● | Фрилансеры, консультанты |
| Интеграция с Toggl | ● | Автозаполнение записей из BUSY-сессий |
| Интеграция с Clockify | ◐ | |
| Интеграция с Harvest | ◐ | |
| Клиентские проекты и отчёты | ◐ | "Сколько времени я потратил на клиента X за месяц" |
| Категоризация приложений (настраиваемая) | ● | Как в Qbserve — Productive / Neutral / Distracting |
| Заметки к сессии (notes field) | ◐ | "Что делал" в 1–2 строки |
| Недельный/месячный отчёт → PDF | ○ | Для выставления счётов клиентам |

### Проблема D: Закрытая экосистема

| Фича | Приоритет | Примечание |
|------|-----------|-----------|
| Developer Portal (docs.busy.app) | ● | Документация, playground, showcase |
| App Library — галерея community-интеграций | ● | Install в 1 клик |
| Webhook система | ◐ | BUSY Bar реагирует на внешние события |
| GitHub CI/CD интеграция | ◐ | Цвет по статусу сборки |
| Home Assistant нативная интеграция | ● | 500K+ пользователей, готовая аудитория |
| Apple HomeKit (через Matter) | ● | Уже сертифицировано |
| Google Home (через Matter) | ● | |
| Smart Home Recipe Builder | ◐ | Шаблоны автоматизаций |
| OBS native plugin (сцена → цвет) | ● | Сейчас только процесс, нужна сцена |
| Streamlabs Support | ○ | |
| Linear / Jira integration | ◐ | Цвет по статусу тикета |
| Notion / Obsidian focus mode | ○ | |
| Spotify / музыкальный статус | ○ | |

---

## Ring 2.5 — Team + AI-Adjacent (12–24 мес)

### Проблема E: Культура постоянной доступности

| Фича | Приоритет | Примечание |
|------|-----------|-----------|
| "BUSY for Teams" Slack Bot (бесплатный) | ● | Trojan horse: `/busy-status`, `/busy-when @user` |
| Team Dashboard для менеджера | ◐ | Aggregate focus view, privacy-first |
| Focus Windows — тихие часы для команды | ◐ | Calendar блоки для всей команды |
| Team aggregate analytics | ○ | Паттерны команды: где теряем фокус |
| Workspace license (5–25 устройств) | ○ | После органического роста Team Mesh |

### AI-adjacent workflows

| Фича | Приоритет | Примечание |
|------|-----------|-----------|
| AI Agent Monitor | ● | Claude Code / Codex / CLI hooks → физический статус |
| Cross-device tracking | ● | Mac + iPhone + iPad → единый BUSY-контекст |
| Экспорт таймшита: CSV / JSON | ● | Для консультантов, фрилансеров, команд |
| Интеграция с Toggl | ● | Может жить здесь, если Time Tracking выделяем отдельно |
| Интеграция с Clockify / Harvest | ◐ | |

---

## Ring 3 — Intelligence + Expansion (18–36 мес, только при прохождении gate)

| Фича | Проблема | Примечание |
|------|---------|-----------|
| AI Focus Coach | C: Аналитика | Персональные рекомендации на основе данных |
| AI: предсказание лучших часов | C: Аналитика | "Сейчас твоё продуктивное окно, 90 мин свободно" |
| AI: инсайты по типу работы | Timesheet | "60% фокуса в Figma — ты дизайнер, не менеджер" |
| BUSY Bar Mini ($99–129) | A: Доступность | Только после 50K units + 40% retention |
| BUSY Bar Pro (office, larger display) | Enterprise | |
| Marketplace: платные анимации | D: Экосистема | Revenue sharing с авторами |
| Marketplace: premium интеграции | D: Экосистема | |
| Enterprise tier + fleet management | B2B | Только если Team Mesh органически вырос |
| HSA/FSA eligibility (ADHD) | ADHD | Консультация с healthcare юристом |
| Focusmate / body-doubling интеграция | ADHD | Social accountability через физический девайс |
| Focus Score как публичный профиль | Viral | Шаринг в LinkedIn/Twitter |
| Корпоративный ROI calculator | Enterprise | "Сколько теряете на прерываниях" |

---

## Critical Path — Auto Presence

Минимальная цепочка фич Ring 1, которая сама по себе создаёт core value proposition. Всё остальное — расширение вокруг неё.

```
                    ┌─────────────────────────┐
                    │   1.9  macOS App         │  ← центральный hub
                    │   Status Engine          │
                    └────────────┬────────────┘
           ┌────────────────────┼────────────────────┐
           ▼                    ▼                    ▼              ▼
   1.1 Google Calendar   1.2 Zoom/Meet       1.12 Slack Sync   1.11 Family URL
   "reads schedule"      "detects live       "updates work     "updates home
                          calls"              status"           status"
```

**Логика цепочки:**
1. **macOS App** запущен в фоне — это мозг системы (Status Engine)
2. **Google Calendar** → читает расписание, знает когда встречи
3. **Zoom / Meet** → детектирует активный звонок в реальном времени
4. **Slack Sync** → обновляет рабочий статус автоматически
5. **Family URL** → обновляет домашний статус без установки приложения

**Почему это critical path:**
Если пользователь настроил только эти 5 фич — BUSY Bar уже работает автономно весь день. Не нужно ни о чём думать. Это и есть core value: "включил и забыл".

**UX идеи из визуализации (зафиксировать):**
- Режим `FOCUS` на карте — приглушает всё лишнее, подсвечивает только этот путь
- Анимация пульса у центрального узла (Status Engine) — показывает что система "живая"
- `Status Engine` как отдельный центральный узел на диаграмме — чтобы путь был ещё яснее
- Subtitle в timeline: "Critical Path assembled" когда все 5 фич настроены

---

## Subphase Logic

| Фаза | Главный вопрос | Что должно стать правдой |
|------|----------------|--------------------------|
| Ring 1 | "BUSY сам понимает когда я занят?" | Presence работает без ручного участия |
| Ring 1.5 | "BUSY помогает понять как прошёл день?" | Появляется память и аналитика |
| Ring 2 | "BUSY можно расширять?" | Появляется ecosystem surface |
| Ring 2.5 | "BUSY полезен команде и новым workflows?" | Появляется team / AI-adjacent gravity |
| Ring 3 | "BUSY понимает меня и расширяет категорию?" | Появляется intelligence + identity + expansion |

---

## Focus Constellation — семантический позвоночник продукта

Если Critical Path / Auto Presence — это минимальная цепочка Ring 1 для автономной работы,  
то **Focus Constellation** — это нарратив через все четыре кольца: как ценность нарастает от физического ритуала до AI-интеллекта.

**Subtitle:** `Ritual → Presence → Platform → Intelligence`

---

### Уровень 1 — Anchors (позвоночник)

Шесть узлов, которые образуют главную линию. Каждый — смысловой переход между кольцами.

| ID | Фича | Метка | Кольцо | Роль в нарративе |
|----|------|-------|--------|-----------------|
| 0.13 | LED Matrix | **Ritual** | Ring 0 | Физический акт включения — начало рабочей сессии |
| 1.9  | macOS App | **Hub** | Ring 1 | Мозг системы, Status Engine — всё сходится сюда |
| 1.12 | Slack Sync | **Presence** | Ring 1 | Первое вещание статуса во внешний мир |
| 2.4  | App Library | **Platform** | Ring 2 | Открытая экосистема — статус становится протоколом |
| 3.1  | AI Focus Coach | **Intelligence** | Ring 3 | Система понимает паттерны и даёт рекомендации |
| 3.5  | Focus Profile | **Identity** | Ring 3 | Продуктивность становится частью публичной идентичности |

---

### Уровень 2 — Context Nodes (поддерживающие узлы)

Вокруг каждого anchor — несколько поддерживающих фич, которые делают его ценность полной. Отображаются в режиме FOCUS как второй слой (меньший, приглушённый).

**Ring 0 / Ritual:**
- 0.1 Pomodoro Timer — намерение начать сессию
- 0.2 Status Button — ручное подтверждение намерения
- 0.12 WiFi 6 + Matter — физическое распространение сигнала

**Ring 1 / Hub + Presence:**
- 1.1 Google Calendar — читает контекст (что запланировано)
- 1.2 Zoom / Meet — детектирует живой звонок
- 1.11 Family URL — вещание домашнему окружению

**Ring 2 / Platform:**
- 2.3 Developer Portal — вход для builders
- 2.5 AI Agent Monitor — новый тип статуса ("агент работает")
- 2.6 Home Assistant — физическая среда реагирует на статус
- 2.10 Team Dashboard — Presence виден на уровне команды

**Ring 3 / Intelligence + Identity:**
- 3.2 Energy Prediction — AI предсказывает лучшие часы
- 3.3 BUSY Bar Mini — распространение в новые форматы
- 3.4 Marketplace — экосистема монетизируется

---

### Edges: типы связей

| Тип | Значение | Пример |
|-----|----------|--------|
| `local` | Связь внутри одного кольца — поддержка anchor | 0.1 Pomodoro → 0.13 LED Matrix |
| `bridge` | Переход между кольцами — шаг нарратива вперёд | 0.13 LED → 1.9 macOS App |

---

### Стейкхолдеры в Focus Mode

Все шесть задействованных стейкхолдеров подсвечиваются в режиме FOCUS:

| Стейкхолдер | Почему в Constellation |
|-------------|----------------------|
| 🧑‍💻 Focus Worker | Главный актор всей цепочки |
| ⚙️ Developer | Строит платформу (Ring 2) |
| 👨‍👩‍👧 Семья | Получает Presence (1.11 Family URL) |
| 👥 Коллеги | Видят статус через Slack / Team Dashboard |
| 📊 Руководитель | Aggregate view через Team Dashboard (2.10) |
| 🏠 Smart Home | Физическая среда реагирует через Home Assistant (2.6) |

---

## Фичи под вопросом

| Фича | Почему под вопросом |
|------|-------------------|
| App blocking "Hardcore mode" (iOS/Android) | Хрупкий: iOS Screen Time API нестабилен, Android требует VPN/Accessibility против Google Play политики. **macOS версия через Focus Modes API — в Ring 1 с приоритетом ●.** |
| BUSY Bar как DNS/router hub | Технически сложно, но убирает зависимость от платформ — исследовать в Ring 3 |
| Звуковой сигнал при входящем звонке | Есть у Kuando (конкурент). Нет динамика в железе BUSY Bar — только через интеграцию со смартфоном по BLE |
| Родительский контроль / kids режим | Нишевый, но виральный. Отложить в Ring 3 |
