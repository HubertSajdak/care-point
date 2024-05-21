export interface ChildrenListItemProps {
  icon: JSX.Element
  id: number
  path: string
  text: string
}
export interface SidebarLinksProps {
  children?: ChildrenListItemProps[] | undefined
  icon: JSX.Element
  id: number
  path?: string | undefined
  text: string
  variant: "basic" | "nested"
}

// why this file exists? can't we have styles inside tsx file? why file with .d.ts extension?
