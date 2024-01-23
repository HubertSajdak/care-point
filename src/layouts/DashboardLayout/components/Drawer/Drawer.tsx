import Logo from "@/assets/images/care-point-full-logo.svg?react"
import Box from "@mui/material/Box"
import MuiDrawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import { SidebarLinksProps } from "../../types"
import SidebarListItem from "../SidebarListItem/SidebarListItem"
import { useTheme } from "styled-components"

export default function Drawer({
  isOpen,
  handleDrawerToggle,
  drawerWidth,
  sidebarLinks,
}: {
  isOpen: boolean
  handleDrawerToggle: () => void
  drawerWidth: number
  sidebarLinks: SidebarLinksProps[]
}) {
  const theme = useTheme()
  const drawer = (
    <div>
      <Logo height={56} width={"100%"} style={{ marginTop: 20 }} />
      <List>
        {sidebarLinks.map((item) => {
          return (
            <SidebarListItem
              key={item.id}
              id={item.id}
              icon={item.icon}
              text={item.text}
              path={item.path}
              variant={item.variant}
              children={item.children}
            />
          )
        })}
      </List>
    </div>
  )

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <MuiDrawer
          variant="temporary"
          open={isOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </MuiDrawer>
        <MuiDrawer
          variant="persistent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open={isOpen}
        >
          {drawer}
        </MuiDrawer>
      </Box>
    </Box>
  )
}
