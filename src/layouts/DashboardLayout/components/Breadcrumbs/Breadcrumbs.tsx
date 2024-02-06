import { Skeleton, Typography, styled } from "@mui/material"
import MuiBreadcrumbs, { BreadcrumbsOwnProps } from "@mui/material/Breadcrumbs"
import { useTranslation } from "react-i18next"
import { useLocation } from "react-router-dom"

import { useAppSelector } from "@/app/hooks"
import { RouteNames } from "@/constants"
import { Link } from "@/shared"
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
  const doctorName = useAppSelector((state) => state.doctors.selectedDoctorData)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let currentLink = ""
  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb, idx, arr) => {
      currentLink += `/${crumb}`
      if (crumb === "dashboard") {
        return <Typography key="dashboard">{crumb}</Typography>
      }
      if (arr.includes("makeAppointment") && idx > 2) return
      if (crumb === "makeAppointment") {
        if (!doctorName?.name || !doctorName?.surname) {
          return <Skeleton key={crumb} variant="text" width={150} />
        }
        return (
          <Link
            color="inherit"
            key={crumb}
            to={`${RouteNames.DASHBOARD}/${crumb}`}
          >
            {t(`sidebar:makeAppointmentWith`)}{" "}
            {`${doctorName?.name} ${doctorName?.surname}`}
          </Link>
        )
      }
      return idx !== arr.length - 1 ? (
        <Link
          color="inherit"
          key={crumb}
          to={`${RouteNames.DASHBOARD}/${crumb}`}
          onClick={() => {}}
        >
          {t(`sidebar:${crumb}`)}
        </Link>
      ) : (
        <Typography color="primary" fontWeight="bold" key="3">
          {t(`sidebar:${crumb}`)}
        </Typography>
      )
    })
  return (
    <StyledBreadCrumbs
      $drawerwidth={drawerWidth}
      $issidebaropen={isSidebarOpen}
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
}>(({ $drawerwidth, $issidebaropen, theme }) => ({
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
