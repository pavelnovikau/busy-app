import { motion } from 'motion/react'

interface TeamMember {
  initials: string
  name: string
  status: string
  statusColor: string
  duration?: string
}

const members: TeamMember[] = [
  { initials: 'AK', name: 'Alex K.', status: 'Deep work', statusColor: 'var(--ring-1)', duration: '47 min' },
  { initials: 'MR', name: 'Maria R.', status: 'Deep work', statusColor: 'var(--ring-1)', duration: '1h 12m' },
  { initials: 'DS', name: 'Dave S.', status: 'Deep work', statusColor: 'var(--ring-1)', duration: '23 min' },
  { initials: 'JP', name: 'Julia P.', status: 'Available', statusColor: 'var(--color-success)' },
  { initials: 'TL', name: 'Tom L.', status: 'In meeting', statusColor: 'var(--ring-2)' },
]

const counters = [
  { label: 'Deep Work', count: 3, color: 'var(--ring-1)' },
  { label: 'Available', count: 2, color: 'var(--color-success)' },
  { label: 'Meeting', count: 1, color: 'var(--ring-2)' },
]

function FocusWave() {
  const width = 340
  const height = 40
  const bumps = 5
  const points: string[] = []

  for (let x = 0; x <= width; x += 2) {
    const y = height / 2 + Math.sin((x / width) * bumps * Math.PI * 2) * 12
    points.push(`${x},${y}`)
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ display: 'block' }}
    >
      <polyline
        points={points.join(' ')}
        fill="none"
        stroke="var(--ring-2)"
        strokeWidth={2}
        opacity={0.25}
      />
      <polyline
        points={points.join(' ')}
        fill="none"
        stroke="var(--ring-2)"
        strokeWidth={6}
        opacity={0.08}
        strokeLinecap="round"
      />
    </svg>
  )
}

export function TeamFlowDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
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
      <div>
        <h2
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-sm)',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: 'var(--ring-2)',
            margin: 0,
            letterSpacing: '0.05em',
          }}
        >
          Team Flow
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-xs)',
            color: 'var(--tx-2)',
            margin: 0,
            marginTop: 'var(--space-1)',
          }}
        >
          3 people deep-focused right now
        </p>
      </div>

      {/* Status summary bar */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--space-4)',
          alignItems: 'center',
        }}
      >
        {counters.map(({ label, count, color }) => (
          <span
            key={label}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--tx-2)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-1)',
            }}
          >
            <span style={{ color, fontSize: 'var(--text-base)' }}>●</span>
            {count} {label}
          </span>
        ))}
      </div>

      {/* Team member list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
        {members.map((member, index) => (
          <motion.div
            key={member.initials}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut', delay: index * 0.08 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              padding: 'var(--space-2) var(--space-3)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            {/* Status dot */}
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 'var(--radius-full)',
                background: member.statusColor,
                flexShrink: 0,
              }}
            />
            {/* Initials avatar */}
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 'var(--radius-full)',
                background: 'var(--surface-2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                color: 'var(--tx-2)',
                flexShrink: 0,
              }}
            >
              {member.initials}
            </div>
            {/* Name */}
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-sm)',
                color: 'var(--tx)',
                flex: 1,
              }}
            >
              {member.name}
            </span>
            {/* Status label */}
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: 'var(--tx-3)',
                flexShrink: 0,
              }}
            >
              {member.duration ? `${member.status} · ${member.duration}` : member.status}
            </span>
          </motion.div>
        ))}

        {/* Privacy note */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-xs)',
            color: 'var(--tx-3)',
            margin: 0,
            marginTop: 'var(--space-1)',
            paddingLeft: 'var(--space-3)',
          }}
        >
          Only status shown — no activity details
        </p>
      </div>

      {/* Focus wave */}
      <FocusWave />

      {/* Footer */}
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          color: 'var(--tx-3)',
        }}
      >
        Refresh · 2 min ago
      </div>
    </motion.div>
  )
}
