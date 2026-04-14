export interface HarmonicObservation {
  r: number
  phi: number
  left: number
  right: number
  delta: number
}

export function computeHarmonicObservation(a: number, b: number, x0: number): HarmonicObservation {
  const r = Math.sqrt(a * a + b * b)
  const phi = Math.atan2(a, b)
  const left = a * Math.cos(x0) + b * Math.sin(x0)
  const right = r * Math.sin(x0 + phi)

  return {
    r,
    phi,
    left,
    right,
    delta: left - right
  }
}
