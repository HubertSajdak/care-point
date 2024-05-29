import styled from "styled-components"

export const StyledMain = styled.main<{
  $drawerwidth: number
  $issidebaropen: boolean
}>(({ $drawerwidth, $issidebaropen, theme }) => ({
  padding: theme.spacing(3),
  flexGrow: 1,
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  [theme.breakpoints.up("md")]: {
    ...($issidebaropen && {
      width: `calc(100% - ${$drawerwidth}px)`,
      marginLeft: `${$drawerwidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  },
}))
