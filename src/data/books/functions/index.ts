import { Chapter } from '../../chapters'
import { trigonometricPages } from './trigonometric'
import { polynomialPages } from './polynomial'

export const functionsChapter: Chapter = {
  id: 'functions',
  title: '第一章：函数与图像',
  sections: [
    {
      id: 'trigonometric',
      title: '三角函数',
      pages: trigonometricPages
    },
    {
      id: 'polynomial',
      title: '多项式函数',
      pages: polynomialPages
    }
  ]
}
