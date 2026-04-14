import { Chapter } from '../../chapters'
import { preliminariesPages } from './preliminaries'
import { limitsPages } from './limits'
import { continuityPages } from './continuity'
import { derivativesPages } from './derivatives'
import { rulesPages } from './rules'
import { applicationsPages } from './applications'

export const calculusChapter: Chapter = {
  id: 'calculus',
  title: '微积分',
  sections: [
    {
      id: 'preliminaries',
      title: '0 预备知识',
      pages: preliminariesPages
    },
    {
      id: 'limits',
      title: '1 极限',
      pages: limitsPages
    },
    {
      id: 'continuity',
      title: '1 连续与渐近线',
      pages: continuityPages
    },
    {
      id: 'derivatives',
      title: '1 导数',
      pages: derivativesPages
    },
    {
      id: 'rules',
      title: '2 求导法则与反函数',
      pages: rulesPages
    },
    {
      id: 'applications',
      title: '3 函数应用',
      pages: applicationsPages
    }
  ]
}
