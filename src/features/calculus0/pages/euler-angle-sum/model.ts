import { GeometryLabPageModel } from '../../../../core/model'

export const eulerAngleSumModel: GeometryLabPageModel = {
  id: 'euler-angle-sum',
  title: '欧拉公式视角：和角公式验证',
  template: 'geometry-lab',
  bounds: { xMin: -1.6, xMax: 1.6, yMin: -1.6, yMax: 1.6 },
  params: { alpha: 0.8, beta: 0.6 },
  controls: [
    { param: 'alpha', type: 'slider', min: -3.14, max: 3.14, step: 0.01, label: '角 a (rad)' },
    { param: 'beta', type: 'slider', min: -3.14, max: 3.14, step: 0.01, label: '角 b (rad)' }
  ],
  userFunctionLayers: [],
  legendItems: [],
  formulaDock: {
    formulas: [
      { id: 'euler', title: '欧拉公式', latex: 'e^{i\\theta}=\\cos\\theta+i\\sin\\theta' },
      {
        id: 'angle-sum',
        title: '和角公式',
        latex: '\\begin{aligned}\\sin(a+b)&=\\sin a\\cos b+\\cos a\\sin b\\\\\\cos(a+b)&=\\cos a\\cos b-\\sin a\\sin b\\end{aligned}'
      }
    ],
    derivations: [
      { id: 'step-1', title: '复指数相乘', latex: 'e^{i(a+b)}=e^{ia}e^{ib}' },
      {
        id: 'step-2',
        title: '代入欧拉公式',
        latex: '\\cos(a+b)+i\\sin(a+b)=(\\cos a+i\\sin a)(\\cos b+i\\sin b)'
      },
      {
        id: 'step-3',
        title: '比较实部与虚部',
        latex: '\\begin{aligned}\\cos(a+b)&=\\cos a\\cos b-\\sin a\\sin b\\\\\\sin(a+b)&=\\sin a\\cos b+\\cos a\\sin b\\end{aligned}'
      }
    ],
    insights: [
      {
        id: 'insight-1',
        title: '图形理解',
        latex: 'A=(\\cos a,\\sin a),\\;C=(\\cos(a+b),\\sin(a+b))',
        note: '图上点 A 和 C 在单位圆上的坐标，分别对应角 a 与 a+b。'
      }
    ]
  },
  geometryLayers: [
    {
      id: 'unit-circle',
      type: 'circle',
      visible: true,
      style: { color: '#1677ff', lineWidth: 2 },
      data: { cx: 0, cy: 0, r: 1, label: 'x^2 + y^2 = 1' }
    },
    {
      id: 'arc-alpha',
      type: 'arc',
      visible: true,
      style: { color: '#52c41a', lineWidth: 2.5 },
      data: { cx: 0, cy: 0, r: 0.36, startAngle: 0, endAngleExpr: 'alpha', label: 'a' }
    },
    {
      id: 'arc-beta',
      type: 'arc',
      visible: true,
      style: { color: '#fa8c16', lineWidth: 2.5 },
      data: { cx: 0, cy: 0, r: 0.52, startAngleExpr: 'alpha', endAngleExpr: 'alpha + beta', label: 'b' }
    },
    {
      id: 'arc-total',
      type: 'arc',
      visible: true,
      style: { color: '#eb2f96', lineWidth: 1.5, dashed: true },
      data: { cx: 0, cy: 0, r: 0.68, startAngle: 0, endAngleExpr: 'alpha + beta', label: 'a+b' }
    },
    {
      id: 'oa',
      type: 'line',
      visible: true,
      style: { color: '#52c41a', lineWidth: 2 },
      data: { x1: 0, y1: 0, x2Expr: 'cos(alpha)', y2Expr: 'sin(alpha)', label: 'OA' }
    },
    {
      id: 'ob',
      type: 'line',
      visible: false,
      style: { color: '#fa8c16', lineWidth: 2 },
      data: { x1: 0, y1: 0, x2Expr: 'cos(beta)', y2Expr: 'sin(beta)', label: 'OB' }
    },
    {
      id: 'oc',
      type: 'line',
      visible: true,
      style: { color: '#eb2f96', lineWidth: 2.5 },
      data: { x1: 0, y1: 0, x2Expr: 'cos(alpha + beta)', y2Expr: 'sin(alpha + beta)', label: 'OC' }
    },
    {
      id: 'point-a',
      type: 'point',
      visible: true,
      style: { color: '#52c41a', lineWidth: 2 },
      data: { xExpr: 'cos(alpha)', yExpr: 'sin(alpha)', label: 'A' }
    },
    {
      id: 'point-b',
      type: 'point',
      visible: false,
      style: { color: '#fa8c16', lineWidth: 2 },
      data: { xExpr: 'cos(beta)', yExpr: 'sin(beta)', label: 'B', showCoords: false }
    },
    {
      id: 'point-c',
      type: 'point',
      visible: true,
      style: { color: '#eb2f96', lineWidth: 2 },
      data: { xExpr: 'cos(alpha + beta)', yExpr: 'sin(alpha + beta)', label: 'C' }
    },
    {
      id: 'proj-a-x',
      type: 'projection',
      visible: true,
      style: { color: '#52c41a', lineWidth: 1, dashed: true },
      data: { x1Expr: 'cos(alpha)', y1Expr: 'sin(alpha)', x2Expr: 'cos(alpha)', y2: 0 }
    },
    {
      id: 'proj-a-y',
      type: 'projection',
      visible: true,
      style: { color: '#52c41a', lineWidth: 1, dashed: true },
      data: { x1Expr: 'cos(alpha)', y1Expr: 'sin(alpha)', x2: 0, y2Expr: 'sin(alpha)' }
    },
    {
      id: 'proj-c-x',
      type: 'projection',
      visible: true,
      style: { color: '#eb2f96', lineWidth: 1, dashed: true },
      data: { x1Expr: 'cos(alpha + beta)', y1Expr: 'sin(alpha + beta)', x2Expr: 'cos(alpha + beta)', y2: 0 }
    },
    {
      id: 'proj-c-y',
      type: 'projection',
      visible: true,
      style: { color: '#eb2f96', lineWidth: 1, dashed: true },
      data: { x1Expr: 'cos(alpha + beta)', y1Expr: 'sin(alpha + beta)', x2: 0, y2Expr: 'sin(alpha + beta)' }
    }
  ]
}
