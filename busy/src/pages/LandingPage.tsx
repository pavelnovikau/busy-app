import { Link } from 'react-router'
import { motion } from 'motion/react'

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.08 } },
}

export default function LandingPage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100dvh',
        padding: 'var(--space-8)',
        textAlign: 'center',
      }}
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-6)',
          maxWidth: 360,
          width: '100%',
        }}
      >
        {/* Brand */}
        <motion.span
          variants={fadeUp}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.16em',
            color: 'var(--tx-3)',
            textTransform: 'uppercase',
          }}
        >
          busy.bar
        </motion.span>

        {/* Hook */}
        <motion.p
          variants={fadeUp}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(var(--text-2xl), 6vw, var(--text-3xl))',
            fontWeight: 700,
            color: 'var(--tx)',
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          Ты был занят весь день.<br />И ничего не сделал.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--space-4)',
            width: '100%',
            marginTop: 'var(--space-2)',
          }}
        >
          <Link to="/simple" style={{ textDecoration: 'none', width: '100%' }}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              style={{
                width: '100%',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-sm)',
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: 'var(--cy)',
                background: 'var(--cy-bg)',
                border: '1.5px solid var(--cy)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-4) var(--space-6)',
                cursor: 'pointer',
              }}
            >
              ЧИТАТЬ ИСТОРИЮ
            </motion.button>
          </Link>

          <Link
            to="/strategy"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.06em',
              color: 'var(--tx-3)',
              textDecoration: 'none',
              transition: 'color 0.15s',
            }}
          >
            полная версия →
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
