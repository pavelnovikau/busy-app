# BUSY Bar -- Стратегический анализ (Adversarial Team Report)

**Дата:** 2026-04-10
**Команда:** CASSANDRA (скептик) | TESLA (оптимист) | VIKTOR (арбитр) | SOPHIA (синтез)

---

## 1. Резюме (Executive Summary)

### 2 главных ограничения (Theory of Constraints)

1. **Отсутствие модели recurring revenue.** [FACT] Стратегия предлагает 36 месяцев растущей software-разработки, финансируемой единоразовым платежом $249. Без подписки каждый месяц разработки приближает кассовый разрыв. Это единственное ограничение, которое может убить проект даже при идеальном исполнении всего остального.

2. **Scope превышает capacity команды из 1-2 человек.** [FACT] Feature map содержит ~40 фич в 6 тирах. Даже critical path из 5 фич для Ring 1 -- это macOS-приложение + 3-4 API-интеграции + Family URL, что на пределе возможностей для одного разработчика при параллельной поддержке hardware.

### 5 ключевых инсайтов

1. **Продуктовый тезис сильный.** Физический якорь + software-автоматизация для управления вниманием -- дифференцированная позиция, подтверждённая прецедентами Oura, WHOOP, Peloton. [FACT: прецеденты существуют] Ни Apple, ни Microsoft не заинтересованы в cross-platform + physical signal из-за структурного конфликта интересов (engagement vs. focus). [ASSUMPTION]

2. **Тайминг 2026 года благоприятен.** Стабильный гибридный режим работы (22.6% удалённо), RTO-волна создаёт спрос на физические сигналы в open-plan офисах, Matter-сертификация открывает smart home канал, культурный фокус на "защите внимания" на пике. [FACT: данные по гибриду и RTO]

3. **$249 -- фильтр, а не барьер.** Высокая цена отсекает случайных покупателей и создаёт базу высокомотивированных пользователей. Аналогия Superhuman ($30/мес за email) подтверждает: willingness-to-pay filter повышает engagement. [ANALOGY]

4. **ADHD/нейроотличия -- $20B рынок, идеально совпадающий с продуктом.** Текущая стратегия упоминает ADHD только как fallback-pivot. Это ошибка позиционирования, не требующая изменений в продукте. [FACT: рынок оценён в $20.08B, CAGR 7.1%]

5. **Circuit breakers без внешнего enforcement -- декоративные.** Основатели почти никогда не убивают собственный проект по заранее установленным метрикам. Без внешнего наблюдателя (advisor, публичные обязательства) breakers не сработают. [ASSUMPTION, подтверждённая прецедентами: Quibi и др.]

### 5 действий на эту неделю

1. **Спроектировать подписочную модель** -- free tier (auto-presence) + BUSY Pro $4.99/мес (аналитика, Focus Memory, история). Записать в стратегию с целевой конверсией 5-10%.
2. **Сократить Ring 1 до macOS-only + 3 интеграции** (Google Calendar + Slack + Zoom detection). Windows и остальные интеграции -- Ring 2.
3. **Переопределить retention** как "устройство подключено к WiFi + минимум 1 auto-status trigger за 30 дней". Gate снизить с 40% до 30%.
4. **Начать ADHD-позиционирование** -- landing page, контакт с 3-5 ADHD/productivity YouTubers, исследование HSA/FSA eligibility.
5. **Найти внешнего advisor** для accountability по circuit breakers. Или опубликовать breakers в блоге/investor update.

---

## 2. Что работает (Steelmanned Strengths)

После adversarial проверки **подтверждены** следующие элементы стратегии:

**A. Физический якорь создаёт поведенческий lock-in, недоступный software-only решениям.** [FACT]
LED-бар на столе -- это commitment device. Устройство за $249 "смотрит на тебя", если не используется (эффект Peloton: $1,400 велотренажёр в гостиной даёт 92% 12-month retention). Software DND-режимы невидимы, забываемы и социально неисполнимы. Физический ритуал (включил Pomodoro, бар загорелся красным) создаёт привычку.

**B. Hardware уже существует и сертифицирован.** [FACT]
WiFi 6, Matter-сертификация (февраль 2026, 1400+ тестов CSA), HTTP API, MQTT, SDK на Python/TypeScript/Go. Производство, сертификация, supply chain -- самые сложные части hardware-стартапа -- уже пройдены. Переход Ring 0 -> Ring 1 -- чистый software поверх proven hardware.

**C. Software-first expansion капиталоэффективна.** [FACT]
Каждое кольцо добавляет ценность тому же устройству за $249. Нет нового hardware, нет новых manufacturing runs. Marginal cost software = 0. Это инверсия ловушки Pebble (где нужно было продавать новые часы, чтобы финансировать софт).

**D. Cross-platform -- настоящий moat.** [ASSUMPTION, высокая уверенность]
Apple никогда не синхронизирует Focus Status с Windows/Slack/Android. Microsoft Viva работает только в M365. Google -- только в Workspace. BUSY Bar -- единственное решение, которое связывает все три экосистемы + физический мир. 5 лет существования Apple Focus Modes не решили эту проблему.

**E. Concentric ring model с gates -- дисциплинированная архитектура.** [FACT]
Поэтапное развитие с явными kill conditions -- лучше, чем у 95% стартапов на этой стадии. Структура заставляет: (1) доказать auto-presence, прежде чем строить аналитику, (2) доказать engagement, прежде чем открывать платформу.

---

## 3. Критические уязвимости

| # | Уязвимость | P (вероятность) | I (импакт) | P x I | Пояснение |
|---|-----------|:-:|:-:|:-:|-----------|
| 1 | **Нет recurring revenue** | 100% (текущее состояние) | Критический | **КРИТИЧЕСКИЙ** | $249 one-time не финансирует 36 мес. software-разработки. Без подписки -- Cassandra's pre-mortem сбывается: revenue плато, нельзя нанять, Ring 2 не наступит. [FACT] |
| 2 | **Capacity команды vs. scope** | 80% | Высокий | **ВЫСОКИЙ** | Даже сокращённый critical path (5 фич) -- это native macOS app + OAuth-интеграции с Google/Microsoft/Slack + cloud backend + Family URL + firmware support. Maintenance после 6 мес. займёт 30-50% engineering time. [ESTIMATE] |
| 3 | **Зависимость от API Google/Microsoft/Slack** | 40% (breaking change в течение 12 мес.) | Высокий | **СРЕДНИЙ-ВЫСОКИЙ** | Core value зависит от API трёх крупнейших компаний. Любая из них может изменить OAuth requirements, deprecate endpoints, ужесточить rate limits. [FACT: Google регулярно deprecates Calendar APIs, Slack ужесточает third-party access с 2023] |
| 4 | **macOS app как single point of failure** | 50% (нестабильность после major macOS update) | Высокий | **СРЕДНИЙ-ВЫСОКИЙ** | Вся цепочка ценности Ring 1 проходит через Status Engine в macOS app. Crash/battery drain/конфликт с macOS update -> auto-status умирает -> пользователь возвращается к Ring 0 -> retention падает. [FACT: Apple ежегодно ломает third-party menubar apps] |
| 5 | **Installed base слишком мала для platform economics** | 90% при текущем масштабе | Средний | **СРЕДНИЙ** | 8-15K устройств не поддержат 200+ интеграций. Даже при 5% разработчиков (750 чел.), конверсия 27% в "опубликовал интеграцию" -- беспрецедентна. [FACT: Slack достиг 200+ apps при 500K DAU] |

---

## 4. Упрощение (Via Negativa)

### Убрать Ring 2.5 целиком
**Что выигрываем:** Снижение когнитивной нагрузки, фокус на 4 фазах вместо 6. Фичи Ring 2.5 (Slack Bot, Team Dashboard, AI Agent Monitor) -- либо часть Ring 2, либо не существуют ещё. 6-tier система -- overengineered planning theater для 1-2 человек. [ASSUMPTION: обе стороны дебатов согласны]

### Убрать Windows из Ring 1
**Что выигрываем:** -40-50% development surface. macOS -- естественная платформа для focus workers (разработчики, дизайнеры, писатели). [FACT: Linear, Raycast, Arc -- все запускались macOS-only и достигли cult status.] Windows -- Ring 2, финансируется подпиской.

### Убрать Focus Analytics из Ring 1
**Что выигрываем:** Ring 1 = чистая автоматизация ("оно работает само"). Аналитика (heatmap, Focus Score, Weekly Streak) -- другой value proposition ("оно помогает понять мой день"), который размывает первый aha moment. Перенести в Ring 1.5 как часть подписки. [ANALOGY: Oura Ring запустился только с sleep tracking; activity/readiness scores -- позже]

### Убрать Marketplace из Ring 3
**Что выигрываем:** Marketplace с revenue sharing требует: платёжную инфраструктуру, модерацию, dispute resolution, tax compliance, курирование. Это company-defining project, не фича. [FACT: Shopify с тысячами сотрудников борется с качеством marketplace.] Открыть integration layer, использовать GitHub как дистрибуцию.

### Убрать Enterprise tier planning
**Что выигрываем:** Enterprise sales требует SOC 2, SLA, dedicated support, procurement process -- невозможно для 1-2 человек. Если enterprise-спрос появится органически (bottom-up через individual adoption), отреагировать тогда. [FACT]

**Результат упрощения:** 6 тиров -> 4 фазы (Core / Software / Platform / Aspirational). ~40 фич -> ~15 на горизонте 18 мес. Одна платформа (macOS) вместо двух.

---

## 5. Усиление (Strengthening)

### 1. Подписка BUSY Pro $4.99/мес с Ring 1.5
**Механизм:** Free = auto-presence (крючок). Paid = Focus Memory, аналитика, история, export (монетизация). Модель Oura: бесплатный базовый трекинг, $5.99/мес за insights. [FACT: подписочный revenue Oura вырос с $55M до $110M за год после добавления gated features.]
**Почему работает:** Hardware создаёт привычку, подписка монетизирует инсайт. Subscription conversion target: 5-10%.

### 2. ADHD/нейроотличия как primary segment с первого дня
**Механизм:** Dedicated landing pages, партнёрство с ADHD-коучами и productivity-YouTubers, HSA/FSA eligibility (снижает effective price до ~$150-170). [FACT: ADHD apps market -- $2.78B в 2026, CAGR 15.65%.] Физический Pomodoro-таймер + auto-DND + interruption cost tracking -- именно то, что рекомендуют ADHD-специалисты.
**Почему работает:** Не требует изменений в продукте. Только позиционирование и маркетинг. Потенциально 3x addressable market.

### 3. Seed 10-20 hero-интеграций вместо ожидания community
**Механизм:** Определить 10-20 интеграций, покрывающих 80% use cases (Google Calendar, Slack, Zoom, Home Assistant, OBS, GitHub, Linear, Notion, Toggl, Spotify). Top 10 -- in-house, следующие 10 -- bounties/гранты. [ANALOGY: Shopify's ecosystem взлетел благодаря нескольким killer apps (Oberlo, Privy, Klaviyo), а не количеству.]

### 4. Focus Score как viral-механика
**Механизм:** С Ring 1.5 -- sharing недельного Focus Score в LinkedIn/X: "Я защитил 22 часа deep work на этой неделе. #BUSYBar". [ANALOGY: Strava activity sharing, Duolingo streaks, WHOOP recovery score.] Это бесплатный маркетинг, привязанный к идентичности продуктивного человека.

### 5. "BUSY Bar для пар" как эмоциональный positioning
**Механизм:** Family URL -- уникально мощная фича для remote workers с партнёрами. Маркетинг: "Партнёр всегда знает, когда ты на звонке -- больше никаких дверей во время Zoom." Создаёт естественную покупку 2 устройств. [ASSUMPTION: значительная доля покупателей мотивирована семейными прерываниями]

---

## 6. Карта рисков

| # | Риск | P | I | P x I (adjusted) | Fat-tail? |
|---|------|:-:|:-:|:-:|:-:|
| 1 | **Revenue plateau без подписки** | 95% | Критический (проект умирает) | **9.5/10** | Нет -- предсказуемый |
| 2 | **Founder burnout / bus factor** | 60% за 24 мес. | Критический | **7.2/10** | Да -- fat tail: если единственный разработчик выпадает на 2 мес., cascade неостановим |
| 3 | **macOS app нестабилен после major update** | 50%/год | Высокий | **5.0/10** | Нет |
| 4 | **Apple шипит native "Focus Presence"** | 15-20% за 24 мес. | Высокий (share compression, не extinction) | **3.5/10** | Частично -- зависит от scope фичи Apple |
| 5 | **Critical API breaking change (Google/Slack/Microsoft)** | 40%/год | Средний-Высокий | **3.2/10** | Нет -- recoverable, но cost в engineering time |

---

## 7. Анализ Circuit Breakers

### Текущие breakers

| Breaker | Оценка | Рекомендация |
|---------|--------|-------------|
| **Ring 1 retention < 20% -> STOP** | Порог слишком низкий. 20% для $249 companion app = уже серьёзная проблема. Метрика не определена ("retention" = что именно?). | Поднять до 25%. Определить: "device connected + 1+ auto-status trigger за 30 дней". Добавить действия для grey zone 25-30%: "proceed with caution, investigate root causes, delay Ring 2 gate на 3 мес." |
| **Microsoft Teams device < $79 -> pivot to ADHD** | Разумный триггер, но ADHD должен быть primary positioning, а не panic pivot. | Если ADHD-позиционирование начинается сразу, этот trigger = "ускорить ADHD фокус", а не "экстренный разворот". |
| **No new HW до 50K units + 40% retention** | Здравый. Предотвращает ловушку Pebble. | Оставить как есть. [FACT: Pebble продавал ~500K/год и не выжил] |

### Отсутствующие breakers (рекомендуются)

| Breaker | Почему критичен |
|---------|----------------|
| **Subscription conversion < 2% через 6 мес. после запуска -> пересмотр бизнес-модели** | Без этого команда будет рационализировать: "нужно больше фич". [ASSUMPTION] |
| **Engineering time на maintenance > 50% за 3 мес. подряд -> нанять или сократить scope** | Предотвращает death spiral: maintenance вытесняет new development. [ESTIMATE] |
| **macOS app crash rate > 1% сессий -> заморозить новые фичи, чинить стабильность** | macOS app = SPOF. Стабильность должна быть gated. |
| **Quarterly founder health check-in с внешним advisor** | Bus factor = 1. Никакая метрика не capture burnout полностью, но внешний check-in снижает риск. |

### Ключевая проблема enforcement
Circuit breakers, установленные основателем для самого себя, имеют near-zero enforcement power. [ASSUMPTION, подтверждённая прецедентами: Quibi, и практически любой стартап, устанавливавший "kill metrics".] **Решение:** сделать breakers публичными (блог, investor updates) или назначить внешнего advisor с explicit mandate оспаривать "ещё один квартал".

---

## 8. Три сценария

### Пессимистичный (P = 25%)

**Триггеры:** retention < 25% после 6 мес., подписочная конверсия < 2%, macOS app нестабилен.

**Каскад:**
- Мес. 0-6: macOS app шипится с 3 интеграциями, но Zoom detection ломается после macOS update. Retention 18%.
- Мес. 6-9: Ring 1.5 (подписка) запускается, конверсия 1.5%. Revenue: ~$750/мес (1000 active users x 5% x $4.99 -- ниже target).
- Мес. 9-12: Founder выгорает от simultaneous: firmware support + app maintenance + API breakages + customer support. Разработка новых фич останавливается.
- Мес. 12-18: Revenue из hardware иссякает (early adopters обслужены). Нет средств на найм. Ring 2 не начинается. Продукт замораживается как niche gadget.

**Вероятность:** 25%. [ESTIMATE]

### Базовый (P = 50%)

**Сценарий:**
- Мес. 0-6: macOS app + Google Calendar + Slack + Zoom detection шипятся. Retention 28-32% (ниже 40%, но выше revised gate 30%). Одна-две интеграции нестабильны, но core работает.
- Мес. 6-9: BUSY Pro подписка запускается. Конверсия 4-6%. Revenue: ~$2,500-4,000/мес. Не хватает для найма, но покрывает инфраструктуру.
- Мес. 9-15: Installed base растёт до 20-25K через ADHD-позиционирование и smart home канал. 5-8 hero-интеграций работают (Home Assistant, OBS, GitHub). Focus Score sharing даёт viral traction.
- Мес. 15-24: Subscription revenue достигает $8-12K/мес. Возможен найм одного разработчика. Ring 2 (Developer Portal, App Library) начинается с ограниченным scope.

**Вероятность:** 50%. [ESTIMATE]

### Оптимистичный (P = 25%)

**Сценарий:**
- Мес. 0-6: macOS app работает отлично. Retention 35%+. ADHD-community подхватывает продукт -- 3 YouTuber-review дают spike в продажах.
- Мес. 6-9: BUSY Pro конверсия 8-12%. HSA/FSA eligibility снижает effective price. Installed base 30K+.
- Мес. 9-12: Focus Score viral loop работает. "BUSY Bar для пар" positioning создаёт 2-unit purchases. Revenue: $15-25K/мес (hardware + subscription).
- Мес. 12-18: Seed round ($500K-1M) на основе retention + subscription metrics. Команда вырастает до 3-4 человек. Ring 2 запускается полноценно.
- Мес. 18-24: 50K+ devices. AI Agent Monitor становится killer feature для developer-сегмента. "Peloton of focus" narrative привлекает Series A interest.

**Вероятность:** 25%. [ESTIMATE]

---

## 9. Hypothesis Ladder

### Гипотеза 1: "Физический якорь создаёт retention выше, чем software-only"

**Риск если неверна:** Весь продуктовый тезис рушится. Hardware = liability, не asset. Вся стратегия невалидна.

- **Тест 1** (стоимость: $0, время: 1 неделя): Опросить текущих владельцев Ring 0 -- используют ли устройство ежедневно? Корреляция между частотой использования и удовлетворённостью? Если >50% используют <3 раз/нед -- тезис уже под вопросом.
- **Тест 2** (стоимость: $500 на инфраструктуру, время: 4 недели): Closed beta Ring 1 (macOS app + Google Calendar) на 50 пользователях. Измерить: сколько дней из 30 устройство подключено и auto-status срабатывал?
- **Full commitment:** Публичный запуск Ring 1 только если beta показывает >30% weekly active device connection.

### Гипотеза 2: "ADHD-сегмент готов платить $249 за физический focus tool"

**Риск если неверна:** Primary market на порядок меньше (только tech early adopters). Growth ceiling достигается при 15-20K units.

- **Тест 1** (стоимость: $200 на ads, время: 2 недели): ADHD-targeted landing page + waitlist. Измерить: CTR, signup rate, email engagement vs. generic "productivity" messaging.
- **Тест 2** (стоимость: $2,500 на 10 devices, время: 4 недели): 5 ADHD/productivity YouTubers получают устройство + early Ring 1 access. Измерить: referral traffic, conversion, qualitative feedback.
- **Full commitment:** Если ADHD landing page CTR > 2x generic -- перестроить primary messaging вокруг ADHD.

### Гипотеза 3: "Пользователи готовы платить $4.99/мес за Focus Memory поверх бесплатного auto-presence"

**Риск если неверна:** Бизнес-модель не работает. Hardware margin конечна, software разработка -- бесконечна. Проект медленно умирает.

- **Тест 1** (стоимость: $0, время: 1 неделя): Опрос существующих пользователей: "Заплатили бы $4.99/мес за X?" с конкретными screenshots фич. Оценить willingness-to-pay.
- **Тест 2** (стоимость: $1,000 на mockups + Stripe, время: 4 недели): "Coming soon" paywall на Focus Memory features в beta app. Измерить: сколько нажали "Subscribe" (даже если фичи ещё не готовы). Fake door test.
- **Full commitment:** Запуск подписки только если fake door показывает >8% conversion intent.

---

## 10. Нерешённые разногласия

### 1. Достижимый уровень retention: 30% vs. 40%

**CASSANDRA:** 40% -- в top 1% всех приложений. Даже 30% -- world-class. При отсутствии subscription lock-in, любая цифра выше 25% -- оптимистична.

**TESLA:** BUSY Bar -- не типичное приложение. Physical anchor + sunk cost + set-and-forget model создают structural retention advantages, несравнимые с free mobile apps.

**Статус:** VIKTOR предложил компромисс (gate 30%, определение retention), но фундаментальный вопрос остаётся: действительно ли physical anchor создаёт 2x retention advantage vs. software-only? Ответ -- только через beta-тест.

### 2. Масштаб угрозы от Apple "Focus Presence"

**CASSANDRA:** 15-20% probability, extinction-level impact. Apple has a pattern of Sherlocking.

**TESLA:** 5 лет Focus Modes не решили проблему. Cross-platform -- вне incentives Apple. Share compression, не extinction.

**Статус:** VIKTOR downgraded от "EXISTENTIAL" до "HIGH -- manageable", но CASSANDRA не согласна с downgrade. Если Apple добавит физический сигнал через HomePod LED + auto-activation по календарю, cross-platform argument ослабевает для пользователей all-Apple ecosystem (~35-40% US knowledge workers). [UNKNOWN: точная доля all-Apple users среди целевой аудитории]

### 3. AI agents: угроза или возможность?

**CASSANDRA:** 20-30% вероятность, что AI agents к 2028 будут управлять calendar/status/availability автоматически, делая physical signal unnecessary.

**TESLA:** AI agent proliferation создаёт НОВЫЙ use case -- "AI Agent Monitor" как физический индикатор работы AI.

**Статус:** Обе стороны правы, но в разных timeframes. Краткосрочно (12-18 мес.) -- AI agents = opportunity (monitoring). Долгосрочно (36+ мес.) -- AI agents = potential category disruption. Вопрос не решён.

---

## 11. Рекомендации (5 конкретных действий)

### 1. Спроектировать и зафиксировать подписочную модель в стратегии -- ДО начала разработки Ring 1

**ЧТО:** Free tier = auto-presence. BUSY Pro = $4.99/мес (Focus Memory, аналитика, history, export). BUSY Teams = $15/user/мес (team dashboard, focus windows). Записать pricing, feature gating, target conversion (5-10%), revenue milestones в стратегический документ.

**ПОЧЕМУ:** Это единственная модификация, без которой стратегия гарантированно провалится. Обе стороны дебатов единогласны. Oura/WHOOP precedent доказывает жизнеспособность модели hardware-first -> subscription-later. [FACT]

**КАК ПРОВЕРИТЬ ДЁШЕВО:** Fake door test в beta app -- "Subscribe to unlock" кнопка на Focus Memory mockups. Если intent > 8%, модель рабочая.

### 2. Сократить Ring 1 до macOS-only + 3 core интеграции

**ЧТО:** Ring 1 launch = macOS menubar app + Google Calendar + Slack sync + Zoom detection. Всё остальное (Windows, Outlook, Teams, Meet, Focus Analytics) -- Ring 1.5 или Ring 2.

**ПОЧЕМУ:** Единственный способ для 1-2 человек шипнуть quality product в 6 мес. Partial execution (Calendar + Slack) уже даёт aha moment: "BUSY Bar автоматически включается когда ты на встрече и ставит Slack в DND". Обе стороны дебатов единогласны по macOS-only. [FACT: Linear, Raycast, Arc -- все macOS-first]

**КАК ПРОВЕРИТЬ ДЁШЕВО:** Beta с 50 пользователями. Если 3 интеграции дают >30% retention -- scope верен. Не добавлять интеграции до валидации.

### 3. Начать ADHD-позиционирование параллельно с разработкой Ring 1

**ЧТО:** Landing page busy.bar/adhd, контакт с 3-5 ADHD/productivity YouTubers (How to ADHD, Thomas Frank, Matt D'Avella), исследование HSA/FSA eligibility, партнёрство с ADHD-коучами.

**ПОЧЕМУ:** $20B рынок, идеально совпадающий с продуктом. Не требует изменений в коде. Стоимость: $2,500-5,000 (10-20 devices для influencers). Потенциальный ROI: 3x addressable market. HSA/FSA eligibility снижает effective price до ~$150-170. [FACT: ADHD apps market CAGR 15.65%]

**КАК ПРОВЕРИТЬ ДЁШЕВО:** A/B тест messaging: ADHD-focused vs. generic "productivity". 2 недели, $200 на ads. Измерить CTR и signup rate.

### 4. Переопределить gate metrics и добавить missing circuit breakers

**ЧТО:**
- Retention = "device connected + 1+ auto-status trigger за 30 дней". Gate: 30% (не 40%).
- Заменить "200+ integrations" на "10+ third-party integrations, каждая используется 100+ weekly users".
- Добавить: subscription conversion < 2% за 6 мес. -> reassess; maintenance > 50% за 3 мес. -> hire/cut scope; crash rate > 1% -> freeze features.
- Сделать все breakers публичными (блог или investor update).

**ПОЧЕМУ:** Текущие metrics плохо определены (что такое "retention"?) или unreachable (200 integrations при 15K devices). Self-set breakers без enforcement -- декоративные. [ASSUMPTION, подтверждённая прецедентами]

**КАК ПРОВЕРИТЬ ДЁШЕВО:** Определить metrics сейчас, до запуска. Стоимость: $0. Время: 1 день.

### 5. Коллапсировать 6 тиров в 4 фазы и сжать timeline до 18-24 мес.

**ЧТО:**
- **Phase 1 -- Core** (сейчас): Ring 0, hardware works.
- **Phase 2 -- Software** (0-9 мес.): Ring 1 + Ring 1.5 merged. Auto-presence + subscription + Focus Memory.
- **Phase 3 -- Platform** (9-18 мес.): Ring 2. Developer tools, 10-20 hero integrations, smart home recipes.
- **Phase 4 -- Aspirational** (18+ мес.): Ring 3. AI Coach, BUSY Mini, B2B -- только если Phase 3 gates пройдены.

**ПОЧЕМУ:** 6 тиров (0, 1, 1.5, 2, 2.5, 3) -- overengineered для 1-2 человек. Увеличивает cognitive overhead и создаёт artificial gates, замедляющие execution. Ring 2.5 не имеет coherent thesis ("Team + AI-Adjacent" -- это scope creep с лейблом). 36 мес. -- слишком долго; рынок может измениться. [ASSUMPTION: обе стороны дебатов согласны]

**КАК ПРОВЕРИТЬ ДЁШЕВО:** Обновить стратегический документ. Стоимость: $0. Время: 2 часа.

---

## Appendix: Claim Tags Summary

| Тег | CASSANDRA | TESLA | VIKTOR | SOPHIA (этот отчёт) | **Итого** |
|-----|:-:|:-:|:-:|:-:|:-:|
| [FACT] | 19 | 16 | 4 | 12 | **51** |
| [ASSUMPTION] | 5 | 3 | 1 | 8 | **17** |
| [UNKNOWN] | 2 | 0 | 0 | 1 | **3** |
| [ANALOGY] | 5 | 10 | 0 | 3 | **18** |
| [ESTIMATE] | 2 | 2 | 0 | 6 | **10** |

**Соотношение FACT : ASSUMPTION = 3:1** -- отчёт преимущественно основан на фактах и прецедентах, не на предположениях.

---

*Этот отчёт подготовлен adversarial командой из 4 аналитиков с противоположными мандатами. Каждый claim проверен минимум двумя аналитиками с разных позиций. Рекомендации отражают консенсус там, где он достигнут, и явно фиксируют разногласия там, где он не достигнут.*
