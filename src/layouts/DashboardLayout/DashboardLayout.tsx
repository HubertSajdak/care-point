import { CircularProgress, Container } from "@mui/material"
import Box from "@mui/material/Box"
import { useState } from "react"
import { Outlet } from "react-router-dom"
import styled, { useTheme } from "styled-components"
import AppBar from "./components/AppBar/AppBar"
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs"
import Drawer from "./components/Drawer/Drawer"
import { SidebarLinksProps } from "./types"
export interface DashboardLayoutProps {
  sidebarLinks: SidebarLinksProps[]
  userName: string
  userAvatar: string
  isUserDataLoading: boolean
}
const DashboardLayout = ({
  sidebarLinks,
  userName,
  userAvatar,
  isUserDataLoading,
}: DashboardLayoutProps) => {
  const theme = useTheme()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const drawerWidth = 250
  const handleOpenSidebar = () => {
    setIsSidebarOpen((prev) => !prev)
  }

  return (
    <Box data-testid="dashboard-layout">
      <AppBar
        isOpen={isSidebarOpen}
        handleDrawerToggle={handleOpenSidebar}
        drawerWidth={drawerWidth}
        userName={userName}
        userAvatar={userAvatar}
        isUserDataLoading={isUserDataLoading}
      />
      <Drawer
        isOpen={isSidebarOpen}
        handleDrawerToggle={handleOpenSidebar}
        drawerWidth={drawerWidth}
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
}>(({ theme, $drawerwidth, $issidebaropen }) => ({
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
