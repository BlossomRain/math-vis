import { useState } from 'react'
import { ThemeConfig } from '../data/theme'
import './MenuBar.css'

interface MenuBarProps {
  theme: ThemeConfig
  onToggleTheme?: () => void
  onExport?: () => void
  onImport?: (file: File) => void
  onOpenGlobalConfig?: () => void
  onToggleCaptureMode?: () => void
  captureMode?: boolean
  onDownloadImage?: () => void
}

export default function MenuBar({
  theme,
  onToggleTheme,
  onExport,
  onImport,
  onOpenGlobalConfig,
  onToggleCaptureMode,
  captureMode = false,
  onDownloadImage
}: MenuBarProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  const handleToggleTheme = () => {
    onToggleTheme?.()
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
              <div className="menu-option" onClick={onToggleCaptureMode}>
                {captureMode ? '退出截图模式' : '进入截图模式'}
              </div>
              <div className="menu-option" onClick={onOpenGlobalConfig}>
                全局配置
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="menu-right">
        <button className="quick-action" onClick={onDownloadImage}>
          导出 PNG
        </button>
        <span className="theme-indicator">
          {theme.colors.background === '#141414' ? '🌙' : '☀️'}
        </span>
      </div>
    </div>
  )
}
