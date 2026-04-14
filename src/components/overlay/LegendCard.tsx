import { LegendItem } from '../../core/model'
import './Overlay.css'

interface LegendCardProps {
  items: LegendItem[]
}

function LegendSwatch({ kind, color }: { kind: LegendItem['kind']; color: string }) {
  return (
    <span
      className={`legend-swatch legend-swatch-line ${kind === 'dashed-line' ? 'is-dashed' : ''}`}
      style={{ borderColor: color }}
    />
  )
}

export default function LegendCard({ items }: LegendCardProps) {
  if (items.length === 0) return null

  return (
    <div className="legend-card">
      <div className="legend-head">
        <strong>Legend</strong>
        <span>{items.length} 条</span>
      </div>
      <div className="legend-list">
        {items.map((item) => (
          <div key={item.id} className="legend-item">
            <LegendSwatch kind={item.kind} color={item.color} />
            <div className="legend-copy">
              <div className="legend-label">{item.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
