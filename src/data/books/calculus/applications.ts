import { Page } from '../../chapters'

export const applicationsPages: Page[] = [
  {
    id: 'extrema-cubic',
    title: '极值与单调性：三次函数',
    config: {
      id: 'extrema-cubic',
      title: '极值与单调性：三次函数',
      scene: {
        type: '2d',
        bounds: { xMin: -5, xMax: 5, yMin: -12, yMax: 12 }
      },
      params: { a: 1 },
      objects: [
        {
          id: 'f',
          type: 'function',
          expr: 'x^3 - 3 * a * x',
          style: { color: '#1677ff', lineWidth: 2 },
          visible: true
        },
        {
          id: 'df',
          type: 'function',
          expr: '3 * x^2 - 3 * a',
          style: { color: '#fa541c', lineWidth: 2 },
          visible: true
        }
      ],
      controls: [
        { param: 'a', type: 'slider', min: 0.2, max: 3, step: 0.1, label: '形状参数 a' }
      ]
    }
  },
  {
    id: 'curvature-cubic',
    title: '凹凸性：f、f′ 与 f″ 对比',
    config: {
      id: 'curvature-cubic',
      title: '凹凸性：f、f′ 与 f″ 对比',
      scene: {
        type: '2d',
        bounds: { xMin: -4, xMax: 4, yMin: -10, yMax: 10 }
      },
      params: { a: 1 },
      objects: [
        {
          id: 'f',
          type: 'function',
          expr: 'x^3 - 3 * a * x',
          style: { color: '#1677ff', lineWidth: 2 },
          visible: true
        },
        {
          id: 'df',
          type: 'function',
          expr: '3 * x^2 - 3 * a',
          style: { color: '#52c41a', lineWidth: 2 },
          visible: true
        },
        {
          id: 'ddf',
          type: 'function',
          expr: '6 * x',
          style: { color: '#fa541c', lineWidth: 2 },
          visible: true
        }
      ],
      controls: [
        { param: 'a', type: 'slider', min: 0.2, max: 3, step: 0.1, label: '形状参数 a' }
      ]
    }
  },
  {
    id: 'lhopital-sinx',
    title: '洛必达法则：sin(kx)/x',
    config: {
      id: 'lhopital-sinx',
      title: '洛必达法则：sin(kx)/x',
      scene: {
        type: '2d',
        bounds: { xMin: -10, xMax: 10, yMin: -3, yMax: 3 }
      },
      params: { k: 1 },
      objects: [
        {
          id: 'ratio',
          type: 'function',
          expr: 'sin(k * x) / x',
          style: { color: '#1677ff', lineWidth: 2 },
          visible: true
        },
        {
          id: 'limit',
          type: 'function',
          expr: 'k',
          style: { color: '#fa541c', lineWidth: 1.5 },
          visible: true
        }
      ],
      controls: [
        { param: 'k', type: 'slider', min: 0.2, max: 3, step: 0.1, label: '参数 k' }
      ]
    }
  }
]
