import { motion } from 'motion/react'
import { getInsights } from '@lib/data'

const insights = getInsights()

const ringColorVar: Record<string, string> = {
  r0: 'var(--ring-0)', r1: 'var(--ring-1)', r2: 'var(--ring-2)', r3: 'var(--ring-3)',
}

const ringLabel: Record<string, string> = {
  r0: 'R0', r1: 'R1', r2: 'R2', r3: 'R3',
}

const tagColor: Record<string, string> = {
  done: 'var(--color-success)',
  important: 'var(--color-warning)',
  risk: 'var(--color-danger)',
  new: 'var(--color-info)',
  unique: 'var(--color-primary)',
  segment: 'var(--pu)',
  core: 'var(--sl)',
  moat: 'var(--color-primary)',
}

const sectionLabel: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 11,
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: 'var(--tx-3)',
  marginBottom: 'var(--space-3)',
}

export default function InsightsPage() {
  return (
    <div style={{ textAlign: 'left' }}>
      <div style={{ marginBottom: 'var(--space-6)', textAlign: 'center' }}>
        <h1
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--tx)',
            margin: 0,
          }}
        >
          Инсайты
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-sm)',
            color: 'var(--tx-3)',
            margin: 'var(--space-1) 0 0',
          }}
        >
          что нашли в рисёрче — меняет предположения
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        {[...insights].sort((a, b) => (a.id === 'i-research' ? 1 : b.id === 'i-research' ? -1 : 0)).map((group, gi) => (
          <section key={group.id}>
            <div style={sectionLabel}>{group.heading}</div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: 'var(--space-3)',
              }}
            >
              {group.cards.map((card, ci) => {
                const color = tagColor[card.tag] ?? 'var(--tx-3)'
                return (
                  <motion.div
                    key={ci}
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: gi * 0.1 + ci * 0.05, duration: 0.3 }}
                    style={{
                      padding: 'var(--space-4)',
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        gap: 'var(--space-2)',
                        marginBottom: 'var(--space-2)',
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: 'var(--text-sm)',
                          fontWeight: 600,
                          color: 'var(--tx)',
                          lineHeight: 1.3,
                        }}
                      >
                        {card.title}
                      </div>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 10,
                          fontWeight: 700,
                          color,
                          background: 'var(--surface)',
                          border: `1px solid ${color}`,
                          borderRadius: 'var(--radius-sm)',
                          padding: '1px 5px',
                          whiteSpace: 'nowrap',
                          flexShrink: 0,
                        }}
                      >
                        {card.tagLabel}
                      </span>
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--tx-2)',
                        lineHeight: 1.6,
                      }}
                    >
                      {card.body}
                    </div>

                    {/* Ring ref badges */}
                    {card.ringRefs && card.ringRefs.length > 0 && (
                      <div style={{ display: 'flex', gap: 'var(--space-1)', marginTop: 'var(--space-3)', flexWrap: 'wrap' }}>
                        {card.ringRefs.map((ref) => (
                          <span
                            key={ref}
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: 10,
                              fontWeight: 700,
                              color: ringColorVar[ref] ?? 'var(--tx-3)',
                              border: `1px solid ${ringColorVar[ref] ?? 'var(--border)'}`,
                              borderRadius: 'var(--radius-sm)',
                              padding: '1px 5px',
                              letterSpacing: '0.06em',
                            }}
                          >
                            {ringLabel[ref] ?? ref}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
