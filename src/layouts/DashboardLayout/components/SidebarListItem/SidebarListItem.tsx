import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"
import { Collapse, List } from "@mui/material"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { NavLink, useLocation } from "react-router-dom"

import { normalizeKey } from "@/shared"

import { SidebarLinksProps } from "../../types"

import {
  StyledListItemButton,
  StyledNestedListItemButton,
} from "./SidebarListItem.styled"

const SidebarListItem = ({
  children,
  icon,
  id,
  path,
  text,
  variant,
}: SidebarLinksProps) => {
  const location = useLocation()
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const handleClick = () => {
    setOpen(!open)
  }
  const defaultOpen = () => {
    const findDropdownItem = children?.find(
      (link) => link.path === location.pathname,
    )
    if (findDropdownItem) {
      setOpen(true)
    }
  }

  useEffect(() => {
    defaultOpen()
  }, [])

  if (variant === "nested" && children && children.length > 0) {
    return (
      <>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={t(normalizeKey(text))} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children?.map((child) => {
              return (
                <StyledNestedListItemButton
                  key={child.id}
                  sx={{ pl: 4 }}
                  {...{ component: NavLink, to: child.path }}
                  selected={location.pathname === child.path}
                >
                  <ListItemIcon>{child.icon}</ListItemIcon>
                  <ListItemText primary={t(normalizeKey(child.text))} />
                </StyledNestedListItemButton>
              )
            })}
          </List>
        </Collapse>
      </>
    )
  } else {
    return (
      <StyledListItemButton
        selected={location.pathname === path}
        {...{ component: NavLink, to: path }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={t(normalizeKey(text))} />
      </StyledListItemButton>
    )
  }
}

export default SidebarListItem
