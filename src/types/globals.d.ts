declare module "*.svg" {
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}

declare module "*.pdf"

type Only<T, U> = { [P in keyof T]: T[P] } & Omit<
  { [P in keyof U]?: never },
  keyof T
>

export type Either<T, U> = Only<T, U> | Only<U, T>
