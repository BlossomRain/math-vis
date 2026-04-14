import { useEffect, useState } from 'react'
import { Page, chapters } from '../data/chapters'
import './Sidebar.css'

interface SidebarProps {
  currentPageId: string
  onPageSelect: (page: Page) => void
}

export default function Sidebar({ currentPageId, onPageSelect }: SidebarProps) {
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(
    new Set([chapters[0].id])
  )
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set([chapters[0].sections[0].id])
  )

  useEffect(() => {
    for (const chapter of chapters) {
      for (const section of chapter.sections) {
        const isCurrentInSection = section.pages.some((page) => page.id === currentPageId)
        if (isCurrentInSection) {
          setExpandedChapters((prev) => {
            if (prev.has(chapter.id)) return prev
            return new Set(prev).add(chapter.id)
          })
          setExpandedSections((prev) => {
            if (prev.has(section.id)) return prev
            return new Set(prev).add(section.id)
          })
          return
        }
      }
    }
  }, [currentPageId])

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => {
      const next = new Set(prev)
      if (next.has(chapterId)) {
        next.delete(chapterId)
      } else {
        next.add(chapterId)
      }
      return next
    })
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev)
      if (next.has(sectionId)) {
        next.delete(sectionId)
      } else {
        next.add(sectionId)
      }
      return next
    })
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>科目 / 章节</h2>
      </div>
      <nav className="sidebar-nav">
        {chapters.map(chapter => (
          <div key={chapter.id} className="chapter">
            <button
              className="chapter-title"
              onClick={() => toggleChapter(chapter.id)}
            >
              <span className={`arrow ${expandedChapters.has(chapter.id) ? 'expanded' : ''}`}>
                ▶
              </span>
              {chapter.title}
            </button>
            {expandedChapters.has(chapter.id) && (
              <div className="sections">
                {chapter.sections.map(section => (
                  <div key={section.id} className="section">
                    <button
                      className="section-title"
                      onClick={() => toggleSection(section.id)}
                    >
                      <span className={`arrow ${expandedSections.has(section.id) ? 'expanded' : ''}`}>
                        ▶
                      </span>
                      {section.title}
                    </button>
                    {expandedSections.has(section.id) && (
                      <div className="pages">
                        {section.pages.map(page => (
                          <button
                            key={page.id}
                            className={`page-link ${currentPageId === page.id ? 'active' : ''}`}
                            onClick={() => onPageSelect(page)}
                          >
                            {page.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  )
}
