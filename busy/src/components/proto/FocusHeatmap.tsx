import { motion } from 'motion/react'

const WEEKS = 52
const DAYS = 7
const CELL_SIZE = 6
const CELL_GAP = 1

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

type CellType = 'empty' | 'deep' | 'meeting' | 'available'

function hash(i: number): number {
  return ((i * 2654435761) >>> 0) % 100
}

function getCellType(i: number): CellType {
  const v = hash(i)
  if (v < 70) return 'empty'
  if (v < 85) return 'deep'
  if (v < 95) return 'meeting'
  return 'available'
}

const cellStyles: Record<CellType, React.CSSProperties> = {
  empty: {
    background: 'var(--bg-2)',
  },
  deep: {
    background: 'var(--ring-1)',
  },
  meeting: {
    background: 'var(--ring-2)',
  },
  available: {
    background: 'var(--surface-2)',
    border: '1px solid var(--border)',
  },
}

const tabs = ['Year', 'Month', 'Week'] as const

const legendItems: { type: CellType; label: string }[] = [
  { type: 'deep', label: 'Deep Work' },
  { type: 'meeting', label: 'Meeting' },
  { type: 'available', label: 'Available' },
  { type: 'empty', label: 'Empty' },
]

export function FocusHeatmap() {
  const grid: CellType[][] = []
  for (let col = 0; col < WEEKS; col++) {
    const week: CellType[] = []
    for (let row = 0; row < DAYS; row++) {
      week.push(getCellType(col * DAYS + row))
    }
    grid.push(week)
  }

  const gridWidth = WEEKS * (CELL_SIZE + CELL_GAP) - CELL_GAP

  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{
        width: 360,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-4)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-sm)',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: 'var(--tx)',
            margin: 0,
            letterSpacing: '0.05em',
          }}
        >
          Focus Heatmap
        </h2>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--tx-2)',
          }}
        >
          847 hrs · 2024
        </span>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--space-4)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        {tabs.map((tab) => (
          <span
            key={tab}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              color: tab === 'Year' ? 'var(--ring-1)' : 'var(--tx-3)',
              paddingBottom: 'var(--space-2)',
              borderBottom: tab === 'Year' ? '2px solid var(--ring-1)' : '2px solid transparent',
              cursor: 'pointer',
            }}
          >
            {tab}
          </span>
        ))}
      </div>

      {/* Month labels */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingRight: 0,
        }}
      >
        {MONTHS.map((m) => (
          <span
            key={m}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              color: 'var(--tx-3)',
              width: gridWidth / 12,
              textAlign: 'left',
            }}
          >
            {m}
          </span>
        ))}
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'flex',
          gap: CELL_GAP,
          overflow: 'hidden',
        }}
      >
        {grid.map((week, col) => (
          <div
            key={col}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: CELL_GAP,
            }}
          >
            {week.map((cellType, row) => (
              <div
                key={row}
                style={{
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                  borderRadius: 2,
                  boxSizing: 'border-box',
                  ...cellStyles[cellType],
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--space-3)',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {legendItems.map(({ type, label }) => (
          <div
            key={type}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-1)',
            }}
          >
            <div
              style={{
                width: CELL_SIZE,
                height: CELL_SIZE,
                borderRadius: 2,
                boxSizing: 'border-box',
                ...cellStyles[type],
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                color: 'var(--tx-3)',
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--space-4)',
          flexWrap: 'wrap',
        }}
      >
        {[
          'Longest streak: 21 days',
          'Best month: Nov',
          'Avg/day: 4.2h',
        ].map((stat) => (
          <span
            key={stat}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--tx-2)',
            }}
          >
            {stat}
          </span>
        ))}
      </div>
    </motion.div>
  )
}
