import { motion } from 'motion/react'

interface Props {
  prototypeId: string
  title: string
  ring: string
  PreviewComponent?: React.ComponentType
}

const ringColorVar: Record<string, string> = {
  r0: 'var(--ring-0)',
  r1: 'var(--ring-1)',
  r2: 'var(--ring-2)',
  r3: 'var(--ring-3)',
}

const ringDimVar: Record<string, string> = {
  r0: 'var(--ring-0-dim)',
  r1: 'var(--ring-1-dim)',
  r2: 'var(--ring-2-dim)',
  r3: 'var(--ring-3-dim)',
}

const SLOT_W = 300
const SLOT_H = 200
const SCALE = 0.48

export function PrototypeSlot({ prototypeId, title, ring, PreviewComponent }: Props) {
  const ringColor = ringColorVar[ring] ?? 'var(--ring-0)'
  const ringDim = ringDimVar[ring] ?? 'var(--ring-0-dim)'
  const ringNum = ring.replace('r', '')

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{ scale: 1.02 }}
      data-prototype-id={prototypeId}
      style={{
        width: SLOT_W,
        borderRadius: 'var(--radius-lg)',
        border: PreviewComponent ? `1px solid var(--border)` : `2px dashed var(--border-2)`,
        overflow: 'hidden',
        background: 'var(--surface-2)',
      }}
    >
      {PreviewComponent ? (
        /* Scaled live thumbnail */
        <div
          style={{
            height: SLOT_H,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div
            style={{
              transform: `scale(${SCALE})`,
              transformOrigin: 'top left',
              width: `${Math.round(SLOT_W / SCALE)}px`,
              pointerEvents: 'none',
            }}
          >
            <PreviewComponent />
          </div>
          {/* Ring badge overlay */}
          <div
            style={{
              position: 'absolute',
              bottom: 'var(--space-2)',
              right: 'var(--space-2)',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              color: ringColor,
              background: ringDim,
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
            }}
          >
            Ring {ringNum}
          </div>
        </div>
      ) : (
        /* Placeholder */
        <div
          style={{
            height: SLOT_H,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 'var(--space-2)',
          }}
        >
          <span style={{ color: ringColor, fontSize: 'var(--text-xl)' }}>◎</span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-sm)',
              fontWeight: 700,
              color: 'var(--tx)',
            }}
          >
            {title}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--tx-3)',
            }}
          >
            Ring {ringNum}
          </span>
          <span
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              color: ringColor,
              background: ringDim,
              padding: '2px 10px',
              borderRadius: 'var(--radius-full)',
              marginTop: 'var(--space-1)',
            }}
          >
            Coming in Phase 3
          </span>
        </div>
      )}

      {/* Title strip */}
      <div
        style={{
          padding: 'var(--space-2) var(--space-3)',
          borderTop: '1px solid var(--border)',
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          fontWeight: 600,
          color: 'var(--tx-2)',
        }}
      >
        {title}
      </div>
    </motion.div>
  )
}
