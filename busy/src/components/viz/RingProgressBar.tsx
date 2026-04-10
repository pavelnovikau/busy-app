import type { Ring } from '@data/types'

interface Props {
  rings: Ring[]
}

const ringColorVar: Record<string, string> = {
  r0: 'var(--ring-0)',
  r1: 'var(--ring-1)',
  r2: 'var(--ring-2)',
  r3: 'var(--ring-3)',
}

const phaseSublabel: Record<string, string> = {
  r1: '1.0 Auto Presence · 1.9 Focus Memory',
  r2: '2.0 Open Platform · 2.5 Team · AI-Adjacent',
}

export function RingProgressBar({ rings }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        marginTop: 'var(--space-3)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
      }}
    >
      {rings.map((ring, i) => {
        const color = ringColorVar[ring.id] ?? 'var(--tx-3)'
        const sub = phaseSublabel[ring.id]
        return (
          <div
            key={ring.id}
            style={{
              flex: ring.id === 'r0' ? '0 0 auto' : 1,
              padding: '8px 14px',
              borderRight: i < rings.length - 1 ? '1px solid var(--border)' : 'none',
              background: 'var(--surface)',
              minWidth: 100,
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color,
              }}
            >
              Ring {ring.id.replace('r', '')} · {ring.short}
            </div>
            {sub && (
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 9.5,
                  color: 'var(--tx-3)',
                  marginTop: 2,
                  lineHeight: 1.4,
                }}
              >
                {sub}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
