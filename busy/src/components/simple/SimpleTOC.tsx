import { AnimatePresence, motion } from 'motion/react'
import { Link } from 'react-router'
import type { SimpleChapter } from '@data/types'
import { useTheme } from '@lib/ThemeContext'

interface Props {
  chapters: SimpleChapter[]
  activeChapterId: string
  isOpen: boolean
  onClose: () => void
  onChapterSelect: (id: string) => void
}

export default function SimpleTOC({ chapters, activeChapterId, isOpen, onClose, onChapterSelect }: Props) {
  const { theme, toggleTheme } = useTheme()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'color-mix(in srgb, var(--bg) 55%, transparent)',
              backdropFilter: 'blur(6px)',
              zIndex: 40,
            }}
          />

          <motion.div
            key="sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 45,
              background: 'var(--bg)',
              borderTop: '1px solid var(--border)',
              borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
            }}
          >
            {/* Handle */}
            <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--space-3) 0 var(--space-1)' }}>
              <div style={{ width: 32, height: 3, borderRadius: 2, background: 'var(--border-2)' }} />
            </div>

            {/* Label */}
            <div style={{
              padding: 'var(--space-2) var(--space-6) var(--space-3)',
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.14em',
              color: 'var(--tx-3)',
              textTransform: 'uppercase',
            }}>
              Содержание
            </div>

            {/* Chapter list */}
            <ul style={{ listStyle: 'none', padding: '0 var(--space-2)', margin: 0 }}>
              {chapters.map((chapter, i) => {
                const isActive = chapter.id === activeChapterId
                const isLast = i === chapters.length - 1
                return (
                  <li key={chapter.id} style={{ borderBottom: isLast ? 'none' : '1px solid var(--border)' }}>
                    <button
                      onClick={() => { onChapterSelect(chapter.id); onClose() }}
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: 'var(--space-4)',
                        width: '100%',
                        background: 'none',
                        border: 'none',
                        borderRadius: 'var(--radius-md)',
                        padding: 'var(--space-3) var(--space-4)',
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 10,
                        fontWeight: 600,
                        color: isActive ? `var(${chapter.color})` : 'var(--tx-3)',
                        letterSpacing: '0.08em',
                        minWidth: 20,
                        flexShrink: 0,
                        transition: 'color 0.15s',
                      }}>
                        {String(chapter.index).padStart(2, '0')}
                      </span>
                      <span style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? `var(${chapters[i].color})` : 'var(--tx-2)',
                        lineHeight: 1.4,
                        transition: 'color 0.15s',
                      }}>
                        {chapter.headline}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>

            {/* Footer */}
            <div style={{
              borderTop: '1px solid var(--border)',
              padding: 'var(--space-4) var(--space-5)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
            }}>
              {/* Row: back + theme */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link
                  to="/"
                  onClick={onClose}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    letterSpacing: '0.06em',
                    color: 'var(--tx-3)',
                    textDecoration: 'none',
                  }}
                >
                  ← выбор версии
                </Link>
                <button
                  onClick={toggleTheme}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    background: 'color-mix(in srgb, var(--surface) 72%, var(--bg))',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '3px 8px',
                    cursor: 'pointer',
                    color: 'var(--tx-2)',
                  }}
                >
                  {theme === 'dark' ? 'LIGHT' : 'DARK'}
                </button>
              </div>

              {/* Full version CTA */}
              <Link
                to="/strategy"
                style={{ textDecoration: 'none', display: 'block' }}
                onClick={onClose}
              >
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: '100%',
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    color: 'var(--tx)',
                    background: 'color-mix(in srgb, var(--sl) 10%, var(--bg))',
                    border: '1.5px solid color-mix(in srgb, var(--sl) 30%, transparent)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-3) var(--space-5)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 'var(--space-2)',
                  }}
                >
                  Полная версия
                  <span style={{ color: 'var(--sl)' }}>→</span>
                </motion.button>
              </Link>
            </div>

            <div style={{ height: 'env(safe-area-inset-bottom, 0px)' }} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
