import { AnimatePresence, motion } from 'motion/react'
import type { SimpleChapter } from '@data/types'

interface Props {
  chapters: SimpleChapter[]
  activeChapterId: string
  isOpen: boolean
  onClose: () => void
  onChapterSelect: (id: string) => void
}

export default function SimpleTOC({ chapters, activeChapterId, isOpen, onClose, onChapterSelect }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
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
              background: 'color-mix(in srgb, var(--bg) 50%, transparent)',
              backdropFilter: 'blur(6px)',
              zIndex: 40,
            }}
          />

          {/* Sheet */}
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
              paddingBottom: 'env(safe-area-inset-bottom, 0px)',
            }}
          >
            {/* Handle */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                paddingTop: 'var(--space-3)',
                paddingBottom: 'var(--space-2)',
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 3,
                  borderRadius: 2,
                  background: 'var(--border-2)',
                }}
              />
            </div>

            {/* Label */}
            <div
              style={{
                padding: 'var(--space-3) var(--space-6) var(--space-4)',
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.12em',
                color: 'var(--tx-3)',
                textTransform: 'uppercase',
              }}
            >
              Содержание
            </div>

            {/* Chapter list */}
            <ul
              style={{
                listStyle: 'none',
                padding: '0 var(--space-3)',
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {chapters.map((chapter) => {
                const isActive = chapter.id === activeChapterId
                return (
                  <li key={chapter.id}>
                    <button
                      onClick={() => {
                        onChapterSelect(chapter.id)
                        onClose()
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: 'var(--space-4)',
                        width: '100%',
                        background: 'none',
                        border: 'none',
                        borderRadius: 'var(--radius-md)',
                        padding: 'var(--space-3) var(--space-3)',
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 10,
                          fontWeight: 600,
                          color: isActive ? `var(${chapter.color})` : 'var(--tx-3)',
                          letterSpacing: '0.08em',
                          minWidth: 20,
                          flexShrink: 0,
                          transition: 'color 0.15s',
                        }}
                      >
                        {String(chapter.index).padStart(2, '0')}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: 'var(--text-base)',
                          fontWeight: isActive ? 600 : 400,
                          color: isActive ? `var(${chapter.color})` : 'var(--tx-2)',
                          lineHeight: 1.35,
                          transition: 'color 0.15s',
                        }}
                      >
                        {chapter.headline}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>

            <div style={{ height: 'calc(56px + env(safe-area-inset-bottom, 0px))' }} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
