import Link from "@/shared/Link/Link"
import { Typography, styled } from "@mui/material"
import MuiBreadcrumbs, { BreadcrumbsOwnProps } from "@mui/material/Breadcrumbs"
import { useTranslation } from "react-i18next"
import { useLocation } from "react-router-dom"
export interface BreadcrumbsProps extends BreadcrumbsOwnProps {
  drawerWidth: number
  isSidebarOpen: boolean
}
const Breadcrumbs = ({
  drawerWidth,
  isSidebarOpen,
  ...otherProps
}: BreadcrumbsProps) => {
  const location = useLocation()
  const { t } = useTranslation(["sidebar"])
  let currentLink = ""
  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb, idx, arr) => {
      currentLink += `/${crumb}`
      if (crumb === "dashboard") {
        return <Typography key="dashboard">{crumb}</Typography>
      }
      return idx !== arr.length - 1 ? (
        <Link key={crumb} color="inherit" to={`/${crumb}`} onClick={() => {}}>
          {t(`sidebar:${crumb}`)}
        </Link>
      ) : (
        <Typography key="3" color="primary" fontWeight="bold">
          {t(`sidebar:${crumb}`)}
        </Typography>
      )
    })

  return (
    <StyledBreadCrumbs
      $issidebaropen={isSidebarOpen}
      $drawerwidth={drawerWidth}
      {...otherProps}
      separator="/"
    >
      {crumbs}
    </StyledBreadCrumbs>
  )
}

export default Breadcrumbs

const StyledBreadCrumbs = styled(MuiBreadcrumbs)<{
  $drawerwidth: number
  $issidebaropen: boolean
}>(({ theme, $drawerwidth, $issidebaropen }) => ({
  marginTop: "56px",
  padding: theme.spacing(3),
  flexGrow: 1,
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  [theme.breakpoints.up("sm")]: {
    marginTop: "64px",
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
