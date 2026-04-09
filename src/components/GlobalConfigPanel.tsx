import { useState, useCallback } from 'react'
import { GlobalConfig, saveGlobalConfig, exportGlobalConfig, importGlobalConfig, resetGlobalConfig } from '../data/globalConfig'
import Canvas2D from './Canvas2D'
import { SceneConfig } from '../types/config'
import './GlobalConfigPanel.css'

interface GlobalConfigPanelProps {
  config: GlobalConfig
  onChange: (config: GlobalConfig) => void
  onSave?: () => void
  onCancel?: () => void
}

// 预览用的示例配置
const previewConfig: SceneConfig = {
  id: 'preview',
  title: '预览',
  scene: {
    type: '2d',
    bounds: { xMin: -10, xMax: 10, yMin: -5, yMax: 5 }
  },
  params: { a: 1, b: 0 },
  objects: [
    {
      id: 'func1',
      type: 'function',
      expr: 'sin(x)',
      style: { color: '#1677ff', lineWidth: 2 },
      visible: true
    },
    {
      id: 'func2',
      type: 'function',
      expr: 'cos(x)',
      style: { color: '#52c41a', lineWidth: 2 },
      visible: true
    }
  ],
  controls: []
}

export default function GlobalConfigPanel({ config, onChange, onSave, onCancel }: GlobalConfigPanelProps) {
  const [localConfig, setLocalConfig] = useState<GlobalConfig>(config)

  const updateConfig = useCallback((updates: Partial<GlobalConfig>) => {
    const newConfig = { ...localConfig, ...updates }
    setLocalConfig(newConfig)
    onChange(newConfig)
    saveGlobalConfig(newConfig)
  }, [localConfig, onChange])

  const updateTheme = useCallback((themeUpdates: Partial<GlobalConfig['theme']>) => {
    updateConfig({
      theme: { ...localConfig.theme, ...themeUpdates }
    })
  }, [localConfig, updateConfig])

  const updateCanvas = useCallback((canvasUpdates: Partial<GlobalConfig['canvas']>) => {
    updateConfig({
      canvas: { ...localConfig.canvas, ...canvasUpdates }
    })
  }, [localConfig, updateConfig])

  const handleExport = () => {
    exportGlobalConfig(localConfig)
  }

  const handleImport = async () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const imported = await importGlobalConfig(file)
        if (imported) {
          setLocalConfig(imported)
          onChange(imported)
          saveGlobalConfig(imported)
          alert('配置导入成功')
        } else {
          alert('导入失败：无效的配置文件')
        }
      }
    }
    input.click()
  }

  const handleReset = () => {
    if (confirm('确定要重置为默认配置吗？')) {
      const defaultConfig = resetGlobalConfig()
      setLocalConfig(defaultConfig)
      onChange(defaultConfig)
    }
  }

  const { theme, canvas } = localConfig

  return (
    <div className="global-config-panel">
      <div className="config-sidebar">
        <h2>全局配置</h2>
        
        <div className="config-section">
          <h3>线条样式</h3>
          <div className="config-item">
            <label>默认线宽</label>
            <input
              type="range"
              min="1"
              max="5"
              step="0.5"
              value={theme.line.width}
              onChange={(e) => updateTheme({ line: { ...theme.line, width: parseFloat(e.target.value) } })}
            />
            <span>{theme.line.width}px</span>
          </div>
          <div className="config-item">
            <label>网格线宽</label>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.5"
              value={theme.line.gridWidth}
              onChange={(e) => updateTheme({ line: { ...theme.line, gridWidth: parseFloat(e.target.value) } })}
            />
            <span>{theme.line.gridWidth}px</span>
          </div>
          <div className="config-item">
            <label>坐标轴线宽</label>
            <input
              type="range"
              min="1"
              max="4"
              step="0.5"
              value={theme.line.axisWidth}
              onChange={(e) => updateTheme({ line: { ...theme.line, axisWidth: parseFloat(e.target.value) } })}
            />
            <span>{theme.line.axisWidth}px</span>
          </div>
        </div>

        <div className="config-section">
          <h3>颜色</h3>
          <div className="config-item">
            <label>主题色</label>
            <input
              type="color"
              value={theme.colors.primary}
              onChange={(e) => updateTheme({ colors: { ...theme.colors, primary: e.target.value } })}
            />
          </div>
          <div className="config-item">
            <label>网格颜色</label>
            <input
              type="color"
              value={theme.colors.grid}
              onChange={(e) => updateTheme({ colors: { ...theme.colors, grid: e.target.value } })}
            />
          </div>
          <div className="config-item">
            <label>坐标轴颜色</label>
            <input
              type="color"
              value={theme.colors.axis}
              onChange={(e) => updateTheme({ colors: { ...theme.colors, axis: e.target.value } })}
            />
          </div>
          <div className="config-item">
            <label>文字颜色</label>
            <input
              type="color"
              value={theme.colors.text}
              onChange={(e) => updateTheme({ colors: { ...theme.colors, text: e.target.value } })}
            />
          </div>
        </div>

        <div className="config-section">
          <h3>画布设置</h3>
          <div className="config-item checkbox">
            <label>
              <input
                type="checkbox"
                checked={canvas.showGrid}
                onChange={(e) => updateCanvas({ showGrid: e.target.checked })}
              />
              显示网格
            </label>
          </div>
          <div className="config-item">
            <label>网格密度</label>
            <input
              type="range"
              min="5"
              max="20"
              step="1"
              value={canvas.gridDensity}
              onChange={(e) => updateCanvas({ gridDensity: parseInt(e.target.value) })}
            />
            <span>{canvas.gridDensity}</span>
          </div>
        </div>

        <div className="config-actions">
          <button className="btn-primary" onClick={handleExport}>
            导出配置
          </button>
          <button className="btn-secondary" onClick={handleImport}>
            导入配置
          </button>
          <button className="btn-danger" onClick={handleReset}>
            重置默认
          </button>
        </div>

        <div className="config-actions-row">
          <button className="btn-save" onClick={onSave}>
            保存
          </button>
          <button className="btn-cancel" onClick={onCancel}>
            返回
          </button>
        </div>
      </div>

      <div className="config-preview">
        <h3>实时预览</h3>
        <div className="preview-canvas">
          <Canvas2D 
            config={previewConfig} 
            theme={theme}
          />
        </div>
      </div>
    </div>
  )
}
