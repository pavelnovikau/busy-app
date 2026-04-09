import { motion } from 'motion/react'

const PROGRESS = 0.6
const RADIUS = 50
const STROKE_WIDTH = 8
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function AIFocusMentor() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        width: 320,
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
        padding: 'var(--space-5)',
        background: 'var(--surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-sm)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--ring-3)',
          }}
        >
          AI Focus Mentor
        </span>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-xs)',
            color: 'var(--tx-3)',
          }}
        >
          Focus Session · Pomodoro
        </span>
      </div>

      {/* Timer area */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-2)',
          height: 160,
          justifyContent: 'center',
        }}
      >
        <div style={{ position: 'relative', width: 120, height: 120 }}>
          <svg width={120} height={120} viewBox="0 0 120 120">
            {/* Background circle */}
            <circle
              cx={60}
              cy={60}
              r={RADIUS}
              fill="none"
              stroke="var(--ring-3-dim)"
              strokeWidth={STROKE_WIDTH}
            />
            {/* Progress arc */}
            <motion.circle
              cx={60}
              cy={60}
              r={RADIUS}
              fill="none"
              stroke="var(--ring-3)"
              strokeWidth={STROKE_WIDTH}
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE * (1 - PROGRESS)}
              initial={{ strokeDashoffset: CIRCUMFERENCE }}
              animate={{ strokeDashoffset: CIRCUMFERENCE * (1 - PROGRESS) }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
              style={{
                transform: 'rotate(-90deg)',
                transformOrigin: '50% 50%',
              }}
            />
          </svg>
          {/* Timer overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: 'var(--text-2xl)',
                color: 'var(--ring-3)',
              }}
            >
              24:37
            </span>
          </div>
        </div>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-xs)',
            color: 'var(--tx-3)',
          }}
        >
          Session 3 of 5
        </span>
      </div>

      {/* AI Insights */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {INSIGHTS.map((insight, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.5 + i * 0.12 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              padding: 'var(--space-2) var(--space-3)',
              background: 'var(--surface-2)',
              borderRadius: 'var(--radius-md)',
              borderLeft: `3px solid ${insight.accent}`,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-sm)',
                color: insight.textColor,
              }}
            >
              {insight.text}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Action row */}
      <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
        <button
          style={{
            flex: 1,
            padding: 'var(--space-2) var(--space-3)',
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-sm)',
            fontWeight: 600,
            color: 'var(--tx-2)',
            background: 'transparent',
            border: '1px solid var(--border-2)',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
          }}
        >
          Start Break
        </button>
        <button
          style={{
            flex: 1,
            padding: 'var(--space-2) var(--space-3)',
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-sm)',
            fontWeight: 600,
            color: 'var(--surface)',
            background: 'var(--ring-1)',
            border: '1px solid var(--ring-1)',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
          }}
        >
          End Session
        </button>
      </div>
    </motion.div>
  )
}

const INSIGHTS = [
  {
    text: '✦ Peak window: 9–11am',
    accent: 'var(--color-success)',
    textColor: 'var(--tx)',
  },
  {
    text: '↑ Focus score +12 today',
    accent: 'var(--ring-3)',
    textColor: 'var(--tx)',
  },
  {
    text: 'Next break in 25 min',
    accent: 'var(--tx-3)',
    textColor: 'var(--tx-3)',
  },
]
