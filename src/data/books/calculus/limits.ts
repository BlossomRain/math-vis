import { Page } from '../../chapters'

export const limitsPages: Page[] = [
  {
    id: 'sequence-limit',
    title: '数列极限',
    config: {
      id: 'sequence-limit',
      title: '数列极限可视化',
      scene: {
        type: '2d',
        bounds: { xMin: 0, xMax: 50, yMin: 0, yMax: 2 }
      },
      params: { n: 20 },
      objects: [
        {
          id: 'sequence',
          type: 'function',
          expr: '1 + 1/x',
          style: { color: '#1677ff', lineWidth: 2 },
          visible: true
        },
        {
          id: 'limit',
          type: 'function',
          expr: '1',
          style: { color: '#ff4d4f', lineWidth: 1 },
          visible: true
        }
      ],
      controls: [
        { param: 'n', type: 'slider', min: 5, max: 100, step: 1, label: '项数 (n)' }
      ]
    }
  }
]
