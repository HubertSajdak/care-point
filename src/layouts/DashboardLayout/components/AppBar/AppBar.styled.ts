import { Toolbar } from "@mui/material"
import MuiAppBar from "@mui/material/AppBar"
import styled from "styled-components"

export const StyledAppBar = styled(MuiAppBar)<{
  $drawerwidth: number
  $isSmallView: boolean
  open: boolean
}>(({ $drawerwidth, $isSmallView, open, theme }) => ({
  padding: 2,
  position: "sticky",
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.common.white,
  borderRadius: 0,
  boxShadow: "none",
  outline: `${theme.spacing(0.2)} solid ${theme.palette.grey[300]}`,
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open &&
    !$isSmallView && {
      width: `calc(100% - ${$drawerwidth}px)`,
      marginLeft: `${$drawerwidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
}))

export const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`
