import { SceneConfig } from '../../types/config'
import { GeometryLabPageModel, GeometryObject, UserFunctionLayer } from './pageModel'

type LegacyGeometryType = 'point' | 'vector' | 'line'

function isGeometryObjectType(type: SceneConfig['objects'][number]['type']): type is LegacyGeometryType {
  return type === 'point' || type === 'vector' || type === 'line'
}

function toGeometryObject(config: SceneConfig): GeometryObject[] {
  return config.objects
    .filter((obj) => isGeometryObjectType(obj.type))
    .map((obj) => ({
      id: obj.id,
      type: obj.type as LegacyGeometryType,
      visible: obj.visible,
      style: {
        color: obj.style.color,
        lineWidth: obj.style.lineWidth,
        dashed: obj.style.dashed
      },
      data: obj.data
    }))
}

function toSystemFunctionLayers(config: SceneConfig): UserFunctionLayer[] {
  return config.objects
    .filter((obj) => obj.type === 'function' && obj.expr)
    .map((obj) => ({
      id: obj.id,
      expr: obj.expr || '',
      color: obj.style.color,
      lineWidth: obj.style.lineWidth,
      visible: obj.visible,
      editable: false
    }))
}

export function adaptSceneConfigToGeometryLabModel(config: SceneConfig): GeometryLabPageModel {
  return {
    id: config.id,
    title: config.title,
    template: 'geometry-lab',
    bounds: { ...config.scene.bounds },
    params: { ...config.params },
    controls: [...config.controls],
    geometryLayers: toGeometryObject(config),
    userFunctionLayers: toSystemFunctionLayers(config)
  }
}

function toSceneGeometryObjects(model: GeometryLabPageModel): SceneConfig['objects'] {
  const isSceneGeometryLayer = (
    layer: GeometryObject
  ): layer is GeometryObject & { type: 'point' | 'line' | 'vector' | 'circle' | 'arc' | 'projection' | 'sequence' | 'band' } =>
    layer.type === 'point' ||
    layer.type === 'line' ||
    layer.type === 'vector' ||
    layer.type === 'circle' ||
    layer.type === 'arc' ||
    layer.type === 'projection' ||
    layer.type === 'sequence' ||
    layer.type === 'band'

  return model.geometryLayers
    .filter(isSceneGeometryLayer)
    .map((layer) => ({
      id: layer.id,
      type: layer.type,
      visible: layer.visible,
      data: layer.data,
      style: {
        color: layer.style.color,
        lineWidth: layer.style.lineWidth ?? 2,
        dashed: layer.style.dashed,
        fillColor: layer.style.fillColor
      }
    }))
}

function toSceneFunctionObjects(model: GeometryLabPageModel): SceneConfig['objects'] {
  return model.userFunctionLayers.map((layer) => ({
    id: layer.id,
    type: 'function' as const,
    visible: layer.visible,
    expr: layer.expr,
    style: {
      color: layer.color,
      lineWidth: layer.lineWidth
    }
  }))
}

export function adaptGeometryLabModelToSceneConfig(model: GeometryLabPageModel): SceneConfig {
  return {
    id: model.id,
    title: model.title,
    scene: {
      type: '2d',
      bounds: { ...model.bounds }
    },
    params: { ...model.params },
    controls: [...model.controls],
    objects: [...toSceneFunctionObjects(model), ...toSceneGeometryObjects(model)]
  }
}
