import { ThemeConfig, defaultTheme } from './theme'

export interface GlobalConfig {
  theme: ThemeConfig
  canvas: {
    showGrid: boolean
    gridDensity: number // 网格密度，每单位多少条线
    defaultBounds: {
      xMin: number
      xMax: number
      yMin: number
      yMax: number
    }
  }
}

export const defaultGlobalConfig: GlobalConfig = {
  theme: defaultTheme,
  canvas: {
    showGrid: true,
    gridDensity: 10,
    defaultBounds: {
      xMin: -10,
      xMax: 10,
      yMin: -5,
      yMax: 5
    }
  }
}

const STORAGE_KEY = 'math-vis-global-config'

// 加载全局配置
export function loadGlobalConfig(): GlobalConfig {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (e) {
    console.error('加载全局配置失败:', e)
  }
  return { ...defaultGlobalConfig }
}

// 保存全局配置
export function saveGlobalConfig(config: GlobalConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
  } catch (e) {
    console.error('保存全局配置失败:', e)
  }
}

// 导出配置为JSON文件
export function exportGlobalConfig(config: GlobalConfig, filename?: string): void {
  const dataStr = JSON.stringify(config, null, 2)
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
  const exportFileDefaultName = filename || 'global-config.json'
  const linkElement = document.createElement('a')
  linkElement.setAttribute('href', dataUri)
  linkElement.setAttribute('download', exportFileDefaultName)
  linkElement.click()
}

// 从文件导入配置
export async function importGlobalConfig(file: File): Promise<GlobalConfig | null> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string)
        // 简单验证配置结构
        if (imported.theme && imported.canvas) {
          resolve(imported as GlobalConfig)
        } else {
          console.error('无效的配置文件格式')
          resolve(null)
        }
      } catch (err) {
        console.error('解析配置文件失败:', err)
        resolve(null)
      }
    }
    reader.onerror = () => resolve(null)
    reader.readAsText(file)
  })
}

// 重置为默认配置
export function resetGlobalConfig(): GlobalConfig {
  const config = { ...defaultGlobalConfig }
  saveGlobalConfig(config)
  return config
}
