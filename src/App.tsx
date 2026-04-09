import { useState, useCallback, useEffect } from 'react'
import Canvas2D from './components/Canvas2D'
import ControlPanel from './components/ControlPanel'
import Sidebar from './components/Sidebar'
import MenuBar from './components/MenuBar'
import GlobalConfigPanel from './components/GlobalConfigPanel'
import { Page, getFirstPage } from './data/chapters'
import { SceneConfig } from './types/config'
import { ThemeConfig, getTheme, toggleTheme } from './data/theme'
import { GlobalConfig, loadGlobalConfig, saveGlobalConfig } from './data/globalConfig'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(getFirstPage)
  const [config, setConfig] = useState<SceneConfig>(getFirstPage().config)
  const [theme, setTheme] = useState<ThemeConfig>(getTheme())
  const [globalConfig, setGlobalConfig] = useState<GlobalConfig>(loadGlobalConfig())
  const [showGlobalConfig, setShowGlobalConfig] = useState(false)

  // 初始化时加载全局配置
  useEffect(() => {
    const loaded = loadGlobalConfig()
    setGlobalConfig(loaded)
    setTheme(loaded.theme)
  }, [])

  const handlePageSelect = useCallback((page: Page) => {
    setCurrentPage(page)
    setConfig(page.config)
  }, [])

  const handleParamsChange = useCallback((newParams: Record<string, number>) => {
    setConfig(prev => ({
      ...prev,
      params: { ...prev.params, ...newParams }
    }))
  }, [])

  const handleThemeChange = useCallback((newTheme: ThemeConfig) => {
    setTheme(newTheme)
  }, [])

  const handleGlobalConfigChange = useCallback((newConfig: GlobalConfig) => {
    setGlobalConfig(newConfig)
    setTheme(newConfig.theme)
    saveGlobalConfig(newConfig)
  }, [])

  const handleExport = () => {
    const dataStr = JSON.stringify(config, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    const exportFileDefaultName = `${config.id}.json`
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const handleImport = (file: File) => {
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
  }

  return (
    <div className="app" style={{ background: theme.colors.background }}>
      <header className="app-header" style={{ background: theme.colors.primary }}>
        <h1>数学可视化系统</h1>
      </header>
      <MenuBar 
        onThemeChange={handleThemeChange}
        onExport={handleExport}
        onImport={handleImport}
        onOpenGlobalConfig={() => setShowGlobalConfig(true)}
      />
      
      {showGlobalConfig ? (
        <div className="global-config-content">
          <GlobalConfigPanel 
            config={globalConfig}
            onChange={handleGlobalConfigChange}
            onSave={() => setShowGlobalConfig(false)}
            onCancel={() => {
              // 重新加载保存的配置，放弃当前修改
              const saved = loadGlobalConfig()
              setGlobalConfig(saved)
              setTheme(saved.theme)
              setShowGlobalConfig(false)
            }}
          />
        </div>
      ) : (
        <div className="app-body">
          <Sidebar 
            currentPageId={currentPage.id}
            onPageSelect={handlePageSelect}
          />
          <main className="app-main">
            <div className="canvas-container" style={{ background: theme.colors.background }}>
              <Canvas2D config={config} theme={theme} />
            </div>
            <div className="control-container" style={{ background: theme.colors.background === '#141414' ? '#1f1f1f' : '#fafafa' }}>
              <ControlPanel 
                config={config} 
                onParamsChange={handleParamsChange}
              />
            </div>
          </main>
        </div>
      )}
    </div>
  )
}

export default App
