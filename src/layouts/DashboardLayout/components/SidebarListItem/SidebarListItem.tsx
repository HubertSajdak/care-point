import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"
import { Collapse, List } from "@mui/material"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { NavLink, useLocation } from "react-router-dom"
import styled from "styled-components"
import { SidebarLinksProps } from "../../types"

const SidebarListItem = ({
  id,
  icon,
  text,
  path,
  variant,
  children,
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
          <ListItemText primary={t(text)} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children?.map((child) => {
              return (
                <StyledNestedListItemButton
                  sx={{ pl: 4 }}
                  key={child.id}
                  {...{ component: NavLink, to: child.path }}
                  selected={location.pathname === child.path}
                >
                  <ListItemIcon>{child.icon}</ListItemIcon>
                  <ListItemText primary={t(child.text)} />
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
        <ListItemText primary={t(text)} />
      </StyledListItemButton>
    )
  }
}

export default SidebarListItem

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  transition: theme.transitions.create(["padding"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  "&.active": {
    paddingLeft: theme.spacing(2.2),
    transition: theme.transitions.create(["padding"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  "&:hover": {
    paddingLeft: theme.spacing(2.2),
    transition: theme.transitions.create(["padding"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}))
const StyledNestedListItemButton = styled(StyledListItemButton)(
  ({ theme }) => ({
    "&.active": {
      paddingLeft: theme.spacing(4.2),
      transition: theme.transitions.create(["padding"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    "&:hover": {
      paddingLeft: theme.spacing(4.2),
      transition: theme.transitions.create(["padding"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  }),
)
