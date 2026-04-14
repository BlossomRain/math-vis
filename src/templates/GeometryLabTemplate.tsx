import { useMemo, useState } from 'react'
import Canvas2D from '../components/Canvas2D'
import ObservationPanel from '../components/panels/ObservationPanel'
import KeyPointsPanel from '../components/panels/KeyPointsPanel'
import FunctionCompareList from '../components/panels/FunctionCompareList'
import CanvasToolbar from '../components/overlay/CanvasToolbar'
import LegendCard from '../components/overlay/LegendCard'
import FormulaDock from '../components/overlay/FormulaDock'
import { GeometryLabPageModel } from '../core/model'
import { SceneConfig } from '../types/config'
import { ThemeConfig } from '../data/theme'
import { GlobalConfig } from '../data/globalConfig'
import './GeometryLabTemplate.css'

interface GeometryLabTemplateProps {
  config: SceneConfig
  pageModel?: GeometryLabPageModel
  theme: ThemeConfig
  globalConfig: GlobalConfig
  captureMode: boolean
  onParamsChange: (params: Record<string, number>) => void
  onToggleObjectVisibility: (objectId: string) => void
  onAddUserFunction: (expr: string) => void
  onUpdateUserFunction: (objectId: string, updates: { expr?: string; color?: string }) => void
  onRemoveUserFunction: (objectId: string) => void
  onDownloadImage: () => void
}

export default function GeometryLabTemplate({
  config,
  pageModel,
  theme,
  globalConfig,
  captureMode,
  onParamsChange,
  onToggleObjectVisibility,
  onAddUserFunction,
  onUpdateUserFunction,
  onRemoveUserFunction,
  onDownloadImage
}: GeometryLabTemplateProps) {
  const [showLegend, setShowLegend] = useState(true)
  const [showFormulaDock, setShowFormulaDock] = useState(false)
  const [viewBounds, setViewBounds] = useState(config.scene.bounds)
  const [viewResetToken, setViewResetToken] = useState(0)

  const visibleLegendItems = useMemo(() => {
    const items = pageModel?.legendItems ?? []
    return items.filter((item) => {
      if (!item.objectId) return true
      const target = config.objects.find((obj) => obj.id === item.objectId)
      return target?.visible ?? false
    })
  }, [config.objects, pageModel?.legendItems])

  const canShowLegend = visibleLegendItems.length > 0
  const viewSummary = `x:[${viewBounds.xMin.toFixed(2)}, ${viewBounds.xMax.toFixed(2)}] y:[${viewBounds.yMin.toFixed(2)}, ${viewBounds.yMax.toFixed(2)}]`

  return (
    <main className="app-main geometry-lab-main">
      <div className="canvas-container geometry-canvas-shell" style={{ background: theme.colors.background }}>
        <div className="canvas-meta">
          <span className="canvas-title">{config.title}</span>
          <button className="capture-button" onClick={onDownloadImage}>
            导出 PNG
          </button>
        </div>

        <div className="canvas-overlay-host">
          <Canvas2D
            config={config}
            theme={theme}
            globalConfig={globalConfig}
            canvasId="main-plot-canvas"
            preserveAspectRatio
            onViewBoundsChange={setViewBounds}
            resetToken={viewResetToken}
          />

          {!captureMode && (
            <>
              <CanvasToolbar
                canShowLegend={canShowLegend}
                showLegend={showLegend}
                showFormulaDock={showFormulaDock}
                viewSummary={viewSummary}
                onToggleLegend={() => setShowLegend((prev) => !prev)}
                onToggleFormulaDock={() => setShowFormulaDock((prev) => !prev)}
                onResetView={() => setViewResetToken((prev) => prev + 1)}
              />
              {canShowLegend && showLegend && <LegendCard items={visibleLegendItems} />}
              <FormulaDock
                content={pageModel?.formulaDock}
                open={showFormulaDock}
                onClose={() => setShowFormulaDock(false)}
              />
            </>
          )}
        </div>
      </div>

      {!captureMode && (
        <aside className="geometry-lab-side">
          <div className="panel-card">
            <h3 className="panel-title">参数控制</h3>
            {config.controls.map((control) => (
              <div className="geo-slider-row" key={control.param}>
                <div className="geo-slider-head">
                  <span>{control.label}</span>
                  <strong>{(config.params[control.param] ?? 0).toFixed(2)}</strong>
                </div>
                {(() => {
                  const maxValue = control.param === 'N' ? Math.max(1, Math.floor(config.params.maxN ?? control.max)) : control.max
                  const currentValue = config.params[control.param] ?? 0
                  const safeValue = Math.min(currentValue, maxValue)

                  return (
                    <input
                      className="geo-slider"
                      type="range"
                      min={control.min}
                      max={maxValue}
                      step={control.step}
                      value={safeValue}
                      onChange={(e) => onParamsChange({ [control.param]: parseFloat(e.target.value) })}
                    />
                  )
                })()}
              </div>
            ))}
          </div>

          <ObservationPanel config={config} />
          <KeyPointsPanel config={config} />
          <FunctionCompareList
            config={config}
            onToggleObjectVisibility={onToggleObjectVisibility}
            onAddUserFunction={onAddUserFunction}
            onUpdateUserFunction={onUpdateUserFunction}
            onRemoveUserFunction={onRemoveUserFunction}
          />
        </aside>
      )}
    </main>
  )
}
