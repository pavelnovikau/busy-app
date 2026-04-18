import { AlignJustify } from 'lucide-react'
import type { SimpleChapter } from '@data/types'

interface Props {
  chapters: SimpleChapter[]
  activeChapterId: string
  onTocOpen: () => void
  onNext: () => void
}

export default function SimpleBottomBar({ chapters, activeChapterId, onTocOpen, onNext }: Props) {
  const active = chapters.find((c) => c.id === activeChapterId) ?? chapters[0]
  const isLast = active.index === chapters.length
  const colorVar = `var(${active.color})`

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 56,
        display: 'flex',
        alignItems: 'center',
        padding: '0 var(--space-5)',
        background: 'color-mix(in srgb, var(--bg) 85%, transparent)',
        backdropFilter: 'blur(20px) saturate(1.2)',
        borderTop: '1px solid var(--border)',
        zIndex: 30,
      }}
    >
      {/* TOC trigger */}
      <button
        onClick={onTocOpen}
        aria-label="Открыть оглавление"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--tx-3)',
          padding: 'var(--space-2)',
          borderRadius: 'var(--radius-md)',
          flexShrink: 0,
          transition: 'color 0.15s',
        }}
      >
        <AlignJustify size={15} strokeWidth={1.75} />
      </button>

      {/* Chapter indicator — centered */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-2)',
          overflow: 'hidden',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            fontWeight: 600,
            color: colorVar,
            letterSpacing: '0.08em',
            flexShrink: 0,
          }}
        >
          {String(active.index).padStart(2, '0')}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-sm)',
            fontWeight: 500,
            color: 'var(--tx-2)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {active.name}
        </span>
      </div>

      {/* Next arrow */}
      <button
        onClick={isLast ? undefined : onNext}
        disabled={isLast}
        aria-label="Следующая глава"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: 'none',
          border: 'none',
          cursor: isLast ? 'default' : 'pointer',
          padding: 'var(--space-2)',
          borderRadius: 'var(--radius-md)',
          flexShrink: 0,
          opacity: isLast ? 0.25 : 1,
          transition: 'opacity 0.2s',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--tx-3)',
            letterSpacing: '0.05em',
          }}
        >
          {active.index}/{chapters.length}
        </span>
        <span
          style={{
            color: colorVar,
            fontSize: 16,
            lineHeight: 1,
            fontWeight: 300,
          }}
        >
          →
        </span>
      </button>
    </div>
  )
}
