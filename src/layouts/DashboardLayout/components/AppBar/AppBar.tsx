import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import MenuIcon from "@mui/icons-material/Menu"
import {
  Avatar,
  Box,
  Divider,
  Menu,
  MenuItem,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material"
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import IconButton from "@mui/material/IconButton"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useTheme } from "styled-components"

import { useAppDispatch } from "@/app/hooks"
import { RouteNames } from "@/constants"
import { LangSwitcher, Link } from "@/shared"
import { logoutUser } from "@/shared/store"

import { StyledAppBar, StyledToolbar } from "./AppBar.styled"

const { ACCOUNT_MANAGEMENT } = RouteNames

export interface AppBarProps extends MuiAppBarProps {
  drawerWidth: number
  handleDrawerToggle: () => void
  isOpen: boolean
  isSmallView: boolean
  isUserDataLoading: boolean
  userAvatar: string
  userName: string
}

const AppBar = ({
  drawerWidth,
  handleDrawerToggle,
  isOpen,
  isSmallView,
  isUserDataLoading,
  userAvatar,
  userName,
  ...MuiAppBarProps
}: AppBarProps) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  return (
    <StyledAppBar
      $drawerwidth={drawerWidth}
      open={isOpen}
      position="fixed"
      {...MuiAppBarProps}
      $isSmallView={isSmallView}
      data-testid="banner"
    >
      <StyledToolbar>
        <IconButton
          aria-label="toggle drawer"
          color="inherit"
          edge="start"
          onClick={handleDrawerToggle}
        >
          {isOpen ? <ArrowBackIosNewIcon /> : <MenuIcon />}
        </IconButton>
        <Box alignItems="center" display="flex" gap={2} sx={{ flexGrow: 0 }}>
          {isUserDataLoading ? (
            <Skeleton sx={{ fontSize: 1 }} variant="text" width={40} />
          ) : (
            <Typography sx={{ fontWeight: "bold" }}>{userName}</Typography>
          )}
          <Tooltip title={t("common:tooltip.openSettings")}>
            <IconButton
              data-testid="user-menu"
              sx={{
                p: 0,
                border: `${theme.spacing(0.3)} solid ${
                  theme.palette.primary.main
                }`,
              }}
              onClick={handleOpenUserMenu}
            >
              {isUserDataLoading ? (
                <Skeleton height={40} variant="circular" width={40} />
              ) : (
                <Avatar alt={userName} src={userAvatar} />
              )}
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            data-testid="menu-appbar"
            id="menu-appbar"
            open={Boolean(anchorElUser)}
            sx={{
              mt: 6,
              ".MuiPaper-elevation": {
                px: 0,
                py: 0.2,
              },
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            disableScrollLock
            keepMounted
            onClose={handleCloseUserMenu}
          >
            <MenuItem sx={{ padding: 0 }}>
              <Link
                color={theme.palette.grey[800]}
                style={{
                  width: "100%",
                  paddingTop: theme.spacing(0.75),
                  paddingBottom: theme.spacing(0.75),
                  paddingLeft: theme.spacing(2),
                  paddingRight: theme.spacing(2),
                }}
                to={ACCOUNT_MANAGEMENT}
              >
                {t("common:account")}
              </Link>
            </MenuItem>
            <MenuItem
              onClick={() => {
                dispatch(
                  logoutUser({
                    msg: "common:logoutMsg.logout",
                    type: "success",
                  }),
                )
              }}
            >
              <Typography fontWeight="bold" textAlign="center">
                {t("buttons:logout")}
              </Typography>
            </MenuItem>
            <Divider />
            <LangSwitcher $variant="link" />
          </Menu>
        </Box>
      </StyledToolbar>
    </StyledAppBar>
  )
}

export default AppBar
