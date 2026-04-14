import { useMemo, useState } from 'react'
import { SceneConfig } from '../../types/config'
import './Panels.css'

interface FunctionCompareListProps {
  config: SceneConfig
  onToggleObjectVisibility: (objectId: string) => void
  onAddUserFunction: (expr: string) => void
  onUpdateUserFunction: (objectId: string, updates: { expr?: string; color?: string }) => void
  onRemoveUserFunction: (objectId: string) => void
}

function getPresets(configId: string) {
  if (configId === 'harmonic-composition') {
    return ['sin(x)', 'cos(x)', 'sqrt(a^2 + b^2) * sin(x + atan2(a, b))']
  }

  return ['sin(x)', 'cos(x)', 'sin(x + b)', 'cos(x + b)']
}

export default function FunctionCompareList({
  config,
  onToggleObjectVisibility,
  onAddUserFunction,
  onUpdateUserFunction,
  onRemoveUserFunction
}: FunctionCompareListProps) {
  const [draftExpr, setDraftExpr] = useState('')
  const presets = getPresets(config.id)

  const userLayers = useMemo(
    () => config.objects.filter((obj) => obj.type === 'function' && obj.id.startsWith('user-')),
    [config.objects]
  )

  return (
    <div className="panel-card">
      <h3 className="panel-title">函数对比（用户层）</h3>
      <p className="panel-note">
        系统默认曲线已经直接绘制在图上。这里专门给你临时追加对比函数，用来做观察、截图和教学标注。
      </p>

      <div className="draft-row">
        <input
          className="draft-input"
          value={draftExpr}
          onChange={(e) => setDraftExpr(e.target.value)}
          placeholder="例如：sin(x + 0.5)"
        />
        <button
          className="draft-btn"
          type="button"
          onClick={() => {
            const nextExpr = draftExpr.trim()
            if (!nextExpr) return
            onAddUserFunction(nextExpr)
            setDraftExpr('')
          }}
        >
          添加
        </button>
      </div>

      <div className="preset-row">
        {presets.map((preset) => (
          <button
            key={preset}
            className="preset-chip"
            type="button"
            onClick={() => onAddUserFunction(preset)}
          >
            {preset}
          </button>
        ))}
      </div>

      {userLayers.length === 0 ? (
        <p className="panel-note">暂无用户函数。你可以直接输入表达式做额外对比。</p>
      ) : (
        userLayers.map((obj) => (
          <div key={obj.id} className="layer-card">
            <div className="layer-top">
              <button
                className="layer-toggle"
                onClick={() => onToggleObjectVisibility(obj.id)}
                type="button"
              >
                <span className="layer-dot" style={{ background: obj.style.color }} />
                <span className="layer-state">{obj.visible ? '显示' : '隐藏'}</span>
              </button>
              <button className="layer-delete" type="button" onClick={() => onRemoveUserFunction(obj.id)}>
                删除
              </button>
            </div>
            <input
              className="layer-input"
              value={obj.expr ?? ''}
              onChange={(e) => onUpdateUserFunction(obj.id, { expr: e.target.value })}
            />
            <div className="layer-controls">
              <label className="color-control">
                颜色
                <input
                  type="color"
                  value={obj.style.color}
                  onChange={(e) => onUpdateUserFunction(obj.id, { color: e.target.value })}
                />
              </label>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
