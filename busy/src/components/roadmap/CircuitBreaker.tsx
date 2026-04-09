import { motion } from 'motion/react'

interface Props {
  text: string
}

export function CircuitBreaker({ text }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 'var(--space-3)',
        padding: 'var(--space-3) var(--space-4)',
        background: 'oklch(0.58 0.18 70 / 0.10)',
        borderLeft: '3px solid var(--color-warning)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <span
        style={{
          color: 'var(--color-warning)',
          fontSize: 'var(--text-base)',
          lineHeight: 1,
          flexShrink: 0,
        }}
      >
        ⚠
      </span>
      <span
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-sm)',
          color: 'var(--tx-2)',
          lineHeight: 1.5,
        }}
      >
        {text}
      </span>
    </motion.div>
  )
}
