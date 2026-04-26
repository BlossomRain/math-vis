import './Overlay.css'

interface CanvasToolbarProps {
  canShowLegend: boolean
  showLegend: boolean
  viewSummary?: string
  onToggleLegend: () => void
  onResetView: () => void
}

export default function CanvasToolbar({
  canShowLegend,
  showLegend,
  viewSummary,
  onToggleLegend,
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
    </div>
  )
}
