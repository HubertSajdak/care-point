import { CircularProgress, Container, useMediaQuery } from "@mui/material"
import Box from "@mui/material/Box"
import { useState } from "react"
import { Outlet } from "react-router-dom"
import { useTheme } from "styled-components"

import AppBar from "./components/AppBar/AppBar"
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs"
import Drawer from "./components/Drawer/Drawer"
import { StyledMain } from "./DashboardLayout.styled"
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
  const theme = useTheme()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const drawerWidth = 250
  const handleOpenSidebar = () => {
    setIsSidebarOpen((prev) => !prev)
  }
  const isSmall = useMediaQuery(theme.breakpoints.down("md"))

  return (
    <Box data-testid="dashboard-layout">
      <AppBar
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleOpenSidebar}
        isOpen={isSidebarOpen}
        isSmallView={isSmall}
        isUserDataLoading={isUserDataLoading}
        userAvatar={userAvatar}
        userName={userName}
      />
      <Drawer
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleOpenSidebar}
        isOpen={isSidebarOpen}
        isSmallView={isSmall}
        sidebarLinks={sidebarLinks}
      />
      <StyledMain $drawerwidth={drawerWidth} $issidebaropen={isSidebarOpen}>
        <Container maxWidth="xl">
          <Breadcrumbs />
          {isUserDataLoading ? <CircularProgress /> : <Outlet />}
        </Container>
      </StyledMain>
    </Box>
  )
}

export default DashboardLayout
