import { adaptGeometryLabModelToSceneConfig } from '../../../core/model'
import type { Page } from '../../../data/chapters'
import { eulerAngleSumModel } from './euler-angle-sum/model'
import { harmonicCompositionModel } from './harmonic-composition/model'

export function getCalculus0PreliminariesPages(): Page[] {
  return [
    {
      id: eulerAngleSumModel.id,
      title: '欧拉与和角公式',
      template: eulerAngleSumModel.template,
      pageModel: eulerAngleSumModel,
      config: adaptGeometryLabModelToSceneConfig(eulerAngleSumModel)
    },
    {
      id: harmonicCompositionModel.id,
      title: '叠合公式',
      template: harmonicCompositionModel.template,
      pageModel: harmonicCompositionModel,
      config: adaptGeometryLabModelToSceneConfig(harmonicCompositionModel)
    }
  ]
}
