export interface EulerObservation {
  sinLeft: number
  sinRight: number
  deltaSin: number
  cosLeft: number
  cosRight: number
  deltaCos: number
}

export function computeEulerObservation(alpha: number, beta: number): EulerObservation {
  const sinLeft = Math.sin(alpha + beta)
  const sinRight = Math.sin(alpha) * Math.cos(beta) + Math.cos(alpha) * Math.sin(beta)
  const cosLeft = Math.cos(alpha + beta)
  const cosRight = Math.cos(alpha) * Math.cos(beta) - Math.sin(alpha) * Math.sin(beta)

  return {
    sinLeft,
    sinRight,
    deltaSin: sinLeft - sinRight,
    cosLeft,
    cosRight,
    deltaCos: cosLeft - cosRight
  }
}
