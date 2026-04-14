export interface FunctionLimitObservation {
  epsilon: number
  delta: number
  x0: number
  a: number
  limitValue: number
  fx0: number
  xDistance: number
  yDistance: number
  inDeltaStrip: boolean
  inEpsilonBand: boolean
}

export function functionValue(x: number) {
  return x * x
}

export function computeFunctionLimitObservation(
  epsilon: number,
  delta: number,
  x0: number,
  a: number,
  limitValue: number
): FunctionLimitObservation {
  const fx0 = functionValue(x0)
  const xDistance = Math.abs(x0 - a)
  const yDistance = Math.abs(fx0 - limitValue)

  return {
    epsilon,
    delta,
    x0,
    a,
    limitValue,
    fx0,
    xDistance,
    yDistance,
    inDeltaStrip: xDistance < delta,
    inEpsilonBand: yDistance < epsilon
  }
}
