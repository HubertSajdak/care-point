import { useAppDispatch } from "@/app/hooks"
import { RouteNames } from "@/constants/routes"
import { logoutUser } from "@/features/auth/authSlice"
import LangSwitcher from "@/shared/LangSwitcher/LangSwitcher"
import Link from "@/shared/Link/Link"
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
const { ACCOUNT_MANAGEMENT } = RouteNames
export interface AppBarProps extends MuiAppBarProps {
  isOpen: boolean
  handleDrawerToggle: () => void
  drawerWidth: number
  userName: string
  userAvatar: string
  isUserDataLoading: boolean
}
const AppBar = ({
  isOpen,
  handleDrawerToggle,
  drawerWidth,
  userName,
  userAvatar,
  isUserDataLoading,
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
      position="fixed"
      open={isOpen}
      $drawerwidth={drawerWidth}
      {...MuiAppBarProps}
      data-testid="banner"
    >
      <StyledToolbar>
        <IconButton
          color="inherit"
          aria-label="toggle drawer"
          edge="start"
          onClick={handleDrawerToggle}
        >
          {isOpen ? <ArrowBackIosNewIcon /> : <MenuIcon />}
        </IconButton>
        <Box display="flex" alignItems="center" gap={2} sx={{ flexGrow: 0 }}>
          {isUserDataLoading ? (
            <Skeleton variant="text" width={40} sx={{ fontSize: "1.2rem" }} />
          ) : (
            <Typography sx={{ fontWeight: "bold" }}>{userName}</Typography>
          )}
          <Tooltip title="Open settings">
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{
                p: 0,
                border: `2px solid ${theme.palette.primary.main}`,
              }}
              data-testid="user-menu"
            >
              {isUserDataLoading ? (
                <Skeleton variant="circular" width={40} height={40} />
              ) : (
                <Avatar alt={userName} src={userAvatar} />
              )}
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            data-testid="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem sx={{ padding: 0 }}>
              <Link
                to={ACCOUNT_MANAGEMENT}
                style={{
                  width: "100%",
                  color: "#486581",
                  padding: "6px 16px",
                }}
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
                textAlign="center"
                sx={{
                  color: "#486581",
                }}
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

const StyledAppBar = styled(MuiAppBar)<{ open: boolean; $drawerwidth: number }>(
  ({ theme, open, $drawerwidth }) => ({
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
