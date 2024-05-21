import Box from "@mui/material/Box"
import MuiDrawer from "@mui/material/Drawer"
import List from "@mui/material/List"

import Logo from "@/assets/images/care-point-full-logo.svg?react"

import { SidebarLinksProps } from "../../types"
import SidebarListItem from "../SidebarListItem/SidebarListItem"

export default function Drawer({
  drawerWidth,
  handleDrawerToggle,
  isOpen,
  isSmallView,
  sidebarLinks,
}: {
  drawerWidth: number
  handleDrawerToggle: () => void // again, it should be event, not callback
  isOpen: boolean
  isSmallView: boolean
  sidebarLinks: SidebarLinksProps[]
}) {
  const drawer = (
    <div>
      <Logo height={56} style={{ marginTop: 20 }} width={"100%"} />{" "}
      {/* you are mixing styles in css with styles passing as props */}
      <List>
        {sidebarLinks.map((item) => {
          return (
            <SidebarListItem
              icon={item.icon}
              id={item.id}
              key={item.id}
              path={item.path}
              text={item.text}
              variant={item.variant}
            >
              {item.children}
            </SidebarListItem>
          )
        })}
      </List>
    </div>
  )

  return (
    <Box sx={{ display: "flex" }}>
      {" "}
      {/* you are mixing styles in css with styles passing as props */}
      <Box
        aria-label="mailbox folders"
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        {isSmallView ? (
          <MuiDrawer
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            open={isOpen}
            sx={{
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                borderRadius: 0,
                px: 0,
              },
            }}
            variant="temporary"
            onClose={handleDrawerToggle}
          >
            {drawer}
          </MuiDrawer>
        ) : (
          <MuiDrawer
            ModalProps={{
              disableScrollLock: true,
            }}
            open={isOpen}
            sx={{
              "& .MuiDrawer-paper": {
                /* you are mixing styles in css with styles passing as props */
                boxSizing: "border-box",
                width: drawerWidth,
                borderRadius: 0,
                px: 0,
              },
            }}
            variant="persistent"
          >
            {drawer}
          </MuiDrawer>
        )}
      </Box>
    </Box>
  )
}
