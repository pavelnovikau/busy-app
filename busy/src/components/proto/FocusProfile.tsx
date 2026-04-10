import { motion } from 'motion/react'

const WEEKLY_DATA = [
  { day: 'Mon', hours: 3.5 },
  { day: 'Tue', hours: 5.2 },
  { day: 'Wed', hours: 4.0 },
  { day: 'Thu', hours: 6.0 },
  { day: 'Fri', hours: 4.3 },
  { day: 'Sat', hours: 1.5 },
  { day: 'Sun', hours: 2.0 },
]

const MAX_BAR_HEIGHT = 28
const TODAY_INDEX = 3 // Thursday

export function FocusProfile() {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{
        width: 320,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-5)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
      }}
    >
      {/* URL bar */}
      <div
        style={{
          background: 'var(--bg-2)',
          borderRadius: 'var(--radius-full)',
          padding: `var(--space-1) var(--space-3)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--tx-3)',
          }}
        >
          busy.app/status/alex
        </span>
      </div>

      {/* Profile section */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-2)',
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 'var(--radius-full)',
            border: '2px solid var(--ring-3)',
            background: 'var(--surface-2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xl)',
              color: 'var(--tx)',
              fontWeight: 600,
            }}
          >
            AK
          </span>
        </div>
        {/* Name */}
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-lg)',
            fontWeight: 700,
            color: 'var(--tx)',
          }}
        >
          Alex Kovalev
        </span>
        {/* Handle */}
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-sm)',
            color: 'var(--tx-3)',
          }}
        >
          @alex.busy
        </span>
      </div>

      {/* Live status badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            background: 'var(--ring-1-dim)',
            borderRadius: 'var(--radius-full)',
            padding: `var(--space-1) var(--space-3)`,
          }}
        >
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              display: 'inline-block',
              width: 8,
              height: 8,
              borderRadius: 'var(--radius-full)',
              background: 'var(--ring-1)',
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-sm)',
              color: 'var(--ring-1)',
              fontWeight: 600,
            }}
          >
            IN DEEP WORK
          </span>
        </div>
      </div>

      {/* Today's stats */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          padding: `var(--space-3) 0`,
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        {[
          { value: '4h 20m', label: 'Focus' },
          { value: '5', label: 'Sessions' },
          { value: '87%', label: 'Score' },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--space-1)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xl)',
                color: 'var(--ring-3)',
                fontWeight: 700,
              }}
            >
              {stat.value}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: 'var(--tx-3)',
                textTransform: 'uppercase',
              }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Weekly bar chart */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: 'var(--space-2)',
          height: MAX_BAR_HEIGHT + 16,
        }}
      >
        {WEEKLY_DATA.map((item, i) => {
          const barHeight = Math.round((item.hours / 6) * MAX_BAR_HEIGHT)
          const isToday = i === TODAY_INDEX
          return (
            <div
              key={item.day}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--space-1)',
                flex: 1,
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: barHeight,
                  borderRadius: 'var(--radius-sm)',
                  background: isToday ? 'var(--ring-1)' : 'var(--ring-3)',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 9,
                  color: isToday ? 'var(--ring-1)' : 'var(--tx-3)',
                  fontWeight: isToday ? 700 : 400,
                }}
              >
                {item.day}
              </span>
            </div>
          )
        })}
      </div>

      {/* Action row */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--space-2)',
        }}
      >
        <button
          style={{
            flex: 1,
            background: 'var(--ring-3)',
            color: 'var(--bg)',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            padding: `var(--space-2) var(--space-3)`,
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-sm)',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Follow Focus
        </button>
        <button
          style={{
            flex: 1,
            background: 'transparent',
            color: 'var(--tx-2)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: `var(--space-2) var(--space-3)`,
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-sm)',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Copy Link
        </button>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center' }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--tx-3)',
          }}
        >
          Updates every 30 seconds
        </span>
      </div>
    </motion.div>
  )
}
