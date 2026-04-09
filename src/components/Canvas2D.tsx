import { useEffect, useRef, useCallback } from 'react'
import { SceneConfig } from '../types/config'
import { evaluate } from 'mathjs'
import { getTheme, ThemeConfig } from '../data/theme'
import { GlobalConfig, loadGlobalConfig } from '../data/globalConfig'

interface Canvas2DProps {
  config: SceneConfig
  theme?: ThemeConfig
  globalConfig?: GlobalConfig
}

export default function Canvas2D({ config, theme: externalTheme, globalConfig: externalGlobalConfig }: Canvas2DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { scene, params, objects } = config
  const theme = externalTheme || getTheme()
  const globalConfig = externalGlobalConfig || loadGlobalConfig()

  const worldToScreen = useCallback((x: number, y: number, width: number, height: number) => {
    const { xMin, xMax, yMin, yMax } = scene.bounds
    const screenX = ((x - xMin) / (xMax - xMin)) * width
    const screenY = height - ((y - yMin) / (yMax - yMin)) * height
    return { x: screenX, y: screenY }
  }, [scene.bounds])

  const drawGrid = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const { xMin, xMax, yMin, yMax } = scene.bounds
    ctx.strokeStyle = theme.colors.grid
    ctx.lineWidth = theme.line.gridWidth

    const xStep = Math.pow(10, Math.floor(Math.log10(xMax - xMin))) / 10
    const yStep = Math.pow(10, Math.floor(Math.log10(yMax - yMin))) / 10

    ctx.beginPath()
    for (let x = Math.floor(xMin / xStep) * xStep; x <= xMax; x += xStep) {
      const { x: sx } = worldToScreen(x, 0, width, height)
      ctx.moveTo(sx, 0)
      ctx.lineTo(sx, height)
    }
    for (let y = Math.floor(yMin / yStep) * yStep; y <= yMax; y += yStep) {
      const { y: sy } = worldToScreen(0, y, width, height)
      ctx.moveTo(0, sy)
      ctx.lineTo(width, sy)
    }
    ctx.stroke()
  }, [scene.bounds, worldToScreen, theme])

  const drawAxes = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = theme.colors.axis
    ctx.lineWidth = theme.line.axisWidth

    const origin = worldToScreen(0, 0, width, height)

    ctx.beginPath()
    ctx.moveTo(0, origin.y)
    ctx.lineTo(width, origin.y)
    ctx.moveTo(origin.x, 0)
    ctx.lineTo(origin.x, height)
    ctx.stroke()

    ctx.fillStyle = theme.colors.text
    ctx.font = '12px Arial'
    ctx.fillText('x', width - 15, origin.y - 5)
    ctx.fillText('y', origin.x + 5, 15)
  }, [scene.bounds, worldToScreen, theme])

  const drawFunction = useCallback((ctx: CanvasRenderingContext2D, expr: string, color: string, lineWidth: number, width: number, height: number) => {
    const { xMin, xMax } = scene.bounds
    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth
    ctx.beginPath()

    const steps = 500
    let firstPoint = true

    for (let i = 0; i <= steps; i++) {
      const x = xMin + (xMax - xMin) * (i / steps)
      try {
        const scope = { ...params, x }
        const y = evaluate(expr, scope) as number
        const { x: sx, y: sy } = worldToScreen(x, y, width, height)
        
        if (firstPoint) {
          ctx.moveTo(sx, sy)
          firstPoint = false
        } else {
          ctx.lineTo(sx, sy)
        }
      } catch {
        firstPoint = true
      }
    }
    ctx.stroke()
  }, [scene.bounds, params, worldToScreen])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (!rect) return
      canvas.width = rect.width
      canvas.height = rect.height

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      if (globalConfig.canvas.showGrid) {
        drawGrid(ctx, canvas.width, canvas.height)
      }
      drawAxes(ctx, canvas.width, canvas.height)

      objects.forEach(obj => {
        if (obj.visible && obj.type === 'function' && obj.expr) {
          drawFunction(ctx, obj.expr, obj.style.color, obj.style.lineWidth, canvas.width, canvas.height)
        }
      })
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [drawGrid, drawAxes, drawFunction, objects])

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'block'
      }}
    />
  )
}
