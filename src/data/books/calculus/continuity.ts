import { Page } from '../../chapters'

export const continuityPages: Page[] = [
  {
    id: 'removable-discontinuity',
    title: '可去间断：原式与补全',
    config: {
      id: 'removable-discontinuity',
      title: '可去间断：原式与补全',
      scene: {
        type: '2d',
        bounds: { xMin: -6, xMax: 6, yMin: -2, yMax: 6 }
      },
      params: {},
      objects: [
        {
          id: 'raw',
          type: 'function',
          expr: '(x^2 - 1) / (x - 1)',
          style: { color: '#1677ff', lineWidth: 2 },
          visible: true
        },
        {
          id: 'filled',
          type: 'function',
          expr: 'x + 1',
          style: { color: '#fa541c', lineWidth: 2 },
          visible: true
        }
      ],
      controls: []
    }
  },
  {
    id: 'asymptote-rational',
    title: '有理函数：渐近线观察',
    config: {
      id: 'asymptote-rational',
      title: '有理函数：渐近线观察',
      scene: {
        type: '2d',
        bounds: { xMin: -10, xMax: 10, yMin: -10, yMax: 10 }
      },
      params: { a: 1, b: 0 },
      objects: [
        {
          id: 'rational',
          type: 'function',
          expr: '1 / (x - a) + b',
          style: { color: '#1677ff', lineWidth: 2 },
          visible: true
        },
        {
          id: 'horizontal',
          type: 'function',
          expr: 'b',
          style: { color: '#52c41a', lineWidth: 1.5 },
          visible: true
        }
      ],
      controls: [
        { param: 'a', type: 'slider', min: -4, max: 4, step: 0.1, label: '极点位置 a' },
        { param: 'b', type: 'slider', min: -4, max: 4, step: 0.1, label: '水平渐近线 b' }
      ]
    }
  }
]
