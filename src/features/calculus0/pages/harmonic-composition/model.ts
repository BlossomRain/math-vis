import { GeometryLabPageModel } from '../../../../core/model'

export const harmonicCompositionModel: GeometryLabPageModel = {
  id: 'harmonic-composition',
  title: '叠合公式：a cos x + b sin x',
  template: 'geometry-lab',
  bounds: { xMin: -10, xMax: 10, yMin: -6, yMax: 6 },
  params: { a: 2, b: 1.2, x0: 0 },
  controls: [
    { param: 'a', type: 'slider', min: -4, max: 4, step: 0.1, label: '参数 a' },
    { param: 'b', type: 'slider', min: -4, max: 4, step: 0.1, label: '参数 b' },
    { param: 'x0', type: 'slider', min: -6.28, max: 6.28, step: 0.01, label: '观察点 x0' }
  ],
  userFunctionLayers: [
    { id: 'component-cos', expr: 'a * cos(x)', color: '#1677ff', lineWidth: 2, visible: true, editable: false },
    { id: 'component-sin', expr: 'b * sin(x)', color: '#fa8c16', lineWidth: 2, visible: true, editable: false },
    { id: 'sum', expr: 'a * cos(x) + b * sin(x)', color: '#13a36b', lineWidth: 2.8, visible: true, editable: false },
    {
      id: 'equivalent',
      expr: 'sqrt(a^2 + b^2) * sin(x + atan2(a, b))',
      color: '#722ed1',
      lineWidth: 1.8,
      visible: false,
      editable: false
    }
  ],
  legendItems: [
    { id: 'component-cos', label: 'a cos x', kind: 'curve', color: '#1677ff', objectId: 'component-cos' },
    { id: 'component-sin', label: 'b sin x', kind: 'curve', color: '#fa8c16', objectId: 'component-sin' },
    { id: 'sum', label: 'a cos x + b sin x', kind: 'curve', color: '#13a36b', objectId: 'sum' },
    { id: 'equivalent', label: 'R sin(x + phi)', kind: 'curve', color: '#722ed1', objectId: 'equivalent' }
  ],
  formulaDock: {
    formulas: [
      { id: 'target', title: '目标公式', latex: 'a\\cos x+b\\sin x=R\\sin(x+\\varphi)' },
      {
        id: 'params',
        title: '参数关系',
        latex: '\\begin{aligned}R&=\\sqrt{a^2+b^2}\\\\\\varphi&=\\operatorname{atan2}(a,b)\\end{aligned}'
      }
    ],
    derivations: [
      { id: 'step-1', title: '展开右侧', latex: 'R\\sin(x+\\varphi)=R\\sin x\\cos\\varphi+R\\cos x\\sin\\varphi' },
      { id: 'step-2', title: '比较系数', latex: '\\begin{aligned}R\\sin\\varphi&=a\\\\R\\cos\\varphi&=b\\end{aligned}' },
      { id: 'step-3', title: '合成结果', latex: 'a\\cos x+b\\sin x=\\sqrt{a^2+b^2}\\sin(x+\\operatorname{atan2}(a,b))' }
    ],
    insights: [
      {
        id: 'insight-1',
        title: '观察重点',
        latex: 'P(x_0)=a\\cos x_0+b\\sin x_0',
        note: '先看蓝色与橙色两个分量，再观察绿色和函数如何由它们叠加得到。'
      }
    ]
  },
  geometryLayers: [
    {
      id: 'sample-line',
      type: 'line',
      visible: true,
      style: { color: '#722ed1', lineWidth: 1.5, dashed: true },
      data: { x1Expr: 'x0', y1: -6, x2Expr: 'x0', y2: 6, label: 'x0' }
    },
    {
      id: 'sample-cos-point',
      type: 'point',
      visible: true,
      style: { color: '#1677ff', lineWidth: 2 },
      data: { xExpr: 'x0', yExpr: 'a * cos(x0)', label: 'Pc', showCoords: false }
    },
    {
      id: 'sample-sin-point',
      type: 'point',
      visible: true,
      style: { color: '#fa8c16', lineWidth: 2 },
      data: { xExpr: 'x0', yExpr: 'b * sin(x0)', label: 'Ps', showCoords: false }
    },
    {
      id: 'sample-sum-point',
      type: 'point',
      visible: true,
      style: { color: '#13a36b', lineWidth: 2 },
      data: { xExpr: 'x0', yExpr: 'a * cos(x0) + b * sin(x0)', label: 'P' }
    }
  ]
}
