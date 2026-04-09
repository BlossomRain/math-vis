import { Page } from '../../chapters'

export const vectorsPages: Page[] = [
  {
    id: 'vector-2d',
    title: '二维向量',
    config: {
      id: 'vector-2d',
      title: '二维向量',
      scene: {
        type: '2d',
        bounds: { xMin: -5, xMax: 5, yMin: -5, yMax: 5 }
      },
      params: { x: 3, y: 2 },
      objects: [],
      controls: [
        { param: 'x', type: 'slider', min: -4, max: 4, step: 0.1, label: 'x 分量' },
        { param: 'y', type: 'slider', min: -4, max: 4, step: 0.1, label: 'y 分量' }
      ]
    }
  }
]
