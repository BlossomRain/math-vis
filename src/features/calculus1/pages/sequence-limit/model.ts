import { GeometryLabPageModel } from '../../../../core/model'

export const sequenceLimitModel: GeometryLabPageModel = {
  id: 'sequence-limit',
  title: '数列极限：epsilon-N 定义',
  template: 'geometry-lab',
  bounds: { xMin: 0, xMax: 28, yMin: 0.5, yMax: 2.1 },
  params: { epsilon: 0.18, N: 8, L: 1, rate: 1, maxN: 24 },
  notebook: {
    summary: '把数列 a_n = 1 + 1/n 的尾部行为画出来，专门练 epsilon-N 定义里“从某一项之后都进入带内”的含义。',
    goals: [
      '理解 N 不是某一项本身，而是尾部开始的门槛',
      '分清“偶尔进入 epsilon 带”和“从此以后都在带内”',
      '通过尾部高亮建立数列极限的直观'
    ],
    sections: [
      {
        id: 'tail',
        title: '尾部视角',
        body: [
          '蓝色点展示整个数列，绿色高亮表示从 N 开始的尾部。',
          '极限定义真正关心的是：一旦过了 N，后面所有项是否都待在 epsilon 带里。'
        ]
      }
    ],
    prompts: [
      '改变 epsilon，看满足条件所需的 N 大小怎样变化。',
      '把 maxN 拉大，观察数列尾部越来越贴近 L。'
    ],
    takeaways: [
      '数列极限强调的是尾部整体，而不是单个点。',
      'epsilon 越小，通常需要的 N 越大。'
    ]
  },
  controls: [
    { param: 'epsilon', type: 'slider', min: 0.05, max: 0.6, step: 0.01, label: 'epsilon' },
    { param: 'N', type: 'slider', min: 1, max: 24, step: 1, label: 'N' },
    { param: 'maxN', type: 'slider', min: 8, max: 40, step: 1, label: '显示到 n' }
  ],
  keyPointSchema: {
    groups: [
      {
        id: 'anchors',
        title: '关键量',
        fields: [
          { id: 'l', label: 'L', valueExpr: 'L', precision: 4 },
          { id: 'upper', label: 'L + epsilon', valueExpr: 'L + epsilon', precision: 4 },
          { id: 'lower', label: 'L - epsilon', valueExpr: 'L - epsilon', precision: 4 },
          { id: 'n', label: 'N', valueExpr: 'N', precision: 0 },
          { id: 'an', label: 'a_N', valueExpr: 'L + rate / N', precision: 4 },
          { id: 'tail', label: '尾部距离', valueExpr: 'abs((L + rate / N) - L)', precision: 4 }
        ]
      }
    ]
  },
  observationSchema: {
    groups: [
      {
        id: 'condition',
        title: 'epsilon-N 条件',
        fields: [
          { id: 'epsilon', label: 'epsilon', valueExpr: 'epsilon', precision: 4 },
          { id: 'n', label: 'N', valueExpr: 'N', precision: 0 },
          { id: 'margin', label: '|a_N - L|', valueExpr: 'abs((L + rate / N) - L)', precision: 4 },
          { id: 'satisfy', label: '是否进入带内', valueExpr: 'abs((L + rate / N) - L) < epsilon', format: 'boolean' }
        ]
      },
      {
        id: 'tail',
        title: '尾部观察',
        fields: [
          { id: 'an', label: 'a_N', valueExpr: 'L + rate / N', precision: 4 },
          { id: 'an1', label: 'a_(N+1)', valueExpr: 'L + rate / (N + 1)', precision: 4 },
          { id: 'l', label: 'L', valueExpr: 'L', precision: 4 }
        ]
      }
    ]
  },
  userFunctionLayers: [],
  legendItems: [],
  formulaDock: {
    formulas: [
      {
        id: 'target',
        title: '数列极限定义',
        latex: '\\forall\\varepsilon>0,\\;\\exists N\\in\\mathbb{N},\\;n\\ge N\\Rightarrow |a_n-L|<\\varepsilon'
      },
      { id: 'sequence', title: '本页数列', latex: 'a_n=1+\\frac{1}{n},\\quad L=1' }
    ],
    derivations: [
      { id: 'step-1', title: '距离目标', latex: '|a_n-L|=\\left|1+\\frac{1}{n}-1\\right|=\\frac{1}{n}' },
      { id: 'step-2', title: '要求进入 epsilon 带', latex: '\\frac{1}{n}<\\varepsilon' },
      { id: 'step-3', title: '选择足够大的 N', latex: 'n>\\frac{1}{\\varepsilon}\\Rightarrow n\\ge N' }
    ],
    insights: [
      {
        id: 'insight-1',
        title: '图形理解',
        latex: 'n\\ge N \\text{ 时，所有 } a_n \\text{ 都落入 } (L-\\varepsilon, L+\\varepsilon)',
        note: '蓝色带表示 epsilon 邻域，绿色点表示从 N 开始的数列尾部。'
      }
    ]
  },
  geometryLayers: [
    {
      id: 'epsilon-band',
      type: 'band',
      visible: true,
      style: { color: '#91caff', lineWidth: 1, fillColor: 'rgba(145, 202, 255, 0.22)' },
      data: { x1: 0, x2Expr: 'maxN + 1', yCenterExpr: 'L', halfHeightExpr: 'epsilon', label: 'epsilon 带' }
    },
    {
      id: 'limit-line',
      type: 'line',
      visible: true,
      style: { color: '#ff4d4f', lineWidth: 2 },
      data: { x1: 0, y1Expr: 'L', x2Expr: 'maxN + 1', y2Expr: 'L', label: 'L' }
    },
    {
      id: 'epsilon-top',
      type: 'line',
      visible: true,
      style: { color: '#91caff', lineWidth: 1.5, dashed: true },
      data: { x1: 0, y1Expr: 'L + epsilon', x2Expr: 'maxN + 1', y2Expr: 'L + epsilon', label: 'L + epsilon' }
    },
    {
      id: 'epsilon-bottom',
      type: 'line',
      visible: true,
      style: { color: '#91caff', lineWidth: 1.5, dashed: true },
      data: { x1: 0, y1Expr: 'L - epsilon', x2Expr: 'maxN + 1', y2Expr: 'L - epsilon', label: 'L - epsilon' }
    },
    {
      id: 'N-line',
      type: 'line',
      visible: true,
      style: { color: '#fa8c16', lineWidth: 2, dashed: true },
      data: { x1Expr: 'N', y1Expr: 'L - epsilon - 0.08', x2Expr: 'N', y2Expr: 'L + epsilon + 0.35', label: 'N' }
    },
    {
      id: 'sequence',
      type: 'sequence',
      visible: true,
      style: { color: '#1677ff', lineWidth: 1.5, fillColor: '#13a36b' },
      data: { indexMin: 1, indexMaxExpr: 'maxN', valueExpr: 'L + rate / n', highlightFromExpr: 'N', showStem: false }
    },
    {
      id: 'an-point',
      type: 'point',
      visible: true,
      style: { color: '#fa8c16', lineWidth: 2 },
      data: { xExpr: 'N', yExpr: 'L + rate / N', label: 'a_N' }
    }
  ]
}
