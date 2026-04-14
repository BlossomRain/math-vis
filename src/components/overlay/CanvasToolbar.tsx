import './Overlay.css'

interface CanvasToolbarProps {
  canShowLegend: boolean
  showLegend: boolean
  showFormulaDock: boolean
  viewSummary?: string
  onToggleLegend: () => void
  onToggleFormulaDock: () => void
  onResetView: () => void
}

export default function CanvasToolbar({
  canShowLegend,
  showLegend,
  showFormulaDock,
  viewSummary,
  onToggleLegend,
  onToggleFormulaDock,
  onResetView
}: CanvasToolbarProps) {
  return (
    <div className="canvas-toolbar">
      {viewSummary && <div className="canvas-view-summary">{viewSummary}</div>}
      <button
        type="button"
        className="canvas-toolbar-btn"
        onClick={onResetView}
      >
        重置视图
      </button>
      {canShowLegend && (
        <button
          type="button"
          className={`canvas-toolbar-btn ${showLegend ? 'is-active' : ''}`}
          onClick={onToggleLegend}
        >
          Legend
        </button>
      )}
      <button
        type="button"
        className={`canvas-toolbar-btn ${showFormulaDock ? 'is-active' : ''}`}
        onClick={onToggleFormulaDock}
      >
        公式
      </button>
    </div>
  )
}
