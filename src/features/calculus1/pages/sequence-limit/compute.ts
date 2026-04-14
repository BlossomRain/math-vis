export interface SequenceLimitObservation {
  epsilon: number
  limitValue: number
  nIndex: number
  startValue: number
  nextValue: number
  tailMargin: number
  satisfiesFromN: boolean
}

export function sequenceValue(limitValue: number, rate: number, n: number) {
  return limitValue + rate / n
}

export function computeSequenceLimitObservation(
  epsilon: number,
  nIndex: number,
  limitValue: number,
  rate: number
): SequenceLimitObservation {
  const startValue = sequenceValue(limitValue, rate, nIndex)
  const nextValue = sequenceValue(limitValue, rate, nIndex + 1)
  const tailMargin = Math.abs(startValue - limitValue)

  return {
    epsilon,
    limitValue,
    nIndex,
    startValue,
    nextValue,
    tailMargin,
    satisfiesFromN: tailMargin < epsilon
  }
}
