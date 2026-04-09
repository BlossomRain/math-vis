import { Page } from '../../chapters'

export const polynomialPages: Page[] = [
  {
    id: 'quadratic',
    title: '二次函数',
    config: {
      id: 'quadratic',
      title: '二次函数 y = ax² + bx + c',
      scene: {
        type: '2d',
        bounds: { xMin: -10, xMax: 10, yMin: -10, yMax: 10 }
      },
      params: { a: 1, b: 0, c: 0 },
      objects: [
        {
          id: 'parabola',
          type: 'function',
          expr: 'a * x^2 + b * x + c',
          style: { color: '#722ed1', lineWidth: 2 },
          visible: true
        }
      ],
      controls: [
        { param: 'a', type: 'slider', min: -2, max: 2, step: 0.1, label: 'a (开口)' },
        { param: 'b', type: 'slider', min: -5, max: 5, step: 0.1, label: 'b (对称轴)' },
        { param: 'c', type: 'slider', min: -5, max: 5, step: 0.1, label: 'c (截距)' }
      ]
    }
  }
]
