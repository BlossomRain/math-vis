import { adaptGeometryLabModelToSceneConfig } from '../../../core/model'
import type { Page } from '../../../data/chapters'
import { functionLimitModel } from './function-limit/model'
import { sequenceLimitModel } from './sequence-limit/model'

export function getCalculus1LimitsPages(): Page[] {
  return [
    {
      id: sequenceLimitModel.id,
      title: '数列极限',
      template: sequenceLimitModel.template,
      pageModel: sequenceLimitModel,
      config: adaptGeometryLabModelToSceneConfig(sequenceLimitModel)
    },
    {
      id: functionLimitModel.id,
      title: '函数极限',
      template: functionLimitModel.template,
      pageModel: functionLimitModel,
      config: adaptGeometryLabModelToSceneConfig(functionLimitModel)
    }
  ]
}
