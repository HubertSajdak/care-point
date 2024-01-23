export interface ChildrenListItemProps {
  id: number
  icon: JSX.Element
  text: string
  path: string
}
export interface SidebarLinksProps {
  id: number
  icon: JSX.Element
  text: string
  variant: "basic" | "nested"
  path?: string | undefined
  children?: ChildrenListItemProps[] | undefined
}
