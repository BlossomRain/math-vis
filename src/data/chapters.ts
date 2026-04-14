import { SceneConfig } from '../types/config'
import type { GeometryLabPageModel, PageTemplateType } from '../core/model'
import { calculusChapter } from './books/calculus'

export interface Page {
  id: string
  title: string
  config?: SceneConfig
  template?: PageTemplateType
  pageModel?: GeometryLabPageModel
}

export interface Section {
  id: string
  title: string
  pages: Page[]
}

export interface Chapter {
  id: string
  title: string
  icon?: string
  sections: Section[]
}

// 聚合所有科目
export const chapters: Chapter[] = [
  calculusChapter
]

export function findPageById(pageId: string): Page | undefined {
  for (const chapter of chapters) {
    for (const section of chapter.sections) {
      const page = section.pages.find(p => p.id === pageId)
      if (page) return page
    }
  }
  return undefined
}

export function getFirstPage(): Page {
  return chapters[0].sections[0].pages[0]
}
