import { MathObject, SceneConfig } from '../../types/config'

export type SceneBounds = SceneConfig['scene']['bounds']

export type WorldToScreenFn = (x: number, y: number, width: number, height: number) => { x: number; y: number }

export interface GeometryRenderContext {
  ctx: CanvasRenderingContext2D
  objects: MathObject[]
  params: Record<string, number>
  width: number
  height: number
  worldToScreen: WorldToScreenFn
  textColor: string
}

export interface FunctionRenderContext {
  ctx: CanvasRenderingContext2D
  objects: MathObject[]
  params: Record<string, number>
  bounds: SceneBounds
  width: number
  height: number
  worldToScreen: WorldToScreenFn
}
