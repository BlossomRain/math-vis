import { useCallback, useEffect, useRef, useState, type PointerEvent, type WheelEvent } from 'react'
import { SceneConfig } from '../types/config'
import { defaultTheme, ThemeConfig } from '../data/theme'
import { GlobalConfig, defaultGlobalConfig } from '../data/globalConfig'
import { renderFunctionLayers, renderGeometryLayers } from '../core/render'

export type SceneBounds = SceneConfig['scene']['bounds']

interface Canvas2DProps {
  config: SceneConfig
  theme?: ThemeConfig
  globalConfig?: GlobalConfig
  canvasId?: string
  preserveAspectRatio?: boolean
  onViewBoundsChange?: (bounds: SceneBounds) => void
  resetToken?: number
}

interface DragState {
  pointerId: number
  startX: number
  startY: number
  bounds: SceneBounds
}

const MIN_SPAN = 0.2
const MAX_SPAN = 200

function cloneBounds(bounds: SceneBounds): SceneBounds {
  return {
    xMin: bounds.xMin,
    xMax: bounds.xMax,
    yMin: bounds.yMin,
    yMax: bounds.yMax
  }
}

export default function Canvas2D({
  config,
  theme: externalTheme,
  globalConfig: externalGlobalConfig,
  canvasId,
  preserveAspectRatio = false,
  onViewBoundsChange,
  resetToken = 0
}: Canvas2DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dragRef = useRef<DragState | null>(null)
  const { scene, params, objects } = config
  const theme = externalTheme || defaultTheme
  const globalConfig = externalGlobalConfig || defaultGlobalConfig
  const [viewBounds, setViewBounds] = useState<SceneBounds>(() => cloneBounds(scene.bounds))
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    setViewBounds(cloneBounds(scene.bounds))
  }, [config.id, resetToken, scene.bounds])

  useEffect(() => {
    onViewBoundsChange?.(viewBounds)
  }, [onViewBoundsChange, viewBounds])

  const worldToScreen = useCallback((x: number, y: number, width: number, height: number) => {
    const { xMin, xMax, yMin, yMax } = viewBounds
    if (preserveAspectRatio) {
      const scaleX = width / (xMax - xMin)
      const scaleY = height / (yMax - yMin)
      const scale = Math.min(scaleX, scaleY)
      const contentWidth = (xMax - xMin) * scale
      const contentHeight = (yMax - yMin) * scale
      const offsetX = (width - contentWidth) / 2
      const offsetY = (height - contentHeight) / 2

      return {
        x: offsetX + (x - xMin) * scale,
        y: offsetY + contentHeight - (y - yMin) * scale
      }
    }

    const screenX = ((x - xMin) / (xMax - xMin)) * width
    const screenY = height - ((y - yMin) / (yMax - yMin)) * height
    return { x: screenX, y: screenY }
  }, [preserveAspectRatio, viewBounds])

  const drawGrid = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const { xMin, xMax, yMin, yMax } = viewBounds
    ctx.strokeStyle = theme.colors.grid
    ctx.lineWidth = theme.line.gridWidth

    const density = Math.max(1, globalConfig.canvas.gridDensity)
    const xStep = 1 / density
    const yStep = 1 / density

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
  }, [globalConfig.canvas.gridDensity, theme, viewBounds, worldToScreen])

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
  }, [theme, worldToScreen])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (!rect) return
      const dpr = Math.max(1, window.devicePixelRatio || 1)
      canvas.width = Math.floor(rect.width * dpr)
      canvas.height = Math.floor(rect.height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      ctx.clearRect(0, 0, rect.width, rect.height)

      if (globalConfig.canvas.showGrid) {
        drawGrid(ctx, rect.width, rect.height)
      }
      drawAxes(ctx, rect.width, rect.height)

      renderFunctionLayers({
        ctx,
        objects,
        params,
        bounds: viewBounds,
        width: rect.width,
        height: rect.height,
        worldToScreen
      })

      renderGeometryLayers({
        ctx,
        objects,
        params,
        width: rect.width,
        height: rect.height,
        worldToScreen,
        textColor: theme.colors.text
      })
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [drawAxes, drawGrid, globalConfig.canvas.showGrid, objects, params, theme.colors.text, viewBounds, worldToScreen])

  const handleWheel = useCallback((event: WheelEvent<HTMLCanvasElement>) => {
    event.preventDefault()
    const rect = event.currentTarget.getBoundingClientRect()
    if (!rect.width || !rect.height) return

    const { xMin, xMax, yMin, yMax } = viewBounds
    const spanX = xMax - xMin
    const spanY = yMax - yMin
    const pointerRatioX = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width))
    const pointerRatioY = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height))
    const anchorX = xMin + spanX * pointerRatioX
    const anchorY = yMax - spanY * pointerRatioY
    const zoomFactor = event.deltaY < 0 ? 0.9 : 1.1
    const nextSpanX = Math.min(MAX_SPAN, Math.max(MIN_SPAN, spanX * zoomFactor))
    const nextSpanY = Math.min(MAX_SPAN, Math.max(MIN_SPAN, spanY * zoomFactor))
    const scaleX = nextSpanX / spanX
    const scaleY = nextSpanY / spanY

    setViewBounds({
      xMin: anchorX - (anchorX - xMin) * scaleX,
      xMax: anchorX + (xMax - anchorX) * scaleX,
      yMin: anchorY - (anchorY - yMin) * scaleY,
      yMax: anchorY + (yMax - anchorY) * scaleY
    })
  }, [viewBounds])

  const handlePointerDown = useCallback((event: PointerEvent<HTMLCanvasElement>) => {
    if (event.button !== 0) return
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      bounds: cloneBounds(viewBounds)
    }
    event.currentTarget.setPointerCapture(event.pointerId)
    setIsDragging(true)
  }, [viewBounds])

  const handlePointerMove = useCallback((event: PointerEvent<HTMLCanvasElement>) => {
    const dragState = dragRef.current
    if (!dragState || dragState.pointerId !== event.pointerId) return

    const rect = event.currentTarget.getBoundingClientRect()
    if (!rect.width || !rect.height) return

    const spanX = dragState.bounds.xMax - dragState.bounds.xMin
    const spanY = dragState.bounds.yMax - dragState.bounds.yMin
    const deltaX = event.clientX - dragState.startX
    const deltaY = event.clientY - dragState.startY
    const deltaWorldX = (-deltaX / rect.width) * spanX
    const deltaWorldY = (deltaY / rect.height) * spanY

    setViewBounds({
      xMin: dragState.bounds.xMin + deltaWorldX,
      xMax: dragState.bounds.xMax + deltaWorldX,
      yMin: dragState.bounds.yMin + deltaWorldY,
      yMax: dragState.bounds.yMax + deltaWorldY
    })
  }, [])

  const resetView = useCallback(() => {
    setViewBounds(cloneBounds(scene.bounds))
  }, [scene.bounds])

  const endDrag = useCallback((event?: PointerEvent<HTMLCanvasElement>) => {
    if (event && dragRef.current && dragRef.current.pointerId === event.pointerId) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    dragRef.current = null
    setIsDragging(false)
  }, [])

  const handleDoubleClick = useCallback(() => {
    resetView()
  }, [resetView])

  return (
    <canvas
      id={canvasId}
      ref={canvasRef}
      onWheel={handleWheel}
      onDoubleClick={handleDoubleClick}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        cursor: isDragging ? 'grabbing' : 'grab',
        touchAction: 'none'
      }}
    />
  )
}
