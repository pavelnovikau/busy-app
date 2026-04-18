import { useState, useCallback } from 'react'
import { getSimpleStory } from '@lib/data'
import SimpleChapter from '@components/simple/SimpleChapter'
import SimpleBottomBar from '@components/simple/SimpleBottomBar'
import SimpleTOC from '@components/simple/SimpleTOC'

const chapters = getSimpleStory()

export default function SimplePage() {
  const [activeChapterId, setActiveChapterId] = useState(chapters[0].id)
  const [tocOpen, setTocOpen] = useState(false)

  const handleVisible = useCallback((id: string) => {
    setActiveChapterId(id)
  }, [])

  const handleChapterSelect = useCallback((id: string) => {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth' })
    setActiveChapterId(id)
  }, [])

  const handleNext = useCallback(() => {
    const activeIndex = chapters.findIndex((c) => c.id === activeChapterId)
    const next = chapters[activeIndex + 1]
    if (next) {
      document.getElementById(next.id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [activeChapterId])

  return (
    <>
      <div style={{ paddingBottom: 'calc(var(--nav-height) + 48px)' }}>
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
