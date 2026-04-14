import { GeometryLabPageModel } from '../../../../core/model'

export const functionLimitModel: GeometryLabPageModel = {
  id: 'function-limit',
  title: '函数极限：epsilon-delta 语言',
  template: 'geometry-lab',
  bounds: { xMin: 0.8, xMax: 3.2, yMin: 1.5, yMax: 6.5 },
  params: { epsilon: 0.8, delta: 0.18, a: 2, L: 4, x0: 2.12 },
  controls: [
    { param: 'epsilon', type: 'slider', min: 0.1, max: 1.8, step: 0.01, label: 'epsilon' },
    { param: 'delta', type: 'slider', min: 0.05, max: 0.8, step: 0.01, label: 'delta' },
    { param: 'x0', type: 'slider', min: 1.2, max: 2.8, step: 0.01, label: '观察点 x0' }
  ],
  userFunctionLayers: [
    { id: 'curve', expr: 'x^2', color: '#1677ff', lineWidth: 2.4, visible: true, editable: false }
  ],
  legendItems: [
    { id: 'curve', label: 'f(x) = x^2', kind: 'curve', color: '#1677ff', objectId: 'curve' }
  ],
  formulaDock: {
    formulas: [
      {
        id: 'target',
        title: '函数极限定义',
        latex: '\\forall\\varepsilon>0,\\;\\exists\\delta>0,\\;0<|x-a|<\\delta\\Rightarrow |f(x)-L|<\\varepsilon'
      },
      { id: 'example', title: '本页例子', latex: '\\lim_{x\\to 2}x^2=4' }
    ],
    derivations: [
      { id: 'step-1', title: '目标差值', latex: '|f(x)-L|=|x^2-4|=|x-2||x+2|' },
      { id: 'step-2', title: '把问题拆成两部分', latex: '|x-2|<\\delta\\quad\\text{并控制 }|x+2|' },
      {
        id: 'step-3',
        title: '结论语言',
        latex: 'x\\text{ 足够靠近 }2\\Rightarrow x^2\\text{ 足够靠近 }4'
      }
    ],
    insights: [
      {
        id: 'insight-1',
        title: '图形理解',
        latex: 'x\\in(a-\\delta,a+\\delta) \\Rightarrow f(x)\\in(L-\\varepsilon,L+\\varepsilon)',
        note: '橙色竖带表示 delta 邻域，蓝色横带表示 epsilon 邻域。观察点 P 用来检查当前 x0 是否满足定义。'
      }
    ]
  },
  geometryLayers: [
    {
      id: 'delta-band',
      type: 'band',
      visible: true,
      style: { color: '#ffd591', lineWidth: 1, fillColor: 'rgba(255, 213, 145, 0.22)' },
      data: { x1Expr: 'a - delta', x2Expr: 'a + delta', yCenterExpr: 'L', halfHeight: 2.5, label: 'delta 邻域' }
    },
    {
      id: 'epsilon-band',
      type: 'band',
      visible: true,
      style: { color: '#91caff', lineWidth: 1, fillColor: 'rgba(145, 202, 255, 0.20)' },
      data: { x1: 0.8, x2: 3.2, yCenterExpr: 'L', halfHeightExpr: 'epsilon', label: 'epsilon 邻域' }
    },
    {
      id: 'limit-line',
      type: 'line',
      visible: true,
      style: { color: '#ff4d4f', lineWidth: 2 },
      data: { x1: 0.8, y1Expr: 'L', x2: 3.2, y2Expr: 'L', label: 'L' }
    },
    {
      id: 'a-line',
      type: 'line',
      visible: true,
      style: { color: '#fa8c16', lineWidth: 2 },
      data: { x1Expr: 'a', y1: 1.5, x2Expr: 'a', y2: 6.5, label: 'a' }
    },
    {
      id: 'delta-left',
      type: 'line',
      visible: true,
      style: { color: '#fa8c16', lineWidth: 1.5, dashed: true },
      data: { x1Expr: 'a - delta', y1: 1.5, x2Expr: 'a - delta', y2: 6.5, label: 'a - delta' }
    },
    {
      id: 'delta-right',
      type: 'line',
      visible: true,
      style: { color: '#fa8c16', lineWidth: 1.5, dashed: true },
      data: { x1Expr: 'a + delta', y1: 1.5, x2Expr: 'a + delta', y2: 6.5, label: 'a + delta' }
    },
    {
      id: 'epsilon-top',
      type: 'line',
      visible: true,
      style: { color: '#91caff', lineWidth: 1.5, dashed: true },
      data: { x1: 0.8, y1Expr: 'L + epsilon', x2: 3.2, y2Expr: 'L + epsilon', label: 'L + epsilon' }
    },
    {
      id: 'epsilon-bottom',
      type: 'line',
      visible: true,
      style: { color: '#91caff', lineWidth: 1.5, dashed: true },
      data: { x1: 0.8, y1Expr: 'L - epsilon', x2: 3.2, y2Expr: 'L - epsilon', label: 'L - epsilon' }
    },
    {
      id: 'sample-vertical',
      type: 'projection',
      visible: true,
      style: { color: '#722ed1', lineWidth: 1.2, dashed: true },
      data: { x1Expr: 'x0', y1Expr: 'x0^2', x2Expr: 'x0', y2Expr: 'L', label: '|' }
    },
    {
      id: 'sample-horizontal',
      type: 'projection',
      visible: true,
      style: { color: '#722ed1', lineWidth: 1.2, dashed: true },
      data: { x1Expr: 'x0', y1Expr: 'x0^2', x2Expr: 'a', y2Expr: 'x0^2' }
    },
    {
      id: 'anchor-point',
      type: 'point',
      visible: true,
      style: { color: '#ff4d4f', lineWidth: 2 },
      data: { xExpr: 'a', yExpr: 'L', label: 'A' }
    },
    {
      id: 'sample-point',
      type: 'point',
      visible: true,
      style: { color: '#722ed1', lineWidth: 2 },
      data: { xExpr: 'x0', yExpr: 'x0^2', label: 'P' }
    }
  ]
}
