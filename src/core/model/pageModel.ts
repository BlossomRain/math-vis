import { BandData, ControlItem, LineData, PointData, SequenceData } from '../../types/config'

export type PageTemplateType = 'geometry-lab'

export type GeometryObjectType = 'point' | 'vector' | 'line' | 'circle' | 'arc' | 'projection' | 'sequence' | 'band'

export interface GeometryObjectStyle {
  color: string
  lineWidth?: number
  fillColor?: string
  dashed?: boolean
}

export interface GeometryObject {
  id: string
  type: GeometryObjectType
  visible: boolean
  style: GeometryObjectStyle
  data?: PointData | LineData | SequenceData | BandData | Record<string, unknown>
}

export interface UserFunctionLayer {
  id: string
  expr: string
  color: string
  lineWidth: number
  visible: boolean
  editable: boolean
}

export interface ObservationField {
  id: string
  label: string
  valueExpr: string
  baselineExpr?: string
  deltaExpr?: string
  precision?: number
  format?: 'number' | 'boolean' | 'text'
  trueText?: string
  falseText?: string
  suffix?: string
}

export interface ObservationGroup {
  id: string
  title: string
  fields: ObservationField[]
}

export interface ObservationSchema {
  groups: ObservationGroup[]
}

export interface NoteSection {
  id: string
  title: string
  body: string[]
}

export interface PageNotebookMeta {
  summary?: string
  goals?: string[]
  prompts?: string[]
  takeaways?: string[]
  sections?: NoteSection[]
}

export interface LegendItem {
  id: string
  label: string
  kind: 'line' | 'dashed-line' | 'point' | 'arc' | 'curve'
  color: string
  objectId?: string
  description?: string
}

export interface FormulaCard {
  id: string
  title: string
  latex: string
  note?: string
}

export interface FormulaDockContent {
  formulas: FormulaCard[]
  derivations: FormulaCard[]
  insights?: FormulaCard[]
}

export interface GeometryLabPageModel {
  id: string
  title: string
  template: PageTemplateType
  bounds: {
    xMin: number
    xMax: number
    yMin: number
    yMax: number
  }
  params: Record<string, number>
  controls: ControlItem[]
  geometryLayers: GeometryObject[]
  userFunctionLayers: UserFunctionLayer[]
  notebook?: PageNotebookMeta
  keyPointSchema?: ObservationSchema
  observationSchema?: ObservationSchema
  legendItems?: LegendItem[]
  formulaDock?: FormulaDockContent
}
