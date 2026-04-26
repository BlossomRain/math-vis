import { evaluate } from 'mathjs'
import { GeometryLabPageModel, ObservationField } from '../../core/model'
import { SceneConfig } from '../../types/config'
import './Panels.css'

interface KeyPointsPanelProps {
  config: SceneConfig
  pageModel?: GeometryLabPageModel
}

function fp(value: number) {
  return value.toFixed(4)
}

function deg(value: number) {
  return ((value * 180) / Math.PI).toFixed(1)
}

function resolveFieldValue(field: ObservationField, params: Record<string, number>) {
  try {
    const rawValue = evaluate(field.valueExpr, params)

    if (field.format === 'boolean') {
      return rawValue ? field.trueText ?? '是' : field.falseText ?? '否'
    }

    if (typeof rawValue === 'number' && Number.isFinite(rawValue)) {
      const precision = field.precision ?? 4
      return `${rawValue.toFixed(precision)}${field.suffix ?? ''}`
    }

    return String(rawValue)
  } catch {
    return '—'
  }
}

export default function KeyPointsPanel({ config, pageModel }: KeyPointsPanelProps) {
  const { params } = config

  if (pageModel?.keyPointSchema) {
    return (
      <div className="panel-card">
        <h3 className="panel-title">关键点</h3>
        {pageModel.keyPointSchema.groups.map((group) => (
          <div key={group.id} className="obs-group">
            <div className="obs-group-title">{group.title}</div>
            {group.fields.map((field) => (
              <div key={field.id} className="obs-row">
                <span>{field.label}</span>
                <strong>{resolveFieldValue(field, params)}</strong>
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }

  if (config.id === 'euler-angle-sum') {
    const alpha = params.alpha ?? 0
    const beta = params.beta ?? 0
    const ax = Math.cos(alpha)
    const ay = Math.sin(alpha)
    const cx = Math.cos(alpha + beta)
    const cy = Math.sin(alpha + beta)

    return (
      <div className="panel-card">
        <h3 className="panel-title">关键点</h3>
        <div className="obs-row"><span>A = (cos a, sin a)</span><strong>({fp(ax)}, {fp(ay)})</strong></div>
        <div className="obs-row"><span>C = (cos(a+b), sin(a+b))</span><strong>({fp(cx)}, {fp(cy)})</strong></div>
        <div className="obs-row"><span>a</span><strong>{fp(alpha)} rad / {deg(alpha)}°</strong></div>
        <div className="obs-row"><span>b</span><strong>{fp(beta)} rad / {deg(beta)}°</strong></div>
        <div className="obs-row"><span>a+b</span><strong>{fp(alpha + beta)} rad / {deg(alpha + beta)}°</strong></div>
      </div>
    )
  }

  if (config.id === 'harmonic-composition') {
    const a = params.a ?? 0
    const b = params.b ?? 0
    const x0 = params.x0 ?? 0
    const r = Math.sqrt(a * a + b * b)
    const phi = Math.atan2(a, b)
    const cosPart = a * Math.cos(x0)
    const sinPart = b * Math.sin(x0)
    const sum = cosPart + sinPart

    return (
      <div className="panel-card">
        <h3 className="panel-title">关键点</h3>
        <div className="obs-row"><span>Pc = (x0, a cos x0)</span><strong>({fp(x0)}, {fp(cosPart)})</strong></div>
        <div className="obs-row"><span>Ps = (x0, b sin x0)</span><strong>({fp(x0)}, {fp(sinPart)})</strong></div>
        <div className="obs-row"><span>P = (x0, 和函数)</span><strong>({fp(x0)}, {fp(sum)})</strong></div>
        <div className="obs-row"><span>R</span><strong>{fp(r)}</strong></div>
        <div className="obs-row"><span>phi</span><strong>{fp(phi)} rad / {deg(phi)}°</strong></div>
      </div>
    )
  }

  if (config.id === 'sequence-limit') {
    const epsilon = params.epsilon ?? 0
    const nIndex = Math.max(1, Math.floor(params.N ?? 1))
    const limitValue = params.L ?? 1
    const rate = params.rate ?? 1
    const aN = limitValue + rate / nIndex
    const upper = limitValue + epsilon
    const lower = limitValue - epsilon

    return (
      <div className="panel-card">
        <h3 className="panel-title">关键点</h3>
        <div className="obs-row"><span>L</span><strong>{fp(limitValue)}</strong></div>
        <div className="obs-row"><span>L + epsilon</span><strong>{fp(upper)}</strong></div>
        <div className="obs-row"><span>L - epsilon</span><strong>{fp(lower)}</strong></div>
        <div className="obs-row"><span>a_N</span><strong>({nIndex}, {fp(aN)})</strong></div>
        <div className="obs-row"><span>尾部距离</span><strong>{fp(Math.abs(aN - limitValue))}</strong></div>
      </div>
    )
  }

  if (config.id === 'function-limit') {
    const epsilon = params.epsilon ?? 0
    const delta = params.delta ?? 0
    const x0 = params.x0 ?? 0
    const a = params.a ?? 2
    const limitValue = params.L ?? 4
    const fx0 = x0 * x0

    return (
      <div className="panel-card">
        <h3 className="panel-title">关键点</h3>
        <div className="obs-row"><span>a</span><strong>{fp(a)}</strong></div>
        <div className="obs-row"><span>a - delta</span><strong>{fp(a - delta)}</strong></div>
        <div className="obs-row"><span>a + delta</span><strong>{fp(a + delta)}</strong></div>
        <div className="obs-row"><span>L</span><strong>{fp(limitValue)}</strong></div>
        <div className="obs-row"><span>L - epsilon</span><strong>{fp(limitValue - epsilon)}</strong></div>
        <div className="obs-row"><span>L + epsilon</span><strong>{fp(limitValue + epsilon)}</strong></div>
        <div className="obs-row"><span>P = (x0, f(x0))</span><strong>({fp(x0)}, {fp(fx0)})</strong></div>
      </div>
    )
  }

  return (
    <div className="panel-card">
      <h3 className="panel-title">关键点</h3>
      <p className="panel-note">当前页面还没有配置关键点面板。</p>
    </div>
  )
}
