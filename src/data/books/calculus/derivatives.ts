import { Page } from '../../chapters'

export const derivativesPages: Page[] = [
  {
    id: 'derivative',
    title: '导数：切线与局部线性',
    config: {
      id: 'derivative',
      title: '导数：切线与局部线性',
      scene: {
        type: '2d',
        bounds: { xMin: -5, xMax: 5, yMin: -5, yMax: 5 }
      },
      params: { x0: 1 },
      objects: [
        {
          id: 'func',
          type: 'function',
          expr: 'x^2',
          style: { color: '#1677ff', lineWidth: 2 },
          visible: true
        },
        {
          id: 'tangent',
          type: 'function',
          expr: '2*x0*x - x0^2',
          style: { color: '#fa541c', lineWidth: 2 },
          visible: true
        }
      ],
      controls: [
        { param: 'x0', type: 'slider', min: -3, max: 3, step: 0.1, label: '切点 x₀' }
      ]
    }
  }
]
