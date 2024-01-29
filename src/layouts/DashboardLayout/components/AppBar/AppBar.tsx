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
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import IconButton from "@mui/material/IconButton"
import Toolbar from "@mui/material/Toolbar"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import styled, { useTheme } from "styled-components"

import { useAppDispatch } from "@/app/hooks"
import { RouteNames } from "@/constants/routes"
import { logoutUser } from "@/features/auth/authSlice"
import LangSwitcher from "@/shared/LangSwitcher/LangSwitcher"
import Link from "@/shared/Link/Link"
const { ACCOUNT_MANAGEMENT } = RouteNames
export interface AppBarProps extends MuiAppBarProps {
  drawerWidth: number
  handleDrawerToggle: () => void
  isOpen: boolean
  isUserDataLoading: boolean
  userAvatar: string
  userName: string
}
const AppBar = ({
  drawerWidth,
  handleDrawerToggle,
  isOpen,
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
            <Skeleton sx={{ fontSize: "1.2rem" }} variant="text" width={40} />
          ) : (
            <Typography sx={{ fontWeight: "bold" }}>{userName}</Typography>
          )}
          <Tooltip title="Open settings">
            <IconButton
              data-testid="user-menu"
              sx={{
                p: 0,
                border: `2px solid ${theme.palette.primary.main}`,
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
            sx={{ mt: "45px" }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            onClose={handleCloseUserMenu}
          >
            <MenuItem sx={{ padding: 0 }}>
              <Link
                style={{
                  width: "100%",
                  color: "#486581",
                  padding: "6px 16px",
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
              <Typography
                sx={{
                  color: "#486581",
                }}
                textAlign="center"
              >
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

const StyledAppBar = styled(MuiAppBar)<{ $drawerwidth: number; open: boolean }>(
  ({ $drawerwidth, open, theme }) => ({
    padding: 2,
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.common.white,
    boxShadow: "none",
    outline: `1px solid ${theme.palette.grey[300]}`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up("sm")]: {
      ...(open && {
        width: `calc(100% - ${$drawerwidth}px)`,
        marginLeft: `${$drawerwidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }),
    },
  }),
)
const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`
