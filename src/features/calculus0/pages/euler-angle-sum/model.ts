import { GeometryLabPageModel } from '../../../../core/model'

export const eulerAngleSumModel: GeometryLabPageModel = {
  id: 'euler-angle-sum',
  title: '和角公式：欧拉公式视角',
  template: 'geometry-lab',
  bounds: { xMin: -1.6, xMax: 1.6, yMin: -1.6, yMax: 1.6 },
  params: { alpha: 0.8, beta: 0.6 },
  notebook: {
    summary: '借助单位圆与复指数，把和角公式从代数恒等式变成可以直接观察的几何关系。',
    goals: [
      '把角 a、b 与单位圆上的点坐标联系起来',
      '看见 sin(a+b)、cos(a+b) 如何来自向量旋转',
      '把图形观察与欧拉公式推导互相对应'
    ],
    sections: [
      {
        id: 'setup',
        title: '图形设置',
        body: [
          '绿色射线 OA 对应角 a，洋红色射线 OC 对应角 a+b。点 A 与点 C 在单位圆上的坐标，分别就是这两个角的余弦和正弦值。',
          '虚线投影把圆上的点拆回到 x 轴与 y 轴，于是 cos 和 sin 不再只是符号，而是可见的坐标分量。'
        ]
      }
    ],
    prompts: [
      '拖动 a 和 b，比较 A 与 C 的位置变化。',
      '先只看 x 坐标，再只看 y 坐标，观察它们分别对应哪一条公式。'
    ],
    takeaways: [
      '单位圆坐标天然编码了 sin 和 cos。',
      '和角公式可以理解为两次旋转叠加后的坐标重组。'
    ]
  },
  controls: [
    { param: 'alpha', type: 'slider', min: -3.14, max: 3.14, step: 0.01, label: '角 a (rad)' },
    { param: 'beta', type: 'slider', min: -3.14, max: 3.14, step: 0.01, label: '角 b (rad)' }
  ],
  keyPointSchema: {
    groups: [
      {
        id: 'angles',
        title: '角与坐标',
        fields: [
          { id: 'alpha', label: 'a', valueExpr: 'alpha', precision: 4, suffix: ' rad' },
          { id: 'beta', label: 'b', valueExpr: 'beta', precision: 4, suffix: ' rad' },
          { id: 'sum', label: 'a+b', valueExpr: 'alpha + beta', precision: 4, suffix: ' rad' },
          { id: 'ax', label: 'A.x = cos(a)', valueExpr: 'cos(alpha)', precision: 4 },
          { id: 'ay', label: 'A.y = sin(a)', valueExpr: 'sin(alpha)', precision: 4 },
          { id: 'cx', label: 'C.x = cos(a+b)', valueExpr: 'cos(alpha + beta)', precision: 4 },
          { id: 'cy', label: 'C.y = sin(a+b)', valueExpr: 'sin(alpha + beta)', precision: 4 }
        ]
      }
    ]
  },
  observationSchema: {
    groups: [
      {
        id: 'sin-group',
        title: 'sin(a+b)',
        fields: [
          { id: 'sin-left', label: '左侧', valueExpr: 'sin(alpha + beta)', precision: 6 },
          { id: 'sin-right', label: '展开', valueExpr: 'sin(alpha) * cos(beta) + cos(alpha) * sin(beta)', precision: 6 },
          { id: 'sin-delta', label: '误差', valueExpr: 'abs(sin(alpha + beta) - (sin(alpha) * cos(beta) + cos(alpha) * sin(beta)))', precision: 6 }
        ]
      },
      {
        id: 'cos-group',
        title: 'cos(a+b)',
        fields: [
          { id: 'cos-left', label: '左侧', valueExpr: 'cos(alpha + beta)', precision: 6 },
          { id: 'cos-right', label: '展开', valueExpr: 'cos(alpha) * cos(beta) - sin(alpha) * sin(beta)', precision: 6 },
          { id: 'cos-delta', label: '误差', valueExpr: 'abs(cos(alpha + beta) - (cos(alpha) * cos(beta) - sin(alpha) * sin(beta)))', precision: 6 }
        ]
      }
    ]
  },
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
