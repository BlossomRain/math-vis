import { SceneConfig } from '../types/config'
import './ControlPanel.css'

interface ControlPanelProps {
  config: SceneConfig
  onParamsChange: (params: Record<string, number>) => void
  onToggleObjectVisibility: (objectId: string) => void
  onImport?: (file: File) => void
}

export default function ControlPanel({ config, onParamsChange, onToggleObjectVisibility, onImport }: ControlPanelProps) {
  const { params, controls, objects } = config

  const handleSliderChange = (param: string, value: number) => {
    onParamsChange({ [param]: value })
  }

  const handleExport = () => {
    const dataStr = JSON.stringify(config, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    const exportFileDefaultName = `${config.id}.json`
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) onImport?.(file)
    event.target.value = ''
  }

  return (
    <div className="control-panel">
      <h2 className="control-panel-title">{config.title}</h2>

      <div className="control-section">
        <h3 className="control-section-title">参数控制</h3>
        {controls.map(control => (
          <div key={control.param} className="slider-item">
            <div className="slider-head">
              <label className="slider-label">{control.label}</label>
              <span className="slider-value">
                {params[control.param]?.toFixed(2)}
              </span>
            </div>
            <input
              className="slider-input"
              type="range"
              min={control.min}
              max={control.max}
              step={control.step}
              value={params[control.param] || 0}
              onChange={(e) => handleSliderChange(control.param, parseFloat(e.target.value))}
            />
          </div>
        ))}
      </div>

      <div className="control-section">
        <h3 className="control-section-title">函数列表</h3>
        {objects.map(obj => (
          <div
            key={obj.id}
            className={`object-item ${obj.visible ? '' : 'object-item-hidden'}`}
            onClick={() => onToggleObjectVisibility(obj.id)}
          >
            <div className="object-color" style={{ background: obj.style.color }} />
            <span className="object-label">
              {obj.expr}
            </span>
            <input
              className="object-checkbox"
              type="checkbox"
              checked={obj.visible}
              onChange={() => {}}
            />
          </div>
        ))}
      </div>

      <div className="control-section">
        <h3 className="control-section-title">配置操作</h3>
        <button
          className="panel-btn panel-btn-primary"
          onClick={handleExport}
        >
          导出配置
        </button>
        <label className="panel-btn panel-btn-ghost">
          导入配置
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            className="import-input"
          />
        </label>
      </div>
    </div>
  )
}
