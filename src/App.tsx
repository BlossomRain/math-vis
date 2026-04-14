import { useState, useCallback, useEffect } from 'react'
import Canvas2D from './components/Canvas2D'
import ControlPanel from './components/ControlPanel'
import Sidebar from './components/Sidebar'
import MenuBar from './components/MenuBar'
import GlobalConfigPanel from './components/GlobalConfigPanel'
import GeometryLabTemplate from './templates/GeometryLabTemplate'
import { Page, findPageById, getFirstPage } from './data/chapters'
import { SceneConfig } from './types/config'
import { ThemeConfig, darkTheme, defaultTheme } from './data/theme'
import { GlobalConfig, loadGlobalConfig, saveGlobalConfig, createDefaultGlobalConfig } from './data/globalConfig'
import { adaptGeometryLabModelToSceneConfig } from './core/model'
import './App.css'

function App() {
  const getPageSceneConfig = (page: Page): SceneConfig => (
    page.pageModel ? adaptGeometryLabModelToSceneConfig(page.pageModel) : page.config!
  )

  const cloneGlobalConfig = (source: GlobalConfig): GlobalConfig => ({
    theme: {
      ...source.theme,
      colors: {
        ...source.theme.colors,
        functions: [...source.theme.colors.functions]
      },
      line: { ...source.theme.line },
      canvas: {
        ...source.theme.canvas,
        defaultBounds: { ...source.theme.canvas.defaultBounds }
      },
      ui: { ...source.theme.ui }
    },
    canvas: {
      ...source.canvas,
      defaultBounds: { ...source.canvas.defaultBounds }
    }
  })

  const createConfigFromPage = useCallback((page: Page): SceneConfig => ({
    ...getPageSceneConfig(page),
    params: { ...getPageSceneConfig(page).params },
    objects: getPageSceneConfig(page).objects.map((obj) => ({
      ...obj,
      style: { ...obj.style }
    })),
    controls: [...getPageSceneConfig(page).controls],
    scene: {
      ...getPageSceneConfig(page).scene,
      bounds: { ...getPageSceneConfig(page).scene.bounds }
    }
  }), [])

  const [currentPage, setCurrentPage] = useState<Page>(getFirstPage)
  const [config, setConfig] = useState<SceneConfig>(createConfigFromPage(getFirstPage()))
  const [theme, setTheme] = useState<ThemeConfig>(defaultTheme)
  const [globalConfig, setGlobalConfig] = useState<GlobalConfig>(loadGlobalConfig())
  const [showGlobalConfig, setShowGlobalConfig] = useState(false)
  const [globalConfigSnapshot, setGlobalConfigSnapshot] = useState<GlobalConfig>(createDefaultGlobalConfig())
  const [captureMode, setCaptureMode] = useState(false)

  const isValidSceneConfig = (value: unknown): value is SceneConfig => {
    if (!value || typeof value !== 'object') return false
    const candidate = value as Partial<SceneConfig>
    return (
      typeof candidate.id === 'string' &&
      typeof candidate.title === 'string' &&
      !!candidate.scene &&
      typeof candidate.scene === 'object' &&
      !!candidate.scene.bounds &&
      typeof candidate.scene.bounds === 'object' &&
      typeof candidate.scene.type === 'string' &&
      typeof candidate.scene.bounds.xMin === 'number' &&
      typeof candidate.scene.bounds.xMax === 'number' &&
      typeof candidate.scene.bounds.yMin === 'number' &&
      typeof candidate.scene.bounds.yMax === 'number' &&
      !!candidate.params &&
      typeof candidate.params === 'object' &&
      Array.isArray(candidate.objects) &&
      Array.isArray(candidate.controls)
    )
  }

  // 初始化时加载全局配置
  useEffect(() => {
    const loaded = loadGlobalConfig()
    setGlobalConfig(loaded)
    setGlobalConfigSnapshot(cloneGlobalConfig(loaded))
    setTheme(loaded.theme)
  }, [])

  const handlePageSelect = useCallback((page: Page) => {
    setCurrentPage(page)
    setConfig(createConfigFromPage(page))
  }, [createConfigFromPage])

  const handleParamsChange = useCallback((newParams: Record<string, number>) => {
    setConfig(prev => {
      const mergedParams = { ...prev.params, ...newParams }

      if (prev.id === 'sequence-limit') {
        const maxN = Math.max(1, Math.floor(mergedParams.maxN ?? prev.params.maxN ?? 1))
        if (typeof mergedParams.N === 'number') {
          mergedParams.N = Math.min(Math.max(1, Math.floor(mergedParams.N)), maxN)
        } else if (typeof prev.params.N === 'number') {
          mergedParams.N = Math.min(Math.max(1, Math.floor(prev.params.N)), maxN)
        }
      }

      return {
        ...prev,
        params: mergedParams
      }
    })
  }, [])

  const handleToggleTheme = useCallback(() => {
    setGlobalConfig((prev) => {
      const nextTheme = prev.theme.colors.background === darkTheme.colors.background ? defaultTheme : darkTheme
      const nextConfig = { ...prev, theme: nextTheme }
      setTheme(nextTheme)
      saveGlobalConfig(nextConfig)
      return nextConfig
    })
  }, [])

  const handleObjectVisibilityChange = useCallback((objectId: string) => {
    setConfig((prev) => ({
      ...prev,
      objects: prev.objects.map((obj) =>
        obj.id === objectId ? { ...obj, visible: !obj.visible } : obj
      )
    }))
  }, [])

  const handleGlobalConfigChange = useCallback((newConfig: GlobalConfig) => {
    setGlobalConfig(newConfig)
    setTheme(newConfig.theme)
  }, [])

  const handleAddUserFunction = useCallback((expr: string) => {
    const nextId = `user-${Date.now()}`
    setConfig((prev) => ({
      ...prev,
      objects: [
        ...prev.objects,
        {
          id: nextId,
          type: 'function',
          expr,
          visible: true,
          style: {
            color: theme.colors.functions[prev.objects.length % theme.colors.functions.length],
            lineWidth: 2
          }
        }
      ]
    }))
  }, [theme.colors.functions])

  const handleUpdateUserFunction = useCallback((objectId: string, updates: { expr?: string; color?: string }) => {
    setConfig((prev) => ({
      ...prev,
      objects: prev.objects.map((obj) => {
        if (obj.id !== objectId) return obj
        return {
          ...obj,
          expr: updates.expr ?? obj.expr,
          style: {
            ...obj.style,
            color: updates.color ?? obj.style.color
          }
        }
      })
    }))
  }, [])

  const handleRemoveUserFunction = useCallback((objectId: string) => {
    setConfig((prev) => ({
      ...prev,
      objects: prev.objects.filter((obj) => obj.id !== objectId)
    }))
  }, [])

  const handleOpenGlobalConfig = useCallback(() => {
    setGlobalConfigSnapshot(cloneGlobalConfig(globalConfig))
    setShowGlobalConfig(true)
  }, [globalConfig])

  const handleSaveGlobalConfig = useCallback((newConfig: GlobalConfig) => {
    setGlobalConfig(newConfig)
    setTheme(newConfig.theme)
    saveGlobalConfig(newConfig)
    setShowGlobalConfig(false)
  }, [])

  const handleCancelGlobalConfig = useCallback(() => {
    setGlobalConfig(globalConfigSnapshot)
    setTheme(globalConfigSnapshot.theme)
    setShowGlobalConfig(false)
  }, [globalConfigSnapshot])

  const handleToggleCaptureMode = useCallback(() => {
    setCaptureMode((prev) => !prev)
  }, [])

  const handleDownloadImage = useCallback(() => {
    const canvas = document.getElementById('main-plot-canvas') as HTMLCanvasElement | null
    if (!canvas) {
      alert('导出失败：画布未就绪')
      return
    }

    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-')
    const link = document.createElement('a')
    link.href = canvas.toDataURL('image/png')
    link.download = `${config.id}-${timestamp}.png`
    link.click()
  }, [config.id])

  const handleExport = () => {
    const dataStr = JSON.stringify(config, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    const exportFileDefaultName = `${config.id}.json`
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const handleImportSceneConfig = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string) as unknown
        if (!isValidSceneConfig(imported)) {
          alert('导入失败：配置结构不正确')
          return
        }
        const nextConfig = createConfigFromPage({
          id: imported.id,
          title: imported.title,
          config: imported
        })
        setConfig(nextConfig)
        const matchedPage = findPageById(nextConfig.id)
        setCurrentPage(
          matchedPage || {
            id: nextConfig.id,
            title: `${nextConfig.title}（导入）`,
            config: nextConfig
          }
        )
        alert('配置已导入并应用')
      } catch {
        alert('导入失败：无效的 JSON 文件')
      }
    }
    reader.readAsText(file)
  }

  const useGeometryLabTemplate = currentPage.template === 'geometry-lab'

  return (
    <div className="app" style={{ background: theme.colors.background }}>
      <header className="app-header" style={{ background: theme.colors.primary }}>
        <h1>数学可视化系统</h1>
      </header>
      <MenuBar 
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onExport={handleExport}
        onImport={handleImportSceneConfig}
        onOpenGlobalConfig={handleOpenGlobalConfig}
        onToggleCaptureMode={handleToggleCaptureMode}
        captureMode={captureMode}
        onDownloadImage={handleDownloadImage}
      />
      
      {showGlobalConfig ? (
        <div className="global-config-content">
          <GlobalConfigPanel 
            config={globalConfig}
            onChange={handleGlobalConfigChange}
            onSave={handleSaveGlobalConfig}
            onCancel={handleCancelGlobalConfig}
          />
        </div>
      ) : (
        <div className={`app-body ${captureMode ? 'capture-mode' : ''}`}>
          {!captureMode && (
            <Sidebar 
              currentPageId={currentPage.id}
              onPageSelect={handlePageSelect}
            />
          )}
          {useGeometryLabTemplate ? (
            <GeometryLabTemplate
              config={config}
              pageModel={currentPage.pageModel}
              theme={theme}
              globalConfig={globalConfig}
              captureMode={captureMode}
              onParamsChange={handleParamsChange}
              onToggleObjectVisibility={handleObjectVisibilityChange}
              onAddUserFunction={handleAddUserFunction}
              onUpdateUserFunction={handleUpdateUserFunction}
              onRemoveUserFunction={handleRemoveUserFunction}
              onDownloadImage={handleDownloadImage}
            />
          ) : (
            <main className="app-main">
              <div className="canvas-container" style={{ background: theme.colors.background }}>
                <div className="canvas-meta">
                  <span className="canvas-title">{config.title}</span>
                  <button className="capture-button" onClick={handleDownloadImage}>
                    导出 PNG
                  </button>
                </div>
                <Canvas2D config={config} theme={theme} globalConfig={globalConfig} canvasId="main-plot-canvas" />
              </div>
              {!captureMode && (
                <div className="control-container" style={{ background: theme.colors.background === '#141414' ? '#1f1f1f' : '#fafafa' }}>
                  <ControlPanel 
                    config={config} 
                    onParamsChange={handleParamsChange}
                    onToggleObjectVisibility={handleObjectVisibilityChange}
                    onImport={handleImportSceneConfig}
                  />
                </div>
              )}
            </main>
          )}
        </div>
      )}
    </div>
  )
}

export default App
