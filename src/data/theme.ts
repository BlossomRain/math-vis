export interface ThemeConfig {
  colors: {
    primary: string
    secondary: string
    background: string
    grid: string
    axis: string
    text: string
    functions: string[]
  }
  line: {
    width: number
    gridWidth: number
    axisWidth: number
  }
  canvas: {
    defaultBounds: {
      xMin: number
      xMax: number
      yMin: number
      yMax: number
    }
    gridSteps: number
  }
  ui: {
    sidebarWidth: number
    controlPanelWidth: number
    headerHeight: number
    menuHeight: number
  }
}

export const defaultTheme: ThemeConfig = {
  colors: {
    primary: '#1677ff',
    secondary: '#52c41a',
    background: '#ffffff',
    grid: '#e0e0e0',
    axis: '#333333',
    text: '#333333',
    functions: [
      '#1677ff', // 蓝
      '#52c41a', // 绿
      '#fa541c', // 橙
      '#722ed1', // 紫
      '#eb2f96', // 粉
      '#13c2c2', // 青
      '#fadb14', // 黄
      '#fa8c16', // 橙黄
    ]
  },
  line: {
    width: 2,
    gridWidth: 1,
    axisWidth: 2
  },
  canvas: {
    defaultBounds: {
      xMin: -10,
      xMax: 10,
      yMin: -5,
      yMax: 5
    },
    gridSteps: 10
  },
  ui: {
    sidebarWidth: 260,
    controlPanelWidth: 320,
    headerHeight: 60,
    menuHeight: 40
  }
}

export const darkTheme: ThemeConfig = {
  ...defaultTheme,
  colors: {
    primary: '#4096ff',
    secondary: '#73d13d',
    background: '#141414',
    grid: '#333333',
    axis: '#888888',
    text: '#e0e0e0',
    functions: [
      '#4096ff',
      '#73d13d',
      '#ff7a45',
      '#b37feb',
      '#ff85c0',
      '#36cfc9',
      '#ffec3d',
      '#ffc53d',
    ]
  }
}

let currentTheme: ThemeConfig = { ...defaultTheme }

export function getTheme(): ThemeConfig {
  return currentTheme
}

export function setTheme(theme: ThemeConfig) {
  currentTheme = theme
}

export function toggleTheme() {
  const isDark = currentTheme.colors.background === '#141414'
  currentTheme = isDark ? { ...defaultTheme } : { ...darkTheme }
  return currentTheme
}

export function getFunctionColor(index: number): string {
  const colors = currentTheme.colors.functions
  return colors[index % colors.length]
}
