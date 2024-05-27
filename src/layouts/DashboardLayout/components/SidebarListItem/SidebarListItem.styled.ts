import ListItemButton from "@mui/material/ListItemButton"
import styled from "styled-components"

export const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
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
export const StyledNestedListItemButton = styled(StyledListItemButton)(
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
