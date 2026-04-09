import { useState } from 'react'
import { SceneConfig } from '../types/config'

interface ControlPanelProps {
  config: SceneConfig
  onParamsChange: (params: Record<string, number>) => void
}

export default function ControlPanel({ config, onParamsChange }: ControlPanelProps) {
  const { params, controls, objects: initialObjects } = config
  const [objects, setObjects] = useState(initialObjects)

  const handleSliderChange = (param: string, value: number) => {
    onParamsChange({ [param]: value })
  }

  const toggleObjectVisibility = (id: string) => {
    setObjects(prev => prev.map(obj =>
      obj.id === id ? { ...obj, visible: !obj.visible } : obj
    ))
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
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string)
        console.log('导入配置:', imported)
        alert('配置已导入（控制台查看）')
      } catch {
        alert('导入失败：无效的 JSON 文件')
      }
    }
    reader.readAsText(file)
    event.target.value = ''
  }

  return (
    <div style={{ padding: '16px' }}>
      <h2 style={{ fontSize: '16px', marginBottom: '16px', color: '#333' }}>
        {config.title}
      </h2>

      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '14px', marginBottom: '12px', color: '#666' }}>
          参数控制
        </h3>
        {controls.map(control => (
          <div key={control.param} style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <label style={{ fontSize: '13px', color: '#333' }}>{control.label}</label>
              <span style={{ fontSize: '13px', color: '#1677ff', fontWeight: 500 }}>
                {params[control.param]?.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min={control.min}
              max={control.max}
              step={control.step}
              value={params[control.param] || 0}
              onChange={(e) => handleSliderChange(control.param, parseFloat(e.target.value))}
              style={{
                width: '100%',
                height: '4px',
                WebkitAppearance: 'none',
                background: '#e0e0e0',
                borderRadius: '2px',
                outline: 'none',
                cursor: 'pointer'
              }}
            />
          </div>
        ))}
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '14px', marginBottom: '12px', color: '#666' }}>
          函数列表
        </h3>
        {objects.map(obj => (
          <div
            key={obj.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 12px',
              marginBottom: '8px',
              background: '#fff',
              borderRadius: '4px',
              border: '1px solid #e8e8e8',
              cursor: 'pointer',
              opacity: obj.visible ? 1 : 0.5
            }}
            onClick={() => toggleObjectVisibility(obj.id)}
          >
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '2px',
                background: obj.style.color,
                marginRight: '8px'
              }}
            />
            <span style={{ fontSize: '13px', color: '#333', flex: 1 }}>
              {obj.expr}
            </span>
            <input
              type="checkbox"
              checked={obj.visible}
              onChange={() => {}}
              style={{ marginLeft: '8px' }}
            />
          </div>
        ))}
      </div>

      <div>
        <h3 style={{ fontSize: '14px', marginBottom: '12px', color: '#666' }}>
          配置操作
        </h3>
        <button
          onClick={handleExport}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '8px',
            background: '#1677ff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '13px'
          }}
        >
          导出配置
        </button>
        <label
          style={{
            display: 'block',
            width: '100%',
            padding: '10px',
            background: '#fff',
            color: '#333',
            border: '1px solid #d9d9d9',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '13px',
            textAlign: 'center'
          }}
        >
          导入配置
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            style={{ display: 'none' }}
          />
        </label>
      </div>
    </div>
  )
}
