declare module 'react-katex' {
  import { ComponentType, ReactNode } from 'react'

  interface MathComponentProps {
    math: string
    errorColor?: string
    renderError?: (error: Error) => ReactNode
  }

  export const BlockMath: ComponentType<MathComponentProps>
  export const InlineMath: ComponentType<MathComponentProps>
}
