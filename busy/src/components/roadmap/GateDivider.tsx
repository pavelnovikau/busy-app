import { motion } from 'motion/react'

interface Props {
  gate: string
  fromRing: string
  toRing: string
}

const ringColorVar: Record<string, string> = {
  r0: 'var(--ring-0)',
  r1: 'var(--ring-1)',
  r2: 'var(--ring-2)',
  r3: 'var(--ring-3)',
}

export function GateDivider({ gate, toRing }: Props) {
  const color = ringColorVar[toRing] ?? 'var(--ring-0)'

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        padding: 'var(--space-4) 0',
      }}
    >
      {/* Left line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{
          flex: 1,
          height: 1,
          background: 'var(--border-2)',
          transformOrigin: 'right',
        }}
      />

      {/* Diamond + gate text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.2 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          flexShrink: 0,
        }}
      >
        <span style={{ color, fontSize: 'var(--text-base)' }}>◆</span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-sm)',
            color: 'var(--tx-2)',
            whiteSpace: 'nowrap',
          }}
        >
          {gate}
        </span>
      </motion.div>

      {/* Right line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{
          flex: 1,
          height: 1,
          background: 'var(--border-2)',
          transformOrigin: 'left',
        }}
      />
    </div>
  )
}
