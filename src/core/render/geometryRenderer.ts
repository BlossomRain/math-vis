import { evaluate } from 'mathjs'
import { ArcData, BandData, CircleData, LineData, PointData, SequenceData } from '../../types/config'
import { GeometryRenderContext } from './types'

function evaluateExpr(expr: string | undefined, params: Record<string, number>): number | undefined {
  if (!expr) return undefined
  const value = evaluate(expr, params) as number
  if (!Number.isFinite(value)) return undefined
  return value
}

function drawPoint(ctx: GeometryRenderContext, pointData: PointData, color: string) {
  const x = pointData.x ?? evaluateExpr(pointData.xExpr, ctx.params)
  const y = pointData.y ?? evaluateExpr(pointData.yExpr, ctx.params)
  if (typeof x !== 'number' || typeof y !== 'number') return

  const p = ctx.worldToScreen(x, y, ctx.width, ctx.height)
  const radius = 4
  const showCoords = pointData.showCoords ?? true

  ctx.ctx.fillStyle = color
  ctx.ctx.beginPath()
  ctx.ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
  ctx.ctx.fill()

  if (pointData.label || showCoords) {
    const coordText = `(${x.toFixed(2)}, ${y.toFixed(2)})`
    const labelText = pointData.label ? `${pointData.label} ${coordText}` : coordText
    ctx.ctx.font = '12px Arial'
    ctx.ctx.fillStyle = ctx.textColor
    ctx.ctx.fillText(labelText, p.x + 8, p.y - 8)
  }
}

function drawLine(ctx: GeometryRenderContext, lineData: LineData, color: string, lineWidth: number, dashed = false) {
  const x1 = lineData.x1 ?? evaluateExpr(lineData.x1Expr, ctx.params)
  const y1 = lineData.y1 ?? evaluateExpr(lineData.y1Expr, ctx.params)
  const x2 = lineData.x2 ?? evaluateExpr(lineData.x2Expr, ctx.params)
  const y2 = lineData.y2 ?? evaluateExpr(lineData.y2Expr, ctx.params)
  if (typeof x1 !== 'number' || typeof y1 !== 'number' || typeof x2 !== 'number' || typeof y2 !== 'number') return

  const p1 = ctx.worldToScreen(x1, y1, ctx.width, ctx.height)
  const p2 = ctx.worldToScreen(x2, y2, ctx.width, ctx.height)

  ctx.ctx.strokeStyle = color
  ctx.ctx.lineWidth = lineWidth
  ctx.ctx.setLineDash(dashed ? [6, 4] : [])
  ctx.ctx.beginPath()
  ctx.ctx.moveTo(p1.x, p1.y)
  ctx.ctx.lineTo(p2.x, p2.y)
  ctx.ctx.stroke()
  ctx.ctx.setLineDash([])

  if (lineData.label) {
    const isVertical = Math.abs(p1.x - p2.x) < Math.abs(p1.y - p2.y)
    const mx = isVertical ? p2.x : p2.x - 78
    const my = isVertical ? Math.min(p1.y, p2.y) + 18 : p2.y - 8
    ctx.ctx.font = '12px Arial'
    ctx.ctx.fillStyle = ctx.textColor
    ctx.ctx.fillText(lineData.label, mx + 6, my)
  }
}

function drawCircle(ctx: GeometryRenderContext, circleData: CircleData, color: string, lineWidth: number, dashed = false) {
  const cx = circleData.cx ?? evaluateExpr(circleData.cxExpr, ctx.params) ?? 0
  const cy = circleData.cy ?? evaluateExpr(circleData.cyExpr, ctx.params) ?? 0
  const r = circleData.r ?? evaluateExpr(circleData.rExpr, ctx.params)
  if (typeof r !== 'number') return

  const center = ctx.worldToScreen(cx, cy, ctx.width, ctx.height)
  const edgeX = ctx.worldToScreen(cx + r, cy, ctx.width, ctx.height)
  const edgeY = ctx.worldToScreen(cx, cy + r, ctx.width, ctx.height)
  const radiusX = Math.abs(edgeX.x - center.x)
  const radiusY = Math.abs(edgeY.y - center.y)

  ctx.ctx.strokeStyle = color
  ctx.ctx.lineWidth = lineWidth
  ctx.ctx.setLineDash(dashed ? [6, 4] : [])
  ctx.ctx.beginPath()
  ctx.ctx.ellipse(center.x, center.y, radiusX, radiusY, 0, 0, Math.PI * 2)
  ctx.ctx.stroke()
  ctx.ctx.setLineDash([])

  if (circleData.label) {
    ctx.ctx.font = '12px Arial'
    ctx.ctx.fillStyle = ctx.textColor
    ctx.ctx.fillText(circleData.label, center.x + radiusX + 8, center.y - 8)
  }
}

function drawArc(ctx: GeometryRenderContext, arcData: ArcData, color: string, lineWidth: number, dashed = false) {
  const cx = arcData.cx ?? evaluateExpr(arcData.cxExpr, ctx.params) ?? 0
  const cy = arcData.cy ?? evaluateExpr(arcData.cyExpr, ctx.params) ?? 0
  const r = arcData.r ?? evaluateExpr(arcData.rExpr, ctx.params)
  const startAngle = arcData.startAngle ?? evaluateExpr(arcData.startAngleExpr, ctx.params)
  const endAngle = arcData.endAngle ?? evaluateExpr(arcData.endAngleExpr, ctx.params)
  if (typeof r !== 'number' || typeof startAngle !== 'number' || typeof endAngle !== 'number') return

  const center = ctx.worldToScreen(cx, cy, ctx.width, ctx.height)
  const edgeX = ctx.worldToScreen(cx + r, cy, ctx.width, ctx.height)
  const edgeY = ctx.worldToScreen(cx, cy + r, ctx.width, ctx.height)
  const radiusX = Math.abs(edgeX.x - center.x)
  const radiusY = Math.abs(edgeY.y - center.y)

  ctx.ctx.strokeStyle = color
  ctx.ctx.lineWidth = lineWidth
  ctx.ctx.setLineDash(dashed ? [6, 4] : [])
  ctx.ctx.beginPath()
  ctx.ctx.ellipse(center.x, center.y, radiusX, radiusY, 0, -endAngle, -startAngle, false)
  ctx.ctx.stroke()
  ctx.ctx.setLineDash([])

  if (arcData.label) {
    const mid = (startAngle + endAngle) / 2
    const lx = center.x + (radiusX + 14) * Math.cos(mid)
    const ly = center.y - (radiusY + 14) * Math.sin(mid)
    ctx.ctx.font = '12px Arial'
    ctx.ctx.fillStyle = ctx.textColor
    ctx.ctx.fillText(arcData.label, lx, ly)
  }
}

function drawBand(ctx: GeometryRenderContext, bandData: BandData, color: string, fillColor: string | undefined) {
  const x1 = bandData.x1 ?? evaluateExpr(bandData.x1Expr, ctx.params)
  const x2 = bandData.x2 ?? evaluateExpr(bandData.x2Expr, ctx.params)
  const yCenter = bandData.yCenter ?? evaluateExpr(bandData.yCenterExpr, ctx.params)
  const halfHeight = bandData.halfHeight ?? evaluateExpr(bandData.halfHeightExpr, ctx.params)
  if (typeof x1 !== 'number' || typeof x2 !== 'number' || typeof yCenter !== 'number' || typeof halfHeight !== 'number') return

  const topLeft = ctx.worldToScreen(x1, yCenter + halfHeight, ctx.width, ctx.height)
  const bottomRight = ctx.worldToScreen(x2, yCenter - halfHeight, ctx.width, ctx.height)
  const rectX = Math.min(topLeft.x, bottomRight.x)
  const rectY = Math.min(topLeft.y, bottomRight.y)
  const rectWidth = Math.abs(bottomRight.x - topLeft.x)
  const rectHeight = Math.abs(bottomRight.y - topLeft.y)

  ctx.ctx.save()
  ctx.ctx.fillStyle = fillColor ?? 'rgba(24, 144, 255, 0.12)'
  ctx.ctx.fillRect(rectX, rectY, rectWidth, rectHeight)
  ctx.ctx.strokeStyle = color
  ctx.ctx.lineWidth = 1
  ctx.ctx.strokeRect(rectX, rectY, rectWidth, rectHeight)
  ctx.ctx.restore()

  if (bandData.label) {
    ctx.ctx.font = '12px Arial'
    ctx.ctx.fillStyle = ctx.textColor
    ctx.ctx.fillText(bandData.label, rectX + 8, rectY + 16)
  }
}

function drawSequence(ctx: GeometryRenderContext, sequenceData: SequenceData, color: string, fillColor: string | undefined) {
  const indexMin = sequenceData.indexMin ?? 1
  const indexMax = sequenceData.indexMax ?? evaluateExpr(sequenceData.indexMaxExpr, ctx.params)
  const highlightFrom = sequenceData.highlightFrom ?? evaluateExpr(sequenceData.highlightFromExpr, ctx.params) ?? Number.MAX_SAFE_INTEGER
  if (typeof indexMax !== 'number') return

  const maxIndex = Math.max(indexMin, Math.floor(indexMax))
  const highlightIndex = Math.max(indexMin, Math.floor(highlightFrom))

  for (let n = indexMin; n <= maxIndex; n += 1) {
    const y = evaluateExpr(sequenceData.valueExpr, { ...ctx.params, n })
    if (typeof y !== 'number') continue

    const p = ctx.worldToScreen(n, y, ctx.width, ctx.height)
    const base = ctx.worldToScreen(n, 0, ctx.width, ctx.height)
    const activeColor = n >= highlightIndex ? fillColor ?? '#13a36b' : color

    if (sequenceData.showStem) {
      ctx.ctx.strokeStyle = activeColor
      ctx.ctx.lineWidth = 1
      ctx.ctx.beginPath()
      ctx.ctx.moveTo(base.x, base.y)
      ctx.ctx.lineTo(p.x, p.y)
      ctx.ctx.stroke()
    }

    ctx.ctx.fillStyle = activeColor
    ctx.ctx.beginPath()
    ctx.ctx.arc(p.x, p.y, n >= highlightIndex ? 4.5 : 3.5, 0, Math.PI * 2)
    ctx.ctx.fill()
  }
}

export function renderGeometryLayers(renderCtx: GeometryRenderContext) {
  renderCtx.objects.forEach((obj) => {
    if (!obj.visible) return
    if (obj.type === 'point') {
      drawPoint(renderCtx, (obj.data || {}) as PointData, obj.style.color)
      return
    }
    if (obj.type === 'line' || obj.type === 'vector' || obj.type === 'projection') {
      drawLine(renderCtx, (obj.data || {}) as LineData, obj.style.color, obj.style.lineWidth, obj.style.dashed)
      return
    }
    if (obj.type === 'circle') {
      drawCircle(renderCtx, (obj.data || {}) as CircleData, obj.style.color, obj.style.lineWidth, obj.style.dashed)
      return
    }
    if (obj.type === 'arc') {
      drawArc(renderCtx, (obj.data || {}) as ArcData, obj.style.color, obj.style.lineWidth, obj.style.dashed)
      return
    }
    if (obj.type === 'band') {
      drawBand(renderCtx, (obj.data || {}) as BandData, obj.style.color, obj.style.fillColor)
      return
    }
    if (obj.type === 'sequence') {
      drawSequence(renderCtx, (obj.data || {}) as SequenceData, obj.style.color, obj.style.fillColor)
    }
  })
}
