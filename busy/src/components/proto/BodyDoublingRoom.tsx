import { motion } from 'motion/react'

const PROGRESS = 0.75
const RADIUS = 60
const STROKE_WIDTH = 8
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

const PARTICIPANTS = [
  { initials: 'MK', bgVar: '--ring-1-dim', borderVar: '--ring-1' },
  { initials: 'AR', bgVar: '--ring-3-dim', borderVar: '--ring-3', isYou: true },
  { initials: 'TH', bgVar: '--ring-2-dim', borderVar: '--ring-2' },
]

const GOALS = [
  { icon: '📝', text: 'Writing report', person: 'MK', time: '1h left' },
  { icon: '💻', text: 'Deep code review', person: 'AR', time: '45 min' },
]

export function BodyDoublingRoom() {
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
          Body Doubling Room
        </span>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-xs)',
            color: 'var(--tx-3)',
          }}
        >
          Focus Together · Session #42
        </span>
      </div>

      {/* Participants */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-2)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          {PARTICIPANTS.map((p, i) => (
            <motion.div
              key={p.initials}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: 0.2 + i * 0.1 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--space-1)',
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 'var(--radius-full)',
                  background: `var(${p.bgVar})`,
                  border: `2px solid var(${p.borderVar})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 700,
                    color: `var(${p.borderVar})`,
                  }}
                >
                  {p.initials}
                </span>
              </div>
              {p.isYou && (
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--tx-3)',
                  }}
                >
                  You
                </span>
              )}
            </motion.div>
          ))}
        </div>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-sm)',
            color: 'var(--tx-2)',
          }}
        >
          3 people focusing together
        </span>
      </div>

      {/* Shared timer */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-2)',
        }}
      >
        <div style={{ position: 'relative', width: 140, height: 140 }}>
          <svg width={140} height={140} viewBox="0 0 140 140">
            <circle
              cx={70}
              cy={70}
              r={RADIUS}
              fill="none"
              stroke="var(--ring-3-dim)"
              strokeWidth={STROKE_WIDTH}
            />
            <motion.circle
              cx={70}
              cy={70}
              r={RADIUS}
              fill="none"
              stroke="var(--ring-3)"
              strokeWidth={STROKE_WIDTH}
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              initial={{ strokeDashoffset: CIRCUMFERENCE }}
              animate={{ strokeDashoffset: CIRCUMFERENCE * (1 - PROGRESS) }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
              style={{
                transform: 'rotate(-90deg)',
                transformOrigin: '50% 50%',
              }}
            />
          </svg>
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
              45:22
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
          75% complete
        </span>
      </div>

      {/* Goal cards */}
      <div style={{ display: 'flex', gap: 'var(--space-2)', overflow: 'hidden' }}>
        {GOALS.map((goal, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.6 + i * 0.1 }}
            style={{
              flex: 1,
              minWidth: 0,
              padding: 'var(--space-2) var(--space-3)',
              background: 'var(--surface-2)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-xs)',
                color: 'var(--tx-2)',
                display: 'block',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {goal.icon} {goal.text} — {goal.person} · {goal.time}
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
            color: 'var(--tx-3)',
            background: 'transparent',
            border: '1px solid var(--border-2)',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
          }}
        >
          Leave Room
        </button>
        <button
          style={{
            flex: 1,
            padding: 'var(--space-2) var(--space-3)',
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-sm)',
            fontWeight: 600,
            color: 'var(--tx)',
            background: 'var(--ring-3)',
            border: '1px solid var(--ring-3)',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
          }}
        >
          Join New Room
        </button>
      </div>

      {/* Footer status */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-1)',
          justifyContent: 'center',
        }}
      >
        <span style={{ color: 'var(--color-success)', fontSize: 'var(--text-xs)' }}>●</span>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-xs)',
            color: 'var(--tx-3)',
          }}
        >
          Room active · Quiet mode
        </span>
      </div>
    </motion.div>
  )
}
