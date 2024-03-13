import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled"
import PaymentsIcon from "@mui/icons-material/Payments"
import {
  Avatar,
  Box,
  Divider,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material"
import { useTranslation } from "react-i18next"
import styled, { useTheme } from "styled-components"

import { BASE_URL, RouteNames } from "@/constants"
import { Tabs, stringToColor } from "@/shared"
import ButtonLink from "@/shared/ui/Buttons/LinkButton/ButtonLink"
import { IAddress, IWorkingHours } from "@/types/api-types"

import WorkingHoursRow from "../WorkingHoursRow/WorkingHoursRow"
interface ClinicCardProps {
  address: IAddress
  clinicName: string
  clinicWorkingTime: IWorkingHours[]
  consultationFee: number
  doctorWorkingTime: IWorkingHours[]
  id: string
  photo?: string | undefined
  timePerPatient: number
}
const ClinicCard = ({
  address,
  clinicName,
  clinicWorkingTime,
  consultationFee,
  doctorWorkingTime,
  id,
  photo,
  timePerPatient,
}: ClinicCardProps) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"))
  return (
    <StyledPaper>
      <Box
        alignItems="center"
        display="flex"
        flexDirection={isSmall ? "column" : "row"}
        gap={2}
      >
        <Avatar
          alt={clinicName}
          src={photo ? BASE_URL + photo : ""}
          sx={{
            width: 150,
            height: 150,
            border: `3px solid ${theme.palette.grey[200]}`,
            alignSelf: "center",
            bgcolor: stringToColor(clinicName),
          }}
        >
          <Typography component="span" variant="h4">
            {clinicName.split(" ").map((el) => {
              return el.slice(0, 1)
            })}
          </Typography>
        </Avatar>
        <Box display="flex" flexDirection="column" gap={1} width="100%">
          <Typography
            component="div"
            mb={0}
            textAlign="left"
            variant="h5"
            gutterBottom
          >
            {clinicName}
          </Typography>

          <Divider />
          <Typography
            color="text.secondary"
            fontWeight="bold"
            textAlign="justify"
            variant="body2"
          >
            {address.street}, {address.city}, {address.postalCode}
          </Typography>
        </Box>
      </Box>
      <Typography component="p" variant="h6">
        Podstawowe informacje:
      </Typography>
      <Box
        alignItems={isSmall ? "center" : "inherit"}
        display="flex"
        flexDirection={isSmall ? "column" : "row"}
        justifyContent="space-between"
      >
        <Typography>{t("clinic:consultationFee")}:</Typography>
        <Box display="flex" gap={1}>
          <Typography fontWeight="bold">{consultationFee}</Typography>
          <PaymentsIcon color="primary" />
        </Box>
      </Box>
      <Box
        alignItems={isSmall ? "center" : "inherit"}
        display="flex"
        flexDirection={isSmall ? "column" : "row"}
        justifyContent="space-between"
      >
        <Typography>{t("clinic:consultationTime")}:</Typography>
        <Box display="flex" gap={1}>
          <Typography fontWeight="bold">{timePerPatient} min.</Typography>
          <AccessTimeFilledIcon color="primary" />
        </Box>
      </Box>
      <Tabs
        appBarSx={{ borderRadius: 1, overflow: "hidden" }}
        content={[
          {
            id: 0,
            label: t("clinic:yourWorkingHours"),
            render: doctorWorkingTime.map(
              ({ _id, startTime, stopTime, weekDay }) => {
                return (
                  <WorkingHoursRow
                    key={_id}
                    startTime={startTime}
                    stopTime={stopTime}
                    weekDay={weekDay}
                  />
                )
              },
            ),
          },
          {
            id: 1,
            label: t("clinic:workingHoursTitle"),
            render: clinicWorkingTime.map(
              ({ _id, startTime, stopTime, weekDay }) => {
                return (
                  <WorkingHoursRow
                    key={_id}
                    startTime={startTime}
                    stopTime={stopTime}
                    weekDay={weekDay}
                  />
                )
              },
            ),
          },
        ]}
      />
      <Divider />
      <Box display="flex" justifyContent="flex-end">
        <ButtonLink to={RouteNames.EDIT_CLINIC_AFFILIATION + `/${id}`}>
          {t("buttons:edit")}
        </ButtonLink>
      </Box>
    </StyledPaper>
  )
}

export default ClinicCard

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(3),
  gap: theme.spacing(1.6),
  borderRadius: theme.spacing(2.5),
  height: "100%",
}))
