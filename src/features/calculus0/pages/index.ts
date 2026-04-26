import { adaptGeometryLabModelToSceneConfig } from '../../../core/model'
import type { Page } from '../../../data/chapters'
import { eulerAngleSumModel } from './euler-angle-sum/model'
import { harmonicCompositionModel } from './harmonic-composition/model'

export function getCalculus0PreliminariesPages(): Page[] {
  return [
    {
      id: eulerAngleSumModel.id,
      title: eulerAngleSumModel.title,
      template: eulerAngleSumModel.template,
      pageModel: eulerAngleSumModel,
      config: adaptGeometryLabModelToSceneConfig(eulerAngleSumModel)
    },
    {
      id: harmonicCompositionModel.id,
      title: harmonicCompositionModel.title,
      template: harmonicCompositionModel.template,
      pageModel: harmonicCompositionModel,
      config: adaptGeometryLabModelToSceneConfig(harmonicCompositionModel)
    }
  ]
}
