import { SceneConfig } from '../../types/config'
import { computeEulerObservation } from '../../features/calculus0/pages/euler-angle-sum/compute'
import { computeHarmonicObservation } from '../../features/calculus0/pages/harmonic-composition/compute'
import { computeFunctionLimitObservation } from '../../features/calculus1/pages/function-limit/compute'
import { computeSequenceLimitObservation } from '../../features/calculus1/pages/sequence-limit/compute'
import './Panels.css'

interface ObservationPanelProps {
  config: SceneConfig
}

function formatNumber(value: number, digits = 6) {
  return value.toFixed(digits)
}

export default function ObservationPanel({ config }: ObservationPanelProps) {
  const { params } = config

  if (config.id === 'euler-angle-sum') {
    const alpha = params.alpha ?? 0
    const beta = params.beta ?? 0
    const obs = computeEulerObservation(alpha, beta)

    return (
      <div className="panel-card">
        <h3 className="panel-title">公式观察</h3>
        <div className="obs-group">
          <div className="obs-group-title">sin(a+b)</div>
          <div className="obs-row"><span>左侧</span><strong>{formatNumber(obs.sinLeft)}</strong></div>
          <div className="obs-row"><span>展开</span><strong>{formatNumber(obs.sinRight)}</strong></div>
          <div className="obs-row"><span>误差</span><strong className="obs-delta">{formatNumber(obs.deltaSin)}</strong></div>
        </div>
        <div className="obs-group">
          <div className="obs-group-title">cos(a+b)</div>
          <div className="obs-row"><span>左侧</span><strong>{formatNumber(obs.cosLeft)}</strong></div>
          <div className="obs-row"><span>展开</span><strong>{formatNumber(obs.cosRight)}</strong></div>
          <div className="obs-row"><span>误差</span><strong className="obs-delta">{formatNumber(obs.deltaCos)}</strong></div>
        </div>
      </div>
    )
  }

  if (config.id === 'harmonic-composition') {
    const a = params.a ?? 0
    const b = params.b ?? 0
    const x0 = params.x0 ?? 0
    const obs = computeHarmonicObservation(a, b, x0)
    const cosPart = a * Math.cos(x0)
    const sinPart = b * Math.sin(x0)

    return (
      <div className="panel-card">
        <h3 className="panel-title">公式观察</h3>
        <div className="obs-group">
          <div className="obs-group-title">叠合参数</div>
          <div className="obs-row"><span>R = sqrt(a^2+b^2)</span><strong>{formatNumber(obs.r, 4)}</strong></div>
          <div className="obs-row"><span>phi = atan2(a,b)</span><strong>{formatNumber(obs.phi, 4)}</strong></div>
        </div>
        <div className="obs-group">
          <div className="obs-group-title">x0 处的三条曲线</div>
          <div className="obs-row"><span>a cos(x0)</span><strong>{formatNumber(cosPart)}</strong></div>
          <div className="obs-row"><span>b sin(x0)</span><strong>{formatNumber(sinPart)}</strong></div>
          <div className="obs-row"><span>和函数</span><strong>{formatNumber(obs.left)}</strong></div>
        </div>
        <div className="obs-group">
          <div className="obs-group-title">等价验证</div>
          <div className="obs-row"><span>R sin(x0 + phi)</span><strong>{formatNumber(obs.right)}</strong></div>
          <div className="obs-row"><span>误差</span><strong className="obs-delta">{formatNumber(obs.delta)}</strong></div>
        </div>
      </div>
    )
  }

  if (config.id === 'sequence-limit') {
    const epsilon = params.epsilon ?? 0
    const nIndex = Math.max(1, Math.floor(params.N ?? 1))
    const limitValue = params.L ?? 1
    const rate = params.rate ?? 1
    const obs = computeSequenceLimitObservation(epsilon, nIndex, limitValue, rate)

    return (
      <div className="panel-card">
        <h3 className="panel-title">公式观察</h3>
        <div className="obs-group">
          <div className="obs-group-title">epsilon-N 条件</div>
          <div className="obs-row"><span>epsilon</span><strong>{formatNumber(obs.epsilon, 4)}</strong></div>
          <div className="obs-row"><span>N</span><strong>{obs.nIndex}</strong></div>
          <div className="obs-row"><span>|a_N - L|</span><strong>{formatNumber(obs.tailMargin, 4)}</strong></div>
          <div className="obs-row"><span>是否进入带内</span><strong className="obs-delta">{obs.satisfiesFromN ? '是' : '否'}</strong></div>
        </div>
        <div className="obs-group">
          <div className="obs-group-title">尾部观察</div>
          <div className="obs-row"><span>a_N</span><strong>{formatNumber(obs.startValue, 4)}</strong></div>
          <div className="obs-row"><span>a_(N+1)</span><strong>{formatNumber(obs.nextValue, 4)}</strong></div>
          <div className="obs-row"><span>L</span><strong>{formatNumber(obs.limitValue, 4)}</strong></div>
        </div>
      </div>
    )
  }

  if (config.id === 'function-limit') {
    const epsilon = params.epsilon ?? 0
    const delta = params.delta ?? 0
    const x0 = params.x0 ?? 0
    const a = params.a ?? 2
    const limitValue = params.L ?? 4
    const obs = computeFunctionLimitObservation(epsilon, delta, x0, a, limitValue)

    return (
      <div className="panel-card">
        <h3 className="panel-title">公式观察</h3>
        <div className="obs-group">
          <div className="obs-group-title">epsilon-delta 条件</div>
          <div className="obs-row"><span>epsilon</span><strong>{formatNumber(obs.epsilon, 4)}</strong></div>
          <div className="obs-row"><span>delta</span><strong>{formatNumber(obs.delta, 4)}</strong></div>
          <div className="obs-row"><span>|x-a|</span><strong>{formatNumber(obs.xDistance, 4)}</strong></div>
          <div className="obs-row"><span>|f(x)-L|</span><strong>{formatNumber(obs.yDistance, 4)}</strong></div>
        </div>
        <div className="obs-group">
          <div className="obs-group-title">当前观察点</div>
          <div className="obs-row"><span>在 delta 邻域内</span><strong className="obs-delta">{obs.inDeltaStrip ? '是' : '否'}</strong></div>
          <div className="obs-row"><span>在 epsilon 邻域内</span><strong className="obs-delta">{obs.inEpsilonBand ? '是' : '否'}</strong></div>
          <div className="obs-row"><span>f(x0)</span><strong>{formatNumber(obs.fx0, 4)}</strong></div>
        </div>
      </div>
    )
  }

  return (
    <div className="panel-card">
      <h3 className="panel-title">关键观察</h3>
      <p className="panel-note">当前页面还没有配置观察面板。</p>
    </div>
  )
}
