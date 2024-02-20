import { Box, Grid, Typography, styled } from "@mui/material"
import { useTranslation } from "react-i18next"

import Img from "@/assets/images/confirm.svg?react"
import { IAddress } from "@/types/api-types"
interface ConfirmAppointmentProps {
  address?: IAddress
  appointmentDate?: string
  clinicName?: string
  consultationFee?: number
  doctorName?: string
}
const ConfirmAppointment = ({
  address,
  appointmentDate,
  clinicName,
  consultationFee,
  doctorName,
}: ConfirmAppointmentProps) => {
  const { t } = useTranslation()
  return (
    <Box alignItems="center" display="flex" flexDirection="column" width="100%">
      <Img height={150} width={150} />
      <Typography mb={4} variant="h4">
        {t("form:appointment.confirm")}
      </Typography>

      <Grid columnSpacing={4} container>
        <Grid sx={{ textAlign: "right" }} item xs>
          {doctorName && (
            <StyledTitleTypography variant="body1">
              {t("form:appointment.doctor")}:
            </StyledTitleTypography>
          )}
          {appointmentDate && (
            <StyledTitleTypography variant="body1">
              {t("form:appointment.dayOfVisit")}:
            </StyledTitleTypography>
          )}
          {appointmentDate && (
            <StyledTitleTypography variant="body1">
              {t("form:appointment.visitTime")}:
            </StyledTitleTypography>
          )}
          {consultationFee && (
            <StyledTitleTypography variant="body1">
              {t("form:appointment.consultationFee")}:
            </StyledTitleTypography>
          )}
          {clinicName && (
            <StyledTitleTypography variant="body1">
              {t("form:appointment.clinicName")}:
            </StyledTitleTypography>
          )}
          {Object.keys(address || {}).length > 0 && (
            <StyledTitleTypography variant="body1">
              {t("form:appointment.address")}:
            </StyledTitleTypography>
          )}
        </Grid>
        <Grid item xs>
          {doctorName && (
            <StyledTextTypography variant="body1">
              {doctorName || ""}
            </StyledTextTypography>
          )}
          {appointmentDate && (
            <StyledTextTypography variant="body1">
              {appointmentDate.split(" ")[0]}
            </StyledTextTypography>
          )}
          {appointmentDate && (
            <StyledTextTypography variant="body1">
              {appointmentDate?.split(" ")?.[1]}
            </StyledTextTypography>
          )}
          {consultationFee && (
            <StyledTextTypography variant="body1">250</StyledTextTypography>
          )}
          {clinicName && (
            <StyledTextTypography variant="body1">
              {clinicName}
            </StyledTextTypography>
          )}
          {Object.keys(address || {}).length > 0 && (
            <>
              <StyledTextTypography variant="body1">
                {address?.street}
              </StyledTextTypography>
              <StyledTextTypography variant="body1">
                {address?.city}
              </StyledTextTypography>
              <StyledTextTypography variant="body1">
                {address?.postalCode}
              </StyledTextTypography>
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default ConfirmAppointment

const StyledTitleTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
}))
const StyledTextTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}))
