import { evaluate } from 'mathjs'
import { FunctionRenderContext } from './types'

export function renderFunctionLayers(renderCtx: FunctionRenderContext) {
  const { xMin, xMax } = renderCtx.bounds

  renderCtx.objects.forEach((obj) => {
    if (!obj.visible || obj.type !== 'function' || !obj.expr) return

    renderCtx.ctx.strokeStyle = obj.style.color
    renderCtx.ctx.lineWidth = obj.style.lineWidth
    renderCtx.ctx.beginPath()

    const steps = 500
    let firstPoint = true

    for (let i = 0; i <= steps; i++) {
      const x = xMin + (xMax - xMin) * (i / steps)
      try {
        const scope = { ...renderCtx.params, x }
        const y = evaluate(obj.expr, scope) as number
        if (!Number.isFinite(y)) {
          firstPoint = true
          continue
        }
        const { x: sx, y: sy } = renderCtx.worldToScreen(x, y, renderCtx.width, renderCtx.height)

        if (firstPoint) {
          renderCtx.ctx.moveTo(sx, sy)
          firstPoint = false
        } else {
          renderCtx.ctx.lineTo(sx, sy)
        }
      } catch {
        firstPoint = true
      }
    }

    renderCtx.ctx.stroke()
  })
}
