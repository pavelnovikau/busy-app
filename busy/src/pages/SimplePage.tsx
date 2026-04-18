import { useState, useCallback } from 'react'
import { getSimpleStory } from '@lib/data'
import SimpleChapter from '@components/simple/SimpleChapter'
import SimpleBottomBar from '@components/simple/SimpleBottomBar'
import SimpleTOC from '@components/simple/SimpleTOC'

const chapters = getSimpleStory()

export default function SimplePage() {
  const [activeChapterId, setActiveChapterId] = useState(chapters[0].id)
  const [tocOpen, setTocOpen] = useState(false)

  const activeChapter = chapters.find((c) => c.id === activeChapterId) ?? chapters[0]

  const handleVisible = useCallback((id: string) => {
    setActiveChapterId(id)
  }, [])

  const handleChapterSelect = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setActiveChapterId(id)
  }, [])

  const handleNext = useCallback(() => {
    const idx = chapters.findIndex((c) => c.id === activeChapterId)
    const next = chapters[idx + 1]
    if (next) document.getElementById(next.id)?.scrollIntoView({ behavior: 'smooth' })
  }, [activeChapterId])

  return (
    <>
      {/* Background micro-tint — transitions with active chapter color */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: `color-mix(in srgb, var(${activeChapter.color}) 5%, var(--bg))`,
          transition: 'background 0.7s ease',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, paddingBottom: 56 }}>
        {chapters.map((chapter) => (
          <SimpleChapter
            key={chapter.id}
            chapter={chapter}
            totalChapters={chapters.length}
            onVisible={handleVisible}
          />
        ))}
      </div>

      <SimpleBottomBar
        chapters={chapters}
        activeChapterId={activeChapterId}
        onTocOpen={() => setTocOpen(true)}
        onNext={handleNext}
      />

      <SimpleTOC
        chapters={chapters}
        activeChapterId={activeChapterId}
        isOpen={tocOpen}
        onClose={() => setTocOpen(false)}
        onChapterSelect={handleChapterSelect}
      />
    </>
  )
}
