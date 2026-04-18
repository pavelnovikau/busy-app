import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router'
import type { SimpleChapter as SimpleChapterType } from '@data/types'
import SimpleBusyBarMotif from './SimpleBusyBarMotif'

interface Props {
  chapter: SimpleChapterType
  totalChapters: number
  onVisible: (id: string) => void
}

const slideUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.48, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}

const keyStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

export default function SimpleChapter({ chapter, totalChapters, onVisible }: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) onVisible(chapter.id) },
      { threshold: 0.35 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [chapter.id, onVisible])

  const colorVar = `var(${chapter.color})`
  const isLast = chapter.index === totalChapters

  return (
    <section
      id={chapter.id}
      ref={ref}
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'var(--space-9) var(--space-7)',
        maxWidth: 560,
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
      >
        <motion.div variants={slideUp}>
          <SimpleBusyBarMotif
            status={chapter.deviceStatus}
            color={chapter.color}
            index={chapter.index}
            total={totalChapters}
          />
        </motion.div>

        {/* Phase label */}
        {chapter.phase && (
          <motion.div variants={slideUp} style={{ marginBottom: 'var(--space-3)' }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: colorVar,
              opacity: 0.7,
            }}>
              {chapter.phase}
            </span>
          </motion.div>
        )}

        {/* Headline */}
        <motion.h2
          variants={slideUp}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(var(--text-2xl), 5vw, var(--text-3xl))',
            fontWeight: 700,
            color: 'var(--tx)',
            lineHeight: 1.2,
            margin: '0 0 var(--space-5)',
          }}
        >
          {chapter.headline}
        </motion.h2>

        {/* Body */}
        <motion.p
          variants={slideUp}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-lg)',
            color: 'var(--tx-2)',
            lineHeight: 1.65,
            margin: '0 0 var(--space-7)',
          }}
        >
          {chapter.body}
        </motion.p>

        {/* Key points */}
        <motion.ul
          variants={keyStagger}
          style={{
            listStyle: 'none',
            padding: 0,
            margin: chapter.bridge ? '0 0 var(--space-8)' : '0',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)',
          }}
        >
          {chapter.keyPoints.map((point, i) => (
            <motion.li
              key={i}
              variants={slideUp}
              style={{
                display: 'flex',
                gap: 'var(--space-3)',
                alignItems: 'flex-start',
              }}
            >
              <span
                style={{
                  color: colorVar,
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 700,
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                →
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-base)',
                  color: 'var(--tx-2)',
                  lineHeight: 1.55,
                }}
              >
                {point}
              </span>
            </motion.li>
          ))}
        </motion.ul>

        {/* Bridge — visual pause */}
        {chapter.bridge && (
          <motion.div
            variants={slideUp}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 'var(--space-3)',
              paddingTop: 'var(--space-2)',
            }}
          >
            <span
              style={{
                color: colorVar,
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-sm)',
                flexShrink: 0,
                marginTop: 2,
                opacity: 0.7,
              }}
            >
              —
            </span>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-base)',
                fontWeight: 500,
                color: 'var(--tx-2)',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {chapter.bridge}
            </p>
          </motion.div>
        )}

        {/* Last chapter CTA */}
        {isLast && (
          <motion.div variants={slideUp} style={{ marginTop: 'var(--space-10)' }}>
            <Link to="/strategy" style={{ textDecoration: 'none', display: 'block' }}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: '100%',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 600,
                  color: 'var(--tx)',
                  background: 'color-mix(in srgb, var(--or) 12%, var(--bg))',
                  border: '1.5px solid color-mix(in srgb, var(--or) 36%, transparent)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-4) var(--space-7)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'var(--space-2)',
                }}
              >
                Полная версия
                <span style={{ color: 'var(--or)' }}>→</span>
              </motion.button>
            </Link>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
