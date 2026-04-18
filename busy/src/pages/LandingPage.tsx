import { Link } from 'react-router'
import { motion } from 'motion/react'

export default function LandingPage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100dvh - var(--nav-height) - var(--nav-clearance))',
        gap: 'var(--space-8)',
        padding: 'var(--space-7)',
        textAlign: 'center',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)' }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-sm)',
            fontWeight: 600,
            letterSpacing: '0.1em',
            color: 'var(--tx-3)',
          }}
        >
          busy.bar
        </span>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 600,
            color: 'var(--tx)',
            maxWidth: 400,
            lineHeight: 1.3,
            margin: 0,
            textAlign: 'center',
          }}
        >
          Как управлять вниманием.
        </p>
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
        <Link to="/simple" style={{ textDecoration: 'none' }}>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-sm)',
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: 'var(--cy)',
              background: 'var(--cy-bg)',
              border: '1.5px solid var(--cy)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-4) var(--space-7)',
              cursor: 'pointer',
            }}
          >
            SIMPLE
          </motion.button>
        </Link>

        <Link to="/strategy" style={{ textDecoration: 'none' }}>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-sm)',
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: 'var(--tx-2)',
              background: 'transparent',
              border: '1.5px solid var(--border-2)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-4) var(--space-7)',
              cursor: 'pointer',
            }}
          >
            FULL
          </motion.button>
        </Link>
      </div>
    </div>
  )
}
