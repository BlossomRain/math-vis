import { Chapter } from '../../chapters'
import { limitsPages } from './limits'
import { derivativesPages } from './derivatives'

export const calculusChapter: Chapter = {
  id: 'calculus',
  title: '第二章：微积分',
  sections: [
    {
      id: 'limits',
      title: '极限',
      pages: limitsPages
    },
    {
      id: 'derivatives',
      title: '导数',
      pages: derivativesPages
    }
  ]
}
