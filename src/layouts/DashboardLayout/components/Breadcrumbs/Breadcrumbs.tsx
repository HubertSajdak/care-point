import { Skeleton, styled, Typography, useTheme } from "@mui/material"
import MuiBreadcrumbs, { BreadcrumbsOwnProps } from "@mui/material/Breadcrumbs"
import { useTranslation } from "react-i18next"
import { useLocation } from "react-router-dom"

import { useAppSelector } from "@/app/hooks"
import { RouteNames } from "@/constants"
import { Link } from "@/shared"

export interface BreadcrumbsProps extends BreadcrumbsOwnProps {}

const Breadcrumbs = ({ ...otherProps }: BreadcrumbsProps) => {
  const location = useLocation()
  const theme = useTheme()
  const { t } = useTranslation(["sidebar"]) // why sidebar ns?
  const doctorName = useAppSelector((state) => state.doctors.selectedDoctorData)
  const clinicName = useAppSelector(
    (state) => state.clinics.singleClinic?.clinicName,
  )
  const patientName = useAppSelector(
    (state) => state.patients.selectedPatientData,
  )
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let currentLink = ""
  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb, idx, arr) => {
      currentLink += `/${crumb}`
      if (crumb === "dashboard") {
        return (
          <Typography fontWeight="bold" key="dashboard">
            {crumb}
          </Typography>
        )
      }
      if (
        arr.includes("addClinicAffiliation") ||
        arr.includes("editClinicAffiliation") ||
        (arr.includes("allClinics") && idx > 1) // what this if do?
      ) {
        if (!clinicName) {
          return <Skeleton key={crumb} variant="text" width={150} />
        }
        return (
          <Typography color="primary" fontWeight="bold" key={crumb}>
            {clinicName}
          </Typography>
        )
      }
      if (
        crumb === "addClinicAffiliation" ||
        crumb === "editClinicAffiliation" //same here, what this if do?
      ) {
        return (
          <Link
            color={theme.palette.grey[700]}
            key={crumb}
            to={RouteNames.ALL_CLINICS}
          >
            {t(`sidebar:${crumb}`)}
          </Link>
        )
      }
      if (arr.includes("makeAppointment") && idx > 2) return
      if (arr.includes("editClinic") && idx === 1) {
        return (
          <Link
            color={theme.palette.grey[700]}
            key={crumb}
            to={RouteNames.ALL_CLINICS}
          >
            {t("sidebar:editClinic")}
          </Link>
        )
      }
      if (arr.includes("editClinic") && idx > 1) {
        if (!clinicName) {
          return <Skeleton key={crumb} variant="text" width={150} />
        }
        return (
          <Typography color="primary" fontWeight="bold" key={crumb}>
            {clinicName}
          </Typography>
        )
      }
      if (crumb === "makeAppointment") {
        if (!doctorName?.name || !doctorName?.surname) {
          return <Skeleton key={crumb} variant="text" width={150} />
        }
        return (
          <Typography color="primary" fontWeight="bold" key={crumb}>
            {t(`sidebar:makeAppointmentWith`)}{" "}
            {`${doctorName?.name} ${doctorName?.surname}`}
          </Typography>
        )
      }
      if (arr.includes("allDoctors") && idx > 1) {
        if (!doctorName?.name || !doctorName?.surname) {
          return <Skeleton key={crumb} variant="text" width={150} />
        }
        return (
          <Typography color="primary" fontWeight="bold" key={crumb}>
            {`${doctorName?.name} ${doctorName?.surname}`}
          </Typography>
        )
      }
      if (arr.includes("allPatients") && idx > 1) {
        if (!patientName?.name || !patientName?.surname) {
          return <Skeleton key={crumb} variant="text" width={150} />
        }
        return (
          <Typography color="primary" fontWeight="bold" key={crumb}>
            {`${patientName?.name} ${patientName?.surname}`}
          </Typography>
        )
      }
      return idx !== arr.length - 1 ? (
        <Link
          color={theme.palette.grey[700]}
          key={crumb}
          to={`${RouteNames.DASHBOARD}/${crumb}`}
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
    <StyledBreadCrumbs {...otherProps} separator="/">
      {crumbs}
    </StyledBreadCrumbs>
  )
}

export default Breadcrumbs

const StyledBreadCrumbs = styled(MuiBreadcrumbs)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}))
