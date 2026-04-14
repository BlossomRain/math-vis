import 'katex/dist/katex.min.css'
import { BlockMath } from 'react-katex'
import { SceneConfig } from '../../types/config'
import './Panels.css'

interface ExplanationPanelProps {
  config: SceneConfig
}

function FormulaBlock({ title, formula }: { title: string; formula: string }) {
  return (
    <div className="formula-block">
      <div className="formula-title">{title}</div>
      <BlockMath math={formula} />
    </div>
  )
}

export default function ExplanationPanel({ config }: ExplanationPanelProps) {
  if (config.id === 'euler-angle-sum') {
    return (
      <div className="panel-card">
        <h3 className="panel-title">说明与推导</h3>
        <p className="panel-note">
          左图用单位圆上的点 A、C 对应角度 <code>a</code> 与 <code>a+b</code>。观察点坐标随角度变化，
          就能直接把和角公式理解成“复数乘法后的实部与虚部比较”。
        </p>
        <FormulaBlock title="欧拉公式" formula={'e^{i\\theta} = \\cos\\theta + i\\sin\\theta'} />
        <FormulaBlock title="乘法展开" formula={'e^{i(a+b)} = e^{ia}e^{ib}'} />
        <FormulaBlock
          title="代入坐标形式"
          formula={'\\cos(a+b)+i\\sin(a+b)=(\\cos a+i\\sin a)(\\cos b+i\\sin b)'}
        />
        <FormulaBlock
          title="比较实部与虚部"
          formula={'\\begin{aligned}\\cos(a+b)&=\\cos a\\cos b-\\sin a\\sin b\\\\\\sin(a+b)&=\\sin a\\cos b+\\cos a\\sin b\\end{aligned}'}
        />
      </div>
    )
  }

  if (config.id === 'harmonic-composition') {
    return (
      <div className="panel-card">
        <h3 className="panel-title">说明与推导</h3>
        <p className="panel-note">
          函数区默认拆成三条线：<code>a cos x</code>、<code>b sin x</code>、它们的和。这样先看“分量如何叠加”，
          再看它为什么能改写成单一振幅和相位的正弦函数。
        </p>
        <FormulaBlock title="目标形式" formula={'a\\cos x+b\\sin x=R\\sin(x+\\varphi)'} />
        <FormulaBlock
          title="展开右侧"
          formula={'R\\sin(x+\\varphi)=R\\sin x\\cos\\varphi+R\\cos x\\sin\\varphi'}
        />
        <FormulaBlock
          title="比较系数"
          formula={'\\begin{aligned}R\\sin\\varphi&=a\\\\R\\cos\\varphi&=b\\end{aligned}'}
        />
        <FormulaBlock
          title="得到参数"
          formula={'\\begin{aligned}R&=\\sqrt{a^2+b^2}\\\\\\varphi&=\\operatorname{atan2}(a,b)\\end{aligned}'}
        />
      </div>
    )
  }

  return null
}
