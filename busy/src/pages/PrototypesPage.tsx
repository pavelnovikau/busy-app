import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { getFeatures, getPrototypes } from '@lib/data'
import type { Prototype } from '@data/types'
import { FocusHeatmap } from '@components/proto/FocusHeatmap'
import { AIFocusMentor } from '@components/proto/AIFocusMentor'
import { EnergyPrediction } from '@components/proto/EnergyPrediction'
import { TeamFlowDashboard } from '@components/proto/TeamFlowDashboard'
import { FocusProfile } from '@components/proto/FocusProfile'
import { BodyDoublingRoom } from '@components/proto/BodyDoublingRoom'
import { AICoachChat } from '@components/proto/AICoachChat'
import { FocusProfilePage } from '@components/proto/FocusProfilePage'
import { useIsCompact } from '@lib/useIsCompact'

type PrototypePaletteStyle = React.CSSProperties & Record<`--${string}`, string>

const allPrototypes = getPrototypes()
const allFeatures = getFeatures()

const ringLabel: Record<string, string> = {
  r0: 'Ring 0 · Core',
  r1: 'Ring 1 · Software',
  r2: 'Ring 2 · Platform',
  r3: 'Ring 3 · Ecosystem',
}

const ringColorVar: Record<string, string> = {
  r0: 'var(--ring-0)', r1: 'var(--ring-1)', r2: 'var(--ring-2)', r3: 'var(--ring-3)',
}

const ringDimVar: Record<string, string> = {
  r0: 'var(--ring-0-dim)', r1: 'var(--ring-1-dim)', r2: 'var(--ring-2-dim)', r3: 'var(--ring-3-dim)',
}

const phaseLabel: Record<string, string> = {
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
  str: 'Стример',
  it: 'IT Manager',
  lead: 'Руководитель',
  fam: 'Семья',
  col: 'Коллеги',
}

const protoComponents: Record<string, React.ComponentType> = {
  'focus-heatmap': FocusHeatmap,
  'ai-focus-mentor': AIFocusMentor,
  'energy-prediction': EnergyPrediction,
  'team-flow-dashboard': TeamFlowDashboard,
  'focus-profile': FocusProfile,
  'body-doubling-room': BodyDoublingRoom,
  'ai-coach-chat': AICoachChat,
  'focus-profile-page': FocusProfilePage,
}

type PrototypePresentation = {
  hidden?: boolean
  previewWidth: number
  previewHeight: number
  cardScale: number
  detailScale: number
  kicker: string
  summary: string
  concept: string
  whyDifferent: string[]
}

const prototypePresentation: Record<string, PrototypePresentation> = {
  'focus-heatmap': {
    previewWidth: 360,
    previewHeight: 275,
    cardScale: 0.8,
    detailScale: 1.18,
    kicker: 'Зеркало рабочего дня',
    summary: 'Прототип показывает, как BUSY превращает хаотичный рабочий день в наглядную карту deep work, встреч и восстановлений.',
    concept: 'Это не ещё один тайм-трекер. Экран собирает physical + app context и показывает не только занятость, но и структуру фокуса во времени.',
    whyDifferent: [
      'Видно стоимость прерываний и плотность deep-work блоков, а не только время в приложениях.',
      'Данные рождаются автоматически из статуса BUSY, а не из ручного логирования.',
    ],
  },
  'energy-prediction': {
    previewWidth: 380,
    previewHeight: 320,
    cardScale: 0.76,
    detailScale: 1.12,
    kicker: 'AI-планирование недели',
    summary: 'Экран предсказывает лучшие окна для фокусной работы и помогает не просто смотреть назад, а заранее собирать рабочую неделю.',
    concept: 'Это слой прогноза поверх исторических паттернов фокуса, встреч и recovery-time. Пользователь видит не generic advice, а карту своих реальных сильных часов.',
    whyDifferent: [
      'Предсказание строится на interruption-aware истории, а не только на календаре.',
      'Визуально это выглядит как operational planner, а не как wellness-график.',
    ],
  },
  'team-flow-dashboard': {
    previewWidth: 360,
    previewHeight: 300,
    cardScale: 0.8,
    detailScale: 1.16,
    kicker: 'Командный ритм без surveillance',
    summary: 'Прототип показывает статус команды так, чтобы менеджер видел ритм deep work, но не превращал продукт в систему слежки.',
    concept: 'Главная идея здесь не “кто чем занят по минутам”, а “когда команду лучше не трогать и когда открываются окна для координации”.',
    whyDifferent: [
      'Это privacy-first view на ритм команды, а не performance dashboard по людям.',
      'Физический device truth делает статусы честнее, чем ручные Slack-статусы.',
    ],
  },
  'body-doubling-room': {
    previewWidth: 320,
    previewHeight: 370,
    cardScale: 0.78,
    detailScale: 1.12,
    kicker: 'Социальный слой вокруг фокуса',
    summary: 'Экран демонстрирует, как BUSY может стать не только личным инструментом, но и пространством совместной концентрации и accountability.',
    concept: 'Здесь фокус становится multiplayer-опытом: у тебя есть видимый прогресс, общая сессия и чувство, что вы работаете параллельно, а не в изоляции.',
    whyDifferent: [
      'Body doubling особенно силён для ADHD и удалённой работы, где важен эффект совместного присутствия.',
      'В отличие от обычных видео-румов, ядром здесь остаётся состояние фокуса, а не общение.',
    ],
  },
  'ai-coach-chat': {
    previewWidth: 340,
    previewHeight: 430,
    cardScale: 0.72,
    detailScale: 1.02,
    kicker: 'Разговорный интерфейс к фокусу',
    summary: 'Чатовый интерфейс показывает, как AI Coach превращает данные BUSY в конкретные решения: когда ставить блоки, где буфер, что делать после встречи.',
    concept: 'Это не чат ради чата. Это командный центр, где можно быстро договориться с системой о плане дня без сложных настроек.',
    whyDifferent: [
      'Советы опираются на историю interruption/recovery, а не на абстрактные productivity-советы.',
      'Формат чата делает AI-слой доступным и быстрым для повседневного использования.',
    ],
  },
  'focus-profile-page': {
    previewWidth: 360,
    previewHeight: 520,
    cardScale: 0.62,
    detailScale: 0.94,
    kicker: 'Публичная фокус-идентичность',
    summary: 'Полноценная страница профиля показывает, как BUSY может выйти за пределы личного тулза и стать shareable identity вокруг культуры фокуса.',
    concept: 'Профиль нужен не ради vanity metrics, а чтобы показать человеку его ритм, привычки и публичный статус в понятной, достойно выглядящей форме.',
    whyDifferent: [
      'Это social layer поверх реальных фокус-данных, а не просто ещё одна profile page.',
      'Профиль соединяет личную аналитику, живой статус и репутационный слой в одном экране.',
    ],
  },
  'ai-focus-mentor': {
    hidden: true,
    previewWidth: 320,
    previewHeight: 340,
    cardScale: 0.8,
    detailScale: 1.1,
    kicker: '',
    summary: '',
    concept: '',
    whyDifferent: [],
  },
  'focus-profile': {
    hidden: true,
    previewWidth: 320,
    previewHeight: 320,
    cardScale: 0.8,
    detailScale: 1.1,
    kicker: '',
    summary: '',
    concept: '',
    whyDifferent: [],
  },
}

const curatedOrder = [
  'focus-heatmap',
  'energy-prediction',
  'team-flow-dashboard',
  'body-doubling-room',
  'ai-coach-chat',
  'focus-profile-page',
] as const

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

const featureById = new Map(allFeatures.map((feature) => [feature.id, feature]))

const prototypes = curatedOrder
  .map((id) => allPrototypes.find((prototype) => prototype.id === id))
  .filter((prototype): prototype is Prototype => Boolean(prototype))
  .filter((prototype) => !prototypePresentation[prototype.id]?.hidden)

const allStakeholders = [...new Set(prototypes.flatMap((prototype) => prototype.stakeholders))]
const allPhases = [...new Set(prototypes.map((prototype) => prototype.phase))].sort()
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
  proto: Prototype
  detail?: boolean
  compact?: boolean
}

function PreviewStage({ proto, detail = false, compact = false }: PreviewStageProps) {
  const Component = protoComponents[proto.id]
  const presentation = prototypePresentation[proto.id]

  if (!Component || !presentation) return null

  const stageHeight = detail
    ? compact
      ? 380
      : 620
    : 248
  const scale = detail
    ? compact
      ? Math.min(presentation.detailScale, 0.92)
      : presentation.detailScale
    : presentation.cardScale

  return (
    <div
      style={{
        position: 'relative',
        height: stageHeight,
        overflow: 'hidden',
        borderRadius: detail ? 'var(--radius-xl)' : 'var(--radius-lg)',
        background: `
          radial-gradient(circle at top right, color-mix(in srgb, ${ringDimVar[proto.ring]} 85%, transparent), transparent 42%),
          linear-gradient(180deg, color-mix(in srgb, var(--surface) 92%, var(--bg)) 0%, var(--surface) 100%)
        `,
        border: `1px solid color-mix(in srgb, ${ringColorVar[proto.ring]} 16%, var(--border))`,
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
          top: detail ? '50%' : '53%',
          width: presentation.previewWidth,
          height: presentation.previewHeight,
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: 'center',
          pointerEvents: 'none',
        }}
      >
        <Component />
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
  const [activeRing, setActiveRing] = useState<string | null>(null)
  const [activePhase, setActivePhase] = useState<string | null>(null)
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
    <div style={{ ...prototypePaletteVars, textAlign: 'left', maxWidth: 1240 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
          padding: 'var(--space-4) 0',
          marginBottom: 'var(--space-4)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <h1
            style={{
              fontFamily: 'var(--font-pixel)',
              color: 'var(--tx)',
              fontSize: 'var(--text-2xl)',
              fontWeight: 600,
              margin: 0,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Прототипы
          </h1>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--tx-3)' }}>
            {filtered.length}/{prototypes.length} отобранных экранов
          </span>
        </div>

        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-sm)',
            color: 'var(--tx-3)',
            maxWidth: 420,
          }}
        >
          Оставил только прототипы, которые реально двигают продуктовую историю вперёд, и собрал их в единый preview-формат.
        </span>
      </div>

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
              label={phaseLabel[phase] ?? `Фаза ${phase}`}
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
            {filtered.map((proto, index) => {
              const presentation = prototypePresentation[proto.id]
              if (!presentation) return null

              return (
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
                      background: `linear-gradient(180deg, ${ringDimVar[proto.ring]}, color-mix(in srgb, ${ringDimVar[proto.ring]} 45%, transparent))`,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 10,
                          fontWeight: 700,
                          color: ringColorVar[proto.ring],
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
                        {phaseLabel[proto.phase] ?? proto.phase}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 10,
                          fontWeight: 700,
                          color: ringColorVar[proto.ring],
                          padding: '4px 8px',
                          borderRadius: 'var(--radius-full)',
                          border: `1px solid color-mix(in srgb, ${ringColorVar[proto.ring]} 40%, var(--border))`,
                          background: 'var(--surface)',
                        }}
                      >
                        ОТКРЫТЬ
                      </span>
                    </div>
                  </div>

                  <div style={{ padding: 'var(--space-4)' }}>
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
                        color: ringColorVar[proto.ring],
                      }}
                    >
                      {presentation.kicker}
                    </div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--tx-2)', lineHeight: 1.55 }}>
                      {presentation.summary}
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {expandedPrototype && (() => {
          const proto = expandedPrototype
          const presentation = prototypePresentation[proto.id]
          const relatedFeature = proto.featureId ? featureById.get(proto.featureId) : null

          if (!presentation) return null

          return (
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
                layoutId={`proto-card-${proto.id}`}
                onClick={(event) => event.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label={proto.title}
                style={{
                  background: 'linear-gradient(180deg, color-mix(in srgb, var(--surface) 94%, var(--bg)), var(--surface))',
                  borderRadius: 'calc(var(--radius-xl) + 4px)',
                  border: `1px solid color-mix(in srgb, ${ringColorVar[proto.ring]} 24%, var(--border))`,
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
                  <PreviewStage proto={proto} detail compact={isCompact} />
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
                      color: ringColorVar[proto.ring],
                      marginBottom: 8,
                    }}
                  >
                    {presentation.kicker}
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
                    {proto.title}
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
                    {presentation.summary}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 10,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: ringColorVar[proto.ring],
                        padding: '4px 8px',
                        borderRadius: 'var(--radius-full)',
                        border: `1px solid color-mix(in srgb, ${ringColorVar[proto.ring]} 45%, var(--border))`,
                        background: ringDimVar[proto.ring],
                      }}
                    >
                      {ringLabel[proto.ring]}
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
                      {phaseLabel[proto.phase] ?? proto.phase}
                    </span>
                    {proto.stakeholders.map((stakeholder) => (
                      <StakeholderPill key={stakeholder} stakeholder={stakeholder} />
                    ))}
                  </div>

                  <InfoBlock title="Про что этот прототип" color={ringColorVar[proto.ring]}>
                    {presentation.concept}
                  </InfoBlock>

                  <InfoBlock title="Что именно показываем" color="var(--tx-3)">
                    {proto.description}
                    {relatedFeature?.description ? ` ${relatedFeature.description}` : ''}
                  </InfoBlock>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 10,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: ringColorVar[proto.ring],
                      }}
                    >
                      Почему интересен
                    </div>
                    {presentation.whyDifferent.map((point, index) => (
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
                        <span style={{ color: ringColorVar[proto.ring], marginTop: 1, flexShrink: 0 }}>◆</span>
                        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--tx-2)', lineHeight: 1.55 }}>
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )
        })()}
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
