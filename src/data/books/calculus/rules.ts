import { Page } from '../../chapters'

export const rulesPages: Page[] = [
  {
    id: 'chain-rule-sine',
    title: '链式法则：sin(kx+b) 与导函数',
    config: {
      id: 'chain-rule-sine',
      title: '链式法则：sin(kx+b) 与导函数',
      scene: {
        type: '2d',
        bounds: { xMin: -10, xMax: 10, yMin: -4, yMax: 4 }
      },
      params: { k: 1, b: 0 },
      objects: [
        {
          id: 'f',
          type: 'function',
          expr: 'sin(k * x + b)',
          style: { color: '#1677ff', lineWidth: 2 },
          visible: true
        },
        {
          id: 'df',
          type: 'function',
          expr: 'k * cos(k * x + b)',
          style: { color: '#fa541c', lineWidth: 2 },
          visible: true
        }
      ],
      controls: [
        { param: 'k', type: 'slider', min: 0.5, max: 4, step: 0.1, label: '频率 k' },
        { param: 'b', type: 'slider', min: -3.14, max: 3.14, step: 0.1, label: '相位 b' }
      ]
    }
  },
  {
    id: 'inverse-exp-log',
    title: '反函数：exp 与 log',
    config: {
      id: 'inverse-exp-log',
      title: '反函数：exp 与 log',
      scene: {
        type: '2d',
        bounds: { xMin: -2, xMax: 6, yMin: -2, yMax: 8 }
      },
      params: {},
      objects: [
        {
          id: 'exp',
          type: 'function',
          expr: 'exp(x)',
          style: { color: '#1677ff', lineWidth: 2 },
          visible: true
        },
        {
          id: 'log',
          type: 'function',
          expr: 'log(x)',
          style: { color: '#52c41a', lineWidth: 2 },
          visible: true
        },
        {
          id: 'diag',
          type: 'function',
          expr: 'x',
          style: { color: '#fa541c', lineWidth: 1.5 },
          visible: true
        }
      ],
      controls: []
    }
  }
]
