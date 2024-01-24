import { CircularProgress, Container } from "@mui/material"
import Box from "@mui/material/Box"
import { useState } from "react"
import { Outlet } from "react-router-dom"
import styled from "styled-components"

import AppBar from "./components/AppBar/AppBar"
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs"
import Drawer from "./components/Drawer/Drawer"
import { SidebarLinksProps } from "./types"
export interface DashboardLayoutProps {
  isUserDataLoading: boolean
  sidebarLinks: SidebarLinksProps[]
  userAvatar: string
  userName: string
}
const DashboardLayout = ({
  isUserDataLoading,
  sidebarLinks,
  userAvatar,
  userName,
}: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const drawerWidth = 250
  const handleOpenSidebar = () => {
    setIsSidebarOpen((prev) => !prev)
  }

  return (
    <Box data-testid="dashboard-layout">
      <AppBar
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleOpenSidebar}
        isOpen={isSidebarOpen}
        isUserDataLoading={isUserDataLoading}
        userAvatar={userAvatar}
        userName={userName}
      />
      <Drawer
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleOpenSidebar}
        isOpen={isSidebarOpen}
        sidebarLinks={sidebarLinks}
      />
      <Breadcrumbs drawerWidth={drawerWidth} isSidebarOpen={isSidebarOpen} />
      <StyledBox
        $drawerwidth={drawerWidth}
        $issidebaropen={isSidebarOpen}
        component="main"
      >
        {isUserDataLoading ? (
          <CircularProgress />
        ) : (
          <Container maxWidth="xl">
            <Outlet />
          </Container>
        )}
      </StyledBox>
    </Box>
  )
}

export default DashboardLayout

const StyledBox = styled(Box)<{
  $drawerwidth: number
  $issidebaropen: boolean
}>(({ $drawerwidth, $issidebaropen, theme }) => ({
  padding: theme.spacing(3),
  flexGrow: 1,
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  [theme.breakpoints.up("sm")]: {
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
