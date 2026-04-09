import { Page } from '../../chapters'

export const trigonometricPages: Page[] = [
  {
    id: 'sin-cos',
    title: '正弦与余弦',
    config: {
      id: 'sin-cos',
      title: '正弦与余弦函数',
      scene: {
        type: '2d',
        bounds: { xMin: -10, xMax: 10, yMin: -3, yMax: 3 }
      },
      params: { a: 1, b: 0, c: 0 },
      objects: [
        {
          id: 'sin',
          type: 'function',
          expr: 'a * sin(x + b) + c',
          style: { color: '#1677ff', lineWidth: 2 },
          visible: true
        },
        {
          id: 'cos',
          type: 'function',
          expr: 'a * cos(x + b) + c',
          style: { color: '#52c41a', lineWidth: 2 },
          visible: true
        }
      ],
      controls: [
        { param: 'a', type: 'slider', min: 0.1, max: 2, step: 0.1, label: '幅值 (a)' },
        { param: 'b', type: 'slider', min: 0, max: 6.28, step: 0.1, label: '相位 (b)' },
        { param: 'c', type: 'slider', min: -1, max: 1, step: 0.1, label: '偏移 (c)' }
      ]
    }
  },
  {
    id: 'tan',
    title: '正切函数',
    config: {
      id: 'tan',
      title: '正切函数',
      scene: {
        type: '2d',
        bounds: { xMin: -6.28, xMax: 6.28, yMin: -5, yMax: 5 }
      },
      params: { a: 1 },
      objects: [
        {
          id: 'tan',
          type: 'function',
          expr: 'a * tan(x)',
          style: { color: '#fa541c', lineWidth: 2 },
          visible: true
        }
      ],
      controls: [
        { param: 'a', type: 'slider', min: 0.5, max: 2, step: 0.1, label: '幅值 (a)' }
      ]
    }
  }
]
