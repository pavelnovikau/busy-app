import { Fragment } from 'react'
import { motion } from 'motion/react'

type EnergyLevel = 'high' | 'medium' | 'low' | 'meeting'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] as const
const HOURS = ['8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm'] as const
const TODAY_INDEX = 2 // Wednesday

const energyColors: Record<EnergyLevel, string> = {
  high: 'var(--ring-1)',
  medium: 'var(--ring-0-dim)',
  low: 'var(--ring-3-dim)',
  meeting: 'var(--ring-2)',
}

// Mock energy data: [day][hour] — rows are hours (8am–3pm), cols are days (Mon–Fri)
const grid: EnergyLevel[][] = [
  /* 8am  */ ['medium', 'medium', 'high', 'medium', 'medium'],
  /* 9am  */ ['high', 'high', 'high', 'high', 'medium'],
  /* 10am */ ['high', 'high', 'high', 'meeting', 'high'],
  /* 11am */ ['high', 'meeting', 'medium', 'high', 'high'],
  /* 12pm */ ['low', 'low', 'meeting', 'low', 'low'],
  /* 1pm  */ ['low', 'medium', 'low', 'medium', 'low'],
  /* 2pm  */ ['medium', 'low', 'low', 'meeting', 'medium'],
  /* 3pm  */ ['low', 'low', 'low', 'low', 'low'],
]

const legendItems: { label: string; color: string }[] = [
  { label: 'Peak', color: 'var(--ring-1)' },
  { label: 'Available', color: 'var(--ring-0)' },
  { label: 'Low', color: 'var(--ring-3)' },
  { label: 'Meeting', color: 'var(--ring-2)' },
]

export function EnergyPrediction() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      style={{
        width: 380,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-5)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
      }}
    >
      {/* Header */}
      <div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-sm)',
            fontWeight: 700,
            color: 'var(--tx)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Energy Prediction
        </div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--tx-3)',
            marginTop: 'var(--space-1)',
          }}
        >
          AI-powered · this week
        </div>
      </div>

      {/* Day headers */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '36px repeat(5, 1fr)',
          gap: 'var(--space-1)',
        }}
      >
        {/* Empty cell for row label column */}
        <div />
        {DAYS.map((day, i) => (
          <div
            key={day}
            style={{
              textAlign: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              color: i === TODAY_INDEX ? 'var(--ring-3)' : 'var(--tx-2)',
              padding: 'var(--space-1) 0',
              borderBottom:
                i === TODAY_INDEX
                  ? '2px solid var(--ring-3)'
                  : '2px solid transparent',
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Time-block grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '36px repeat(5, 1fr)',
          gap: 'var(--space-1)',
        }}
      >
        {HOURS.map((hour, rowIdx) => (
          <Fragment key={hour}>
            {/* Row label */}
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: 'var(--tx-3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: 'var(--space-1)',
                height: 24,
              }}
            >
              {hour}
            </div>
            {/* Day cells */}
            {DAYS.map((day, colIdx) => {
              const level = grid[rowIdx][colIdx]
              const isToday = colIdx === TODAY_INDEX
              return (
                <div
                  key={`${hour}-${day}`}
                  style={{
                    height: 24,
                    borderRadius: 'var(--radius-sm)',
                    background: isToday
                      ? 'var(--surface-2)'
                      : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 1,
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 'var(--radius-sm)',
                      background: energyColors[level],
                      opacity: level === 'medium' ? 0.6 : 0.85,
                    }}
                  />
                </div>
              )
            })}
          </Fragment>
        ))}
      </div>

      {/* Legend */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--space-3)',
          flexWrap: 'wrap',
        }}
      >
        {legendItems.map((item) => (
          <div
            key={item.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-1)',
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 'var(--radius-sm)',
                background: item.color,
                opacity: item.label === 'Available' ? 0.6 : 0.85,
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: 'var(--tx-3)',
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Recommendation */}
      <div
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderLeft: '3px solid var(--ring-3)',
          borderRadius: 'var(--radius-sm)',
          padding: 'var(--space-3)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-sm)',
            color: 'var(--tx-2)',
            lineHeight: 1.4,
          }}
        >
          Best time to schedule deep work:{' '}
          <strong style={{ color: 'var(--tx)', fontWeight: 600 }}>
            Tomorrow 9–11am
          </strong>
        </span>
      </div>
    </motion.div>
  )
}
