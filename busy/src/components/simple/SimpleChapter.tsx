import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import type { SimpleChapter as SimpleChapterType } from '@data/types'

interface Props {
  chapter: SimpleChapterType
  totalChapters: number
  onVisible: (id: string) => void
}

export default function SimpleChapter({ chapter, totalChapters, onVisible }: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) onVisible(chapter.id) },
      { threshold: 0.5 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [chapter.id, onVisible])

  const colorVar = `var(${chapter.color})`
  const colorBg = `color-mix(in srgb, var(${chapter.color}) 12%, var(--bg))`
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
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Chapter label pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            background: colorBg,
            border: `1px solid color-mix(in srgb, var(${chapter.color}) 30%, transparent)`,
            borderRadius: 'var(--radius-full)',
            padding: 'var(--space-1) var(--space-3)',
            marginBottom: 'var(--space-6)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: colorVar,
            }}
          >
            {String(chapter.index).padStart(2, '0')}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.06em',
              color: colorVar,
            }}
          >
            {chapter.name.toUpperCase()}
          </span>
        </div>

        {/* Headline */}
        <h2
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(var(--text-2xl), 5vw, var(--text-3xl))',
            fontWeight: 700,
            color: 'var(--tx)',
            lineHeight: 1.25,
            margin: '0 0 var(--space-5)',
          }}
        >
          {chapter.headline}
        </h2>

        {/* Body */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-lg)',
            color: 'var(--tx-2)',
            lineHeight: 1.65,
            margin: '0 0 var(--space-7)',
          }}
        >
          {chapter.body}
        </p>

        {/* Key points */}
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: '0 0 var(--space-7)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)',
          }}
        >
          {chapter.keyPoints.map((point, i) => (
            <li
              key={i}
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
            </li>
          ))}
        </ul>

        {/* Bridge — "yes, but..." */}
        {chapter.bridge && (
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-sm)',
              fontStyle: 'italic',
              color: 'var(--tx-3)',
              lineHeight: 1.6,
              margin: 0,
              paddingLeft: 'var(--space-5)',
              borderLeft: `2px solid color-mix(in srgb, var(${chapter.color}) 40%, transparent)`,
            }}
          >
            {chapter.bridge}
          </p>
        )}

        {/* Last chapter CTA */}
        {isLast && (
          <div style={{ marginTop: 'var(--space-9)' }}>
            <a href="/strategy" style={{ textDecoration: 'none' }}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 600,
                  color: 'var(--tx)',
                  background: colorBg,
                  border: `1.5px solid color-mix(in srgb, var(${chapter.color}) 40%, transparent)`,
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-4) var(--space-7)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                }}
              >
                Полная версия
                <span style={{ color: colorVar }}>→</span>
              </motion.button>
            </a>
          </div>
        )}
      </motion.div>
    </section>
  )
}
