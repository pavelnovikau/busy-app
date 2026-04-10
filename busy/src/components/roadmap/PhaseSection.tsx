import { motion } from 'motion/react'
import type { RoadmapPhase } from '@data/types'

interface Props {
  phase: RoadmapPhase
  children?: React.ReactNode
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

export function PhaseSection({ phase, children }: Props) {
  const ringColor = ringColorVar[phase.ring] ?? 'var(--ring-0)'
  const ringDim = ringDimVar[phase.ring] ?? 'var(--ring-0-dim)'
  const ringNum = phase.ring.replace('r', '')

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-6)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-sm)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: ringColor,
          }}
        >
          Ring {ringNum}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-sm)',
            color: 'var(--tx-2)',
          }}
        >
          ·
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-sm)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--tx)',
          }}
        >
          {phase.label}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-sm)',
            color: 'var(--tx-3)',
          }}
        >
          · {phase.horizon}
        </span>
      </div>

      {/* Feature count badge */}
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <span
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            fontWeight: 600,
            color: ringColor,
            background: ringDim,
            padding: '2px 8px',
            borderRadius: 'var(--radius-full)',
          }}
        >
          {phase.prototypeIds.length} prototype{phase.prototypeIds.length !== 1 ? 's' : ''}
        </span>
        {phase.milestones.length > 0 && (
          <span
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--tx-3)',
              marginLeft: 'var(--space-2)',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border)',
            }}
          >
            {phase.milestones.map((m) => m.label).join(', ')}
          </span>
        )}
      </div>

      {/* Prototype slots / children */}
      {children && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          {children}
        </div>
      )}
    </motion.section>
  )
}
