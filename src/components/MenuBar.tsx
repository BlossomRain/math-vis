import { useState } from 'react'
import { getTheme, toggleTheme, ThemeConfig } from '../data/theme'
import './MenuBar.css'

interface MenuBarProps {
  onThemeChange?: (theme: ThemeConfig) => void
  onExport?: () => void
  onImport?: (file: File) => void
  onOpenGlobalConfig?: () => void
}

export default function MenuBar({ onThemeChange, onExport, onImport, onOpenGlobalConfig }: MenuBarProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [showSettings, setShowSettings] = useState(false)
  const [theme, setTheme] = useState(getTheme())

  const handleToggleTheme = () => {
    const newTheme = toggleTheme()
    setTheme(newTheme)
    onThemeChange?.(newTheme)
  }

  const handleImportClick = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) onImport?.(file)
    }
    input.click()
  }

  return (
    <>
      <div className="menu-bar">
        <div className="menu-left">
          <div 
            className="menu-item"
            onMouseEnter={() => setActiveMenu('file')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <span>文件</span>
            {activeMenu === 'file' && (
              <div className="menu-dropdown">
                <div className="menu-option" onClick={onExport}>
                  导出配置
                </div>
                <div className="menu-option" onClick={handleImportClick}>
                  导入配置
                </div>
              </div>
            )}
          </div>
          
          <div 
            className="menu-item"
            onMouseEnter={() => setActiveMenu('view')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <span>视图</span>
            {activeMenu === 'view' && (
              <div className="menu-dropdown">
                <div className="menu-option" onClick={handleToggleTheme}>
                  切换主题 ({theme.colors.background === '#141414' ? '深色' : '浅色'})
                </div>
                <div className="menu-option" onClick={onOpenGlobalConfig}>
                  全局配置
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="menu-right">
          <span className="theme-indicator">
            {theme.colors.background === '#141414' ? '🌙' : '☀️'}
          </span>
        </div>
      </div>

      {showSettings && (
        <div className="settings-modal" onClick={() => setShowSettings(false)}>
          <div className="settings-content" onClick={e => e.stopPropagation()}>
            <h3>样式设置</h3>
            <div className="settings-section">
              <h4>线条样式</h4>
              <div className="setting-item">
                <label>默认线宽</label>
                <input 
                  type="range" 
                  min="1" 
                  max="5" 
                  step="0.5"
                  value={theme.line.width}
                  readOnly
                />
                <span>{theme.line.width}px</span>
              </div>
              <div className="setting-item">
                <label>网格线宽</label>
                <input 
                  type="range" 
                  min="0.5" 
                  max="3" 
                  step="0.5"
                  value={theme.line.gridWidth}
                  readOnly
                />
                <span>{theme.line.gridWidth}px</span>
              </div>
            </div>
            <div className="settings-section">
              <h4>颜色</h4>
              <div className="color-list">
                {theme.colors.functions.map((color, i) => (
                  <div 
                    key={i} 
                    className="color-item"
                    style={{ backgroundColor: color }}
                    title={`函数 ${i + 1}`}
                  />
                ))}
              </div>
            </div>
            <button className="close-btn" onClick={() => setShowSettings(false)}>
              关闭
            </button>
          </div>
        </div>
      )}
    </>
  )
}
