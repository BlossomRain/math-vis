import 'katex/dist/katex.min.css'
import { useMemo, useState } from 'react'
import { BlockMath } from 'react-katex'
import { FormulaDockContent } from '../../core/model'
import './Overlay.css'

interface FormulaDockProps {
  content?: FormulaDockContent
  open: boolean
  onClose: () => void
}

type FormulaTab = 'formulas' | 'derivations' | 'insights'

export default function FormulaDock({ content, open, onClose }: FormulaDockProps) {
  const [activeTab, setActiveTab] = useState<FormulaTab>('formulas')

  const tabs = useMemo(() => {
    if (!content) return []

    const next: Array<{ id: FormulaTab; label: string; count: number }> = []
    if (content.formulas.length > 0) next.push({ id: 'formulas', label: '公式', count: content.formulas.length })
    if (content.derivations.length > 0) next.push({ id: 'derivations', label: '推导', count: content.derivations.length })
    if ((content.insights?.length ?? 0) > 0) next.push({ id: 'insights', label: '观察', count: content.insights?.length ?? 0 })
    return next
  }, [content])

  const cards = useMemo(() => {
    if (!content) return []
    if (activeTab === 'derivations') return content.derivations
    if (activeTab === 'insights') return content.insights ?? []
    return content.formulas
  }, [activeTab, content])

  if (!content) return null

  return (
    <aside className={`formula-dock ${open ? 'is-open' : ''}`}>
      <div className="formula-dock-head">
        <div>
          <div className="formula-dock-kicker">教学阅读</div>
          <h3>公式 / 推导</h3>
        </div>
        <button type="button" className="formula-dock-close" onClick={onClose}>
          收起
        </button>
      </div>

      <div className="formula-dock-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`formula-dock-tab ${activeTab === tab.id ? 'is-active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            <span>{tab.count}</span>
          </button>
        ))}
      </div>

      <div className="formula-dock-grip" aria-hidden="true">
        <span />
      </div>

      <div className="formula-dock-body">
        {cards.map((card) => (
          <div key={card.id} className="formula-card">
            <div className="formula-card-title">{card.title}</div>
            <BlockMath math={card.latex} />
            {card.note && <p className="formula-card-note">{card.note}</p>}
          </div>
        ))}
      </div>
    </aside>
  )
}
