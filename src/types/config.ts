export interface SceneConfig {
  id: string
  title: string
  scene: {
    type: '2d' | '3d'
    bounds: {
      xMin: number
      xMax: number
      yMin: number
      yMax: number
    }
  }
  params: Record<string, number>
  objects: MathObject[]
  controls: ControlItem[]
}

export interface MathObject {
  id: string
  type: 'function' | 'point' | 'vector' | 'line'
  expr?: string
  data?: unknown
  style: {
    color: string
    lineWidth: number
  }
  visible: boolean
}

export interface ControlItem {
  param: string
  type: 'slider' | 'input'
  min: number
  max: number
  step: number
  label: string
}

export const defaultSceneConfig: SceneConfig = {
  id: 'default',
  title: '函数可视化',
  scene: {
    type: '2d',
    bounds: { xMin: -10, xMax: 10, yMin: -5, yMax: 5 }
  },
  params: {
    a: 1,
    b: 0,
    c: 0
  },
  objects: [
    {
      id: 'func1',
      type: 'function',
      expr: 'a * sin(x + b) + c',
      style: { color: '#1677ff', lineWidth: 2 },
      visible: true
    },
    {
      id: 'func2',
      type: 'function',
      expr: 'a * cos(x + b) + c',
      style: { color: '#52c41a', lineWidth: 2 },
      visible: true
    }
  ],
  controls: [
    { param: 'a', type: 'slider', min: 0.1, max: 3, step: 0.1, label: '幅值 (a)' },
    { param: 'b', type: 'slider', min: 0, max: 6.28, step: 0.1, label: '相位 (b)' },
    { param: 'c', type: 'slider', min: -2, max: 2, step: 0.1, label: '偏移 (c)' }
  ]
}
