import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ActiveFocusSession } from '@components/proto/ActiveFocusSession'
import { FamilyStatusPage } from '@components/proto/FamilyStatusPage'
import { InterruptionCostReport } from '@components/proto/InterruptionCostReport'
import { SmartHomeScene } from '@components/proto/SmartHomeScene'
import { AIAgentMonitor } from '@components/proto/AIAgentMonitor'
import { BodyDoublingRoom } from '@components/proto/BodyDoublingRoom'
import { MultiDevicePresence } from '@components/proto/MultiDevicePresence'
import { AutoTimesheetOps } from '@components/proto/AutoTimesheetOps'
import PageHeader from '@components/layout/PageHeader'
import { useIsCompact } from '@lib/useIsCompact'

type PrototypePaletteStyle = React.CSSProperties & Record<`--${string}`, string>

type CuratedPrototype = {
  id: string
  title: string
  description: string
  ring: 'r0' | 'r1' | 'r2' | 'r3'
  phase: '0' | '1.0' | '1.5' | '2.0' | '2.5' | '3'
  stakeholders: string[]
  previewWidth: number
  previewHeight: number
  cardScale: number
  detailScale: number
  kicker: string
  summary: string
  concept: string
  whyDifferent: string[]
  Component: React.ComponentType
}

const ringLabel: Record<CuratedPrototype['ring'], string> = {
  r0: 'Ring 0 · Core',
  r1: 'Ring 1 · Software',
  r2: 'Ring 2 · Platform',
  r3: 'Ring 3 · Ecosystem',
}

const ringColorVar: Record<CuratedPrototype['ring'], string> = {
  r0: 'var(--ring-0)',
  r1: 'var(--ring-1)',
  r2: 'var(--ring-2)',
  r3: 'var(--ring-3)',
}

const ringDimVar: Record<CuratedPrototype['ring'], string> = {
  r0: 'var(--ring-0-dim)',
  r1: 'var(--ring-1-dim)',
  r2: 'var(--ring-2-dim)',
  r3: 'var(--ring-3-dim)',
}

const prototypeChrome = 'var(--sl)'
const prototypeChromeDim = 'var(--sl-bg)'

const phaseLabel: Record<CuratedPrototype['phase'], string> = {
  '0': 'Фаза 0',
  '1.0': 'Фаза 1.0',
  '1.5': 'Фаза 1.5',
  '2.0': 'Фаза 2.0',
  '2.5': 'Фаза 2.5',
  '3': 'Фаза 3',
}

const stakeholderLabel: Record<string, string> = {
  fw: 'Focus Worker',
  dev: 'Developer',
  sh: 'Smart Home',
  lead: 'Руководитель',
  fam: 'Семья',
  col: 'Коллеги',
  team: 'Команда',
}

const phaseSortOrder: Record<CuratedPrototype['phase'], number> = {
  '0': 0,
  '1.0': 1,
  '1.5': 2,
  '2.0': 3,
  '2.5': 4,
  '3': 5,
}

const prototypePaletteVars: PrototypePaletteStyle = {
  '--ring-0': 'var(--sl)',
  '--ring-0-dim': 'color-mix(in srgb, var(--sl) 12%, transparent)',
  '--ring-1': 'var(--or)',
  '--ring-1-dim': 'color-mix(in srgb, var(--or) 14%, transparent)',
  '--ring-2': 'var(--or)',
  '--ring-2-dim': 'color-mix(in srgb, var(--or) 12%, transparent)',
  '--ring-3': 'var(--sl)',
  '--ring-3-dim': 'color-mix(in srgb, var(--sl) 14%, transparent)',
  '--color-success': 'var(--sl)',
  '--color-success-hover': 'var(--sl-2)',
  '--color-warning': 'var(--or)',
  '--color-warning-hover': 'var(--or-2)',
  '--color-danger': 'var(--or)',
  '--color-danger-hover': 'var(--or-2)',
  '--color-info': 'var(--sl)',
  '--color-info-hover': 'var(--sl-2)',
  '--color-primary': 'var(--or)',
  '--color-primary-hover': 'var(--or-2)',
  '--color-primary-active': 'var(--or-active)',
}

const prototypes: CuratedPrototype[] = [
  {
    id: 'active-focus-session',
    title: 'Active Focus Session',
    description:
      'Полноэкранный режим активной сессии: LED-сигнал, таймер, проект, блокировка отвлечений и состояние внешнего мира в одном спокойном экране.',
    ring: 'r0',
    phase: '0',
    stakeholders: ['fw', 'dev'],
    previewWidth: 360,
    previewHeight: 500,
    cardScale: 0.76,
    detailScale: 1.08,
    kicker: 'Ядро продукта в один взгляд',
    summary:
      'Самый понятный hero-экран BUSY: человек входит в фокус, видит живую сессию и понимает, что устройство действительно управляет моментом работы.',
    concept:
      'Это не помодоро-таймер ради таймера. Экран показывает BUSY как физический ритуал начала работы: статус уже вышел наружу, отвлекающие каналы уже приглушены, а сессия ощущается как защищённый контур.',
    whyDifferent: [
      'Фокус здесь не абстрактный, а физически подтверждённый через устройство и внешний статус.',
      'Большинство focus-продуктов показывают таймер; BUSY показывает рабочее состояние комнаты и каналов вокруг тебя.',
    ],
    Component: ActiveFocusSession,
  },
  {
    id: 'family-status-page',
    title: 'Family Status Page',
    description:
      'Простая web-страница для семьи без установки приложения: видно текущий статус, следующее окно и безопасный способ мягко постучаться.',
    ring: 'r1',
    phase: '1.0',
    stakeholders: ['fam', 'fw'],
    previewWidth: 340,
    previewHeight: 600,
    cardScale: 0.58,
    detailScale: 0.94,
    kicker: 'Статус выходит за пределы комнаты',
    summary:
      'Этот прототип показывает BUSY не как личный гаджет, а как новый язык для семьи: понятный, спокойный и не требующий ещё одного приложения.',
    concept:
      'Смысл в том, что LED-сигнал становится доступным удалённо. Семья видит не просто “красный свет”, а человечески понятный статус: когда можно зайти, что делать в срочном случае и сколько осталось до окна.',
    whyDifferent: [
      'У software-only продуктов почти нет семейного слоя: BUSY превращает личный статус в shared household protocol.',
      'Здесь важен не чат и не уведомления, а снижение бытового трения без установки ничего на чужой телефон.',
    ],
    Component: FamilyStatusPage,
  },
  {
    id: 'multi-device-presence',
    title: 'Multi-Device Presence',
    description:
      'Большинство людей работают за 2–3 устройствами. BUSY собирает их контекст в один физический индикатор и даёт комнате единый, понятный статус.',
    ring: 'r1',
    phase: '1.0',
    stakeholders: ['fw', 'dev', 'col'],
    previewWidth: 380,
    previewHeight: 500,
    cardScale: 0.74,
    detailScale: 1.08,
    kicker: 'Один свет для всей сетап-реальности',
    summary:
      'Этот прототип показывает BUSY как единую ambient-surface для мира, где работа разнесена по нескольким устройствам одновременно.',
    concept:
      'Идея не в том, чтобы читать только ноутбук. BUSY видит laptop context, mobile focus state, secondary-screen noise и синтезирует их в один физический статус, который понимают и вы, и люди вокруг.',
    whyDifferent: [
      'Большинство продуктов фокусируются на одном устройстве, а реальная работа давно распределена между несколькими.',
      'Физический индикатор становится не аксессуаром к одному приложению, а точкой синхронизации всего рабочего окружения.',
    ],
    Component: MultiDevicePresence,
  },
  {
    id: 'interruption-cost-report',
    title: 'Interruption Cost Report',
    description:
      'Отчёт считает не только количество отвлечений, но и полную цену восстановления: потерянные часы deep work, денежный эквивалент и самые дорогие паттерны прерываний.',
    ring: 'r1',
    phase: '1.5',
    stakeholders: ['fw', 'lead', 'col'],
    previewWidth: 380,
    previewHeight: 500,
    cardScale: 0.74,
    detailScale: 1.08,
    kicker: 'Видимая цена рассеянности',
    summary:
      'Один из самых сильных moat-экранов BUSY: продукт показывает не “сколько ты работал”, а сколько реально стоили прерывания.',
    concept:
      'Это operational-report про утечку внимания. BUSY знает, когда сессия сорвалась, сколько длилось восстановление и какие типы вмешательств крадут больше всего deep work.',
    whyDifferent: [
      'Почти никто не считает стоимость context switching как отдельный продуктовый слой.',
      'Отчёт даёт аргумент для разговора с собой, семьёй или командой, а не просто красивую аналитику задним числом.',
    ],
    Component: InterruptionCostReport,
  },
  {
    id: 'auto-timesheet-ops',
    title: 'Auto Timesheet Ops',
    description:
      'Автоматический таймшит без ручного трекинга: BUSY собирает рабочие блоки из статуса, календаря, активных окон и звонков и превращает их в B2B-ready отчёт.',
    ring: 'r2',
    phase: '2.5',
    stakeholders: ['fw', 'lead', 'team'],
    previewWidth: 380,
    previewHeight: 500,
    cardScale: 0.74,
    detailScale: 1.08,
    kicker: 'Продаваемый B2B-слой поверх focus-инфраструктуры',
    summary:
      'Один из самых коммерчески понятных экранов в системе: если BUSY умеет видеть рабочий контекст, он может автоматически собирать timesheet без боли ручного ввода.',
    concept:
      'Этот прототип показывает переход от personal focus tool к workflow system для команд. Важна не просто аналитика, а операционный артефакт, который можно продавать как экономию времени и повышение точности отчётности.',
    whyDifferent: [
      'Большинство timesheet-продуктов просят пользователя всё помнить и вручную логировать.',
      'BUSY использует уже существующие сигналы фокуса и присутствия, чтобы сделать таймшит побочным продуктом системы, а не отдельной обязанностью.',
    ],
    Component: AutoTimesheetOps,
  },
  {
    id: 'smart-home-scene',
    title: 'Smart Home Scene',
    description:
      'BUSY включает сценарий дома: свет тускнеет, дверной знак загорается, звонок уходит в тихий режим, а после завершения сессии запускается следующий бытовой контекст.',
    ring: 'r2',
    phase: '2.0',
    stakeholders: ['sh', 'fam', 'fw'],
    previewWidth: 380,
    previewHeight: 500,
    cardScale: 0.74,
    detailScale: 1.08,
    kicker: 'Физический мир реагирует на статус',
    summary:
      'Здесь BUSY становится не просто индикатором, а orchestration-layer для комнаты и дома: внимание человека начинает управлять окружающей средой.',
    concept:
      'Прототип показывает automation-chain вокруг одной простой идеи: “я вошёл в фокус”. В ответ меняются свет, табличка на двери, звонок и post-session routine, то есть статус получает физические последствия.',
    whyDifferent: [
      'Это не smart-home ради smart-home, а защита внимания через бытовую инфраструктуру.',
      'Уникальность BUSY в том, что триггером становится именно рабочее состояние человека, а не расписание или ручная сцена в приложении.',
    ],
    Component: SmartHomeScene,
  },
  {
    id: 'ai-agent-monitor',
    title: 'AI Agent Monitor',
    description:
      'Физический монитор состояния AI-агентов: когда агенты думают, пишут код или ждут одобрения, BUSY показывает это из любой точки комнаты.',
    ring: 'r2',
    phase: '2.5',
    stakeholders: ['dev', 'fw'],
    previewWidth: 380,
    previewHeight: 500,
    cardScale: 0.74,
    detailScale: 1.08,
    kicker: 'Новый тип статуса для эпохи агентов',
    summary:
      'Самый свежий category-creating экран в наборе: BUSY становится физическим интерфейсом к работе AI-агентов, а не только к состоянию человека.',
    concept:
      'Идея в том, что developer tools уже умеют слать hooks о состоянии агента. BUSY переводит их в понятные сигналы комнаты: агент думает, агент работает, агенту нужен ты.',
    whyDifferent: [
      'Это не generic AI chat, а реальный ambient surface для новой работы с автономными агентами.',
      'Статус агента становится видимым без постоянного взгляда в ноутбук, что особенно сильно для vibe-coding сценариев.',
    ],
    Component: AIAgentMonitor,
  },
  {
    id: 'body-doubling-room',
    title: 'Body Doubling Room',
    description:
      'Социальная комната совместной концентрации: общая сессия, общий таймер и присутствие других людей без превращения опыта в обычный звонок.',
    ring: 'r3',
    phase: '3',
    stakeholders: ['fw', 'dev', 'team'],
    previewWidth: 320,
    previewHeight: 370,
    cardScale: 0.76,
    detailScale: 1.12,
    kicker: 'Социальный слой вокруг фокуса',
    summary:
      'Этот экран показывает самое смелое расширение BUSY: фокус может быть не только одиночным, но и multiplayer-опытом с чувством совместного присутствия.',
    concept:
      'Body doubling особенно силён там, где людям нужно не общение, а ощущение, что рядом кто-то тоже держит концентрацию. BUSY превращает этот паттерн в нативный продуктовый режим.',
    whyDifferent: [
      'В отличие от обычных ко-воркинг звонков, здесь центр интерфейса не разговор, а совместный фокусный ритм.',
      'Экран расширяет BUSY в социальную категорию без потери основного promise про protected attention.',
    ],
    Component: BodyDoublingRoom,
  },
]

const allStakeholders = [...new Set(prototypes.flatMap((prototype) => prototype.stakeholders))]
const allPhases = [...new Set(prototypes.map((prototype) => prototype.phase))].sort(
  (left, right) => phaseSortOrder[left] - phaseSortOrder[right],
)
const allRings = [...new Set(prototypes.map((prototype) => prototype.ring))].sort()

type FilterChipProps = {
  label: string
  active: boolean
  color?: string
  dimColor?: string
  onClick: () => void
}

function FilterChip({ label, active, color, dimColor, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-xs)',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        padding: '4px 10px',
        borderRadius: 'var(--radius-full)',
        border: `1px solid ${active && color ? color : 'var(--border)'}`,
        background: active ? (dimColor ?? 'var(--surface-2)') : 'transparent',
        color: active ? (color ?? 'var(--tx)') : 'var(--tx-3)',
        cursor: 'pointer',
        transition: 'var(--transition-fast)',
      }}
    >
      {label}
    </button>
  )
}

type PreviewStageProps = {
  proto: CuratedPrototype
  detail?: boolean
  compact?: boolean
}

function PreviewStage({ proto, detail = false, compact = false }: PreviewStageProps) {
  const stageHeight = detail
    ? compact
      ? 380
      : 620
    : 248
  const topOffset = detail
    ? compact
      ? 18
      : 24
    : 12
  const scale = detail
    ? compact
      ? Math.min(proto.detailScale, 0.92)
      : proto.detailScale
    : proto.cardScale

  return (
    <div
      style={{
        position: 'relative',
        height: stageHeight,
        overflow: 'hidden',
        borderRadius: detail ? 'var(--radius-xl)' : 'var(--radius-lg)',
        background: `
          radial-gradient(circle at top right, color-mix(in srgb, ${prototypeChromeDim} 92%, transparent), transparent 42%),
          linear-gradient(180deg, color-mix(in srgb, var(--surface) 92%, var(--bg)) 0%, var(--surface) 100%)
        `,
        border: `1px solid color-mix(in srgb, ${prototypeChrome} 18%, var(--border))`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, color-mix(in srgb, var(--border) 55%, transparent) 1px, transparent 1px),
            linear-gradient(to bottom, color-mix(in srgb, var(--border) 55%, transparent) 1px, transparent 1px)
          `,
          backgroundSize: detail ? '28px 28px' : '22px 22px',
          opacity: 0.25,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: topOffset,
          width: proto.previewWidth,
          height: proto.previewHeight,
          transform: `translateX(-50%) scale(${scale})`,
          transformOrigin: 'top center',
          pointerEvents: 'none',
        }}
      >
        <proto.Component />
      </div>
    </div>
  )
}

function StakeholderPill({ stakeholder }: { stakeholder: string }) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: 'var(--tx-3)',
        padding: '4px 8px',
        borderRadius: 'var(--radius-full)',
        border: '1px solid var(--border)',
        background: 'var(--surface)',
      }}
    >
      {stakeholderLabel[stakeholder] ?? stakeholder}
    </span>
  )
}

export default function PrototypesPage() {
  const isCompact = useIsCompact()
  const [activeRing, setActiveRing] = useState<CuratedPrototype['ring'] | null>(null)
  const [activePhase, setActivePhase] = useState<CuratedPrototype['phase'] | null>(null)
  const [activeStakeholder, setActiveStakeholder] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = prototypes.filter((prototype) => {
    if (activeRing && prototype.ring !== activeRing) return false
    if (activePhase && prototype.phase !== activePhase) return false
    if (activeStakeholder && !prototype.stakeholders.includes(activeStakeholder)) return false
    return true
  })

  const expandedPrototype = expanded
    ? filtered.find((prototype) => prototype.id === expanded) ?? prototypes.find((prototype) => prototype.id === expanded) ?? null
    : null

  return (
    <div style={{ ...prototypePaletteVars, textAlign: 'left', maxWidth: 1240, margin: '0 auto' }}>
      <PageHeader
        title="PROTOTYPES"
        meta={`${filtered.length}/${prototypes.length} ключевых экранов`}
        description="Здесь остались только те концепты, которые лучше всего объясняют, почему BUSY не похож на очередной focus-app."
        marginBottom="var(--space-5)"
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--tx-3)', width: 60 }}>Кольцо</span>
          <FilterChip label="Все" active={activeRing === null} onClick={() => setActiveRing(null)} />
          {allRings.map((ring) => (
            <FilterChip
              key={ring}
              label={`Кольцо ${ring.replace('r', '')}`}
              active={activeRing === ring}
              color={ringColorVar[ring]}
              dimColor={ringDimVar[ring]}
              onClick={() => setActiveRing(activeRing === ring ? null : ring)}
            />
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--tx-3)', width: 60 }}>Фаза</span>
          <FilterChip label="Все" active={activePhase === null} onClick={() => setActivePhase(null)} />
          {allPhases.map((phase) => (
            <FilterChip
              key={phase}
              label={phaseLabel[phase]}
              active={activePhase === phase}
              onClick={() => setActivePhase(activePhase === phase ? null : phase)}
            />
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--tx-3)', width: 60 }}>Кто</span>
          <FilterChip label="Все" active={activeStakeholder === null} onClick={() => setActiveStakeholder(null)} />
          {allStakeholders.map((stakeholder) => (
            <FilterChip
              key={stakeholder}
              label={stakeholderLabel[stakeholder] ?? stakeholder}
              active={activeStakeholder === stakeholder}
              onClick={() => setActiveStakeholder(activeStakeholder === stakeholder ? null : stakeholder)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              padding: 'var(--space-12)',
              textAlign: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-sm)',
              color: 'var(--tx-3)',
            }}
          >
            Нет прототипов для выбранных фильтров
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            style={{
              display: 'grid',
              gridTemplateColumns: isCompact ? '1fr' : 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: 'var(--space-5)',
            }}
          >
            {filtered.map((proto, index) => (
              <motion.button
                key={proto.id}
                type="button"
                layoutId={`proto-card-${proto.id}`}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.28, delay: index * 0.04, ease: 'easeOut' }}
                onClick={() => setExpanded(proto.id)}
                style={{
                  textAlign: 'left',
                  border: '1px solid color-mix(in srgb, var(--border) 85%, transparent)',
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  background: 'linear-gradient(180deg, color-mix(in srgb, var(--surface) 92%, var(--bg)), var(--surface))',
                  boxShadow: 'var(--shadow-sm)',
                  cursor: 'pointer',
                  padding: 0,
                }}
                whileHover={{ y: -3, boxShadow: 'var(--shadow-md)' }}
                whileTap={{ scale: 0.995 }}
              >
                <div
                  style={{
                    padding: 'var(--space-3) var(--space-4)',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: 'var(--space-3)',
                    background: `linear-gradient(180deg, ${prototypeChromeDim}, color-mix(in srgb, ${prototypeChromeDim} 45%, transparent))`,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 10,
                        fontWeight: 700,
                        color: prototypeChrome,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        marginBottom: 5,
                      }}
                    >
                      {ringLabel[proto.ring]}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--tx)', fontWeight: 700 }}>
                      {proto.title}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--tx-3)' }}>
                      {phaseLabel[proto.phase]}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 10,
                        fontWeight: 700,
                        color: prototypeChrome,
                        padding: '4px 8px',
                        borderRadius: 'var(--radius-full)',
                        border: `1px solid color-mix(in srgb, ${prototypeChrome} 34%, var(--border))`,
                        background: 'var(--surface)',
                      }}
                    >
                      ОТКРЫТЬ
                    </span>
                  </div>
                </div>

                <div style={{ padding: '0 var(--space-4) var(--space-4)' }}>
                  <PreviewStage proto={proto} />
                </div>

                <div
                  style={{
                    padding: '0 var(--space-4) var(--space-4)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-2)',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: prototypeChrome,
                    }}
                  >
                    {proto.kicker}
                  </div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--tx-2)', lineHeight: 1.55 }}>
                    {proto.summary}
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {expandedPrototype ? (
          <motion.div
            key="overlay"
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpanded(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'color-mix(in srgb, var(--overlay) 88%, transparent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 120,
              padding: isCompact ? 'var(--space-3)' : 'var(--space-6)',
            }}
          >
            <motion.div
              layoutId={`proto-card-${expandedPrototype.id}`}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={expandedPrototype.title}
              style={{
                background: 'linear-gradient(180deg, color-mix(in srgb, var(--surface) 94%, var(--bg)), var(--surface))',
                borderRadius: 'calc(var(--radius-xl) + 4px)',
                border: `1px solid color-mix(in srgb, ${prototypeChrome} 24%, var(--border))`,
                boxShadow: 'var(--shadow-xl)',
                overflow: 'hidden',
                width: 'min(1180px, 100%)',
                maxHeight: 'calc(100svh - 24px)',
                display: 'grid',
                gridTemplateColumns: isCompact ? '1fr' : 'minmax(0, 1.35fr) minmax(320px, 0.65fr)',
              }}
            >
              <div
                style={{
                  padding: isCompact ? 'var(--space-4)' : 'var(--space-5)',
                  borderRight: isCompact ? 'none' : '1px solid var(--border)',
                  borderBottom: isCompact ? '1px solid var(--border)' : 'none',
                  background: 'color-mix(in srgb, var(--surface) 88%, var(--bg))',
                  overflow: 'auto',
                }}
              >
                <PreviewStage proto={expandedPrototype} detail compact={isCompact} />
              </div>

              <div
                style={{
                  position: 'relative',
                  padding: isCompact ? 'var(--space-4)' : 'var(--space-5)',
                  overflowY: 'auto',
                }}
              >
                <button
                  type="button"
                  onClick={() => setExpanded(null)}
                  style={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 18,
                    color: 'var(--tx-3)',
                    lineHeight: 1,
                    padding: 4,
                  }}
                >
                  ×
                </button>

                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: prototypeChrome,
                    marginBottom: 8,
                  }}
                >
                  {expandedPrototype.kicker}
                </div>

                <h2
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xl)',
                    fontWeight: 700,
                    color: 'var(--tx)',
                    letterSpacing: '0.03em',
                    textTransform: 'uppercase',
                    margin: '0 28px 8px 0',
                  }}
                >
                  {expandedPrototype.title}
                </h2>

                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--tx)',
                    lineHeight: 1.65,
                    margin: '0 0 var(--space-4)',
                  }}
                >
                  {expandedPrototype.summary}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: ringColorVar[expandedPrototype.ring],
                      padding: '4px 8px',
                      borderRadius: 'var(--radius-full)',
                      border: `1px solid color-mix(in srgb, ${ringColorVar[expandedPrototype.ring]} 45%, var(--border))`,
                      background: ringDimVar[expandedPrototype.ring],
                    }}
                  >
                    {ringLabel[expandedPrototype.ring]}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: 'var(--tx-3)',
                      padding: '4px 8px',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid var(--border)',
                      background: 'var(--surface)',
                    }}
                  >
                    {phaseLabel[expandedPrototype.phase]}
                  </span>
                  {expandedPrototype.stakeholders.map((stakeholder) => (
                    <StakeholderPill key={stakeholder} stakeholder={stakeholder} />
                  ))}
                </div>

                <InfoBlock title="Про что этот прототип" color={ringColorVar[expandedPrototype.ring]}>
                  {expandedPrototype.concept}
                </InfoBlock>

                <InfoBlock title="Что именно показываем" color="var(--tx-3)">
                  {expandedPrototype.description}
                </InfoBlock>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: ringColorVar[expandedPrototype.ring],
                    }}
                  >
                    Почему это уникально
                  </div>
                  {expandedPrototype.whyDifferent.map((point, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        gap: 'var(--space-2)',
                        alignItems: 'flex-start',
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-lg)',
                        background: 'color-mix(in srgb, var(--surface) 88%, var(--bg))',
                        border: '1px solid var(--border)',
                      }}
                    >
                      <span style={{ color: ringColorVar[expandedPrototype.ring], marginTop: 1, flexShrink: 0 }}>◆</span>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--tx-2)', lineHeight: 1.55 }}>
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

function InfoBlock({ title, children, color }: { title: string; children: React.ReactNode; color: string }) {
  return (
    <div
      style={{
        marginBottom: 'var(--space-4)',
        padding: 'var(--space-4)',
        borderRadius: 'var(--radius-lg)',
        background: 'color-mix(in srgb, var(--surface) 90%, var(--bg))',
        border: '1px solid var(--border)',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color,
          marginBottom: 8,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-sm)',
          color: 'var(--tx-2)',
          lineHeight: 1.6,
        }}
      >
        {children}
      </div>
    </div>
  )
}
