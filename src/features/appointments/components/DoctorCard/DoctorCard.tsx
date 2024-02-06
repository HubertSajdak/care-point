import AddLocationIcon from "@mui/icons-material/AddLocation"
import PaymentsIcon from "@mui/icons-material/Payments"
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material"
import { useTranslation } from "react-i18next"
import { useTheme } from "styled-components"

import { BASE_URL, RouteNames } from "@/constants"
import { LinkButton, truncateString } from "@/shared"
import { IClinicAffiliation, IDoctorSpecialization } from "@/types/api-types"

interface DoctorCardProps {
  clinicAffiliations: IClinicAffiliation[]
  doctorId: string
  name: string
  photo?: string
  professionalStatement?: string | null
  specializations: IDoctorSpecialization[]
}

const stringToColor = (string: string) => {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = "#"

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}
const DoctorCard = ({
  clinicAffiliations,
  doctorId,
  name,
  photo,
  professionalStatement,
  specializations,
}: DoctorCardProps) => {
  const theme = useTheme()
  const { t } = useTranslation(["appointment"])
  return (
    <StyledPaper>
      <Box alignItems="center" display="flex" gap={2}>
        <Avatar
          alt={name}
          src={photo ? BASE_URL + photo : ""}
          sx={{
            width: 150,
            height: 150,
            border: `3px solid ${theme.palette.grey[200]}`,
            alignSelf: "center",
            bgcolor: stringToColor(name),
          }}
        >
          <Typography component="span" variant="h4">
            {name.split(" ").map((el) => {
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
            {name}
          </Typography>

          <Divider />
          <Typography
            color="text.secondary"
            textAlign="justify"
            variant="body2"
          >
            {professionalStatement
              ? truncateString(professionalStatement, 140)
              : t("appointment:doctorCard.noStatement")}
          </Typography>
        </Box>
      </Box>
      <Typography>{t("appointment:doctorCard.specializations")}:</Typography>
      <Stack direction="row" flexWrap="wrap" gap={1}>
        {specializations.length > 0 ? (
          specializations?.map(({ _id, Specialization }) => {
            return (
              <Chip
                color="primary"
                key={_id}
                label={Specialization?.specializationKey}
                size="medium"
                variant="outlined"
              />
            )
          })
        ) : (
          <Typography color="text.secondary" component="span" variant="body2">
            {t("appointment:doctorCard.noSpecializationsAssigned")}
          </Typography>
        )}
      </Stack>
      <Typography>{t("appointment:doctorCard.worksAt")}:</Typography>
      <Stack gap={1.2}>
        {clinicAffiliations.length > 0 ? (
          clinicAffiliations?.map(
            ({ _id, clinicInfo: { address }, clinicName, consultationFee }) => {
              return (
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  key={_id}
                >
                  <Box alignItems="center" display="flex" gap={1}>
                    <AddLocationIcon color="primary" />
                    <Typography component="span">
                      {clinicName} ({address?.street}, {address?.city},{" "}
                      {address?.postalCode})
                    </Typography>
                  </Box>
                  <Box display="flex" gap={1}>
                    <PaymentsIcon color="primary" />
                    <Typography>{consultationFee}</Typography>
                  </Box>
                </Box>
              )
            },
          )
        ) : (
          <Typography color="text.secondary" component="span" variant="body2">
            {t("appointment:doctorCard.noOfficeAssigned")}
          </Typography>
        )}
      </Stack>
      <Box marginTop={"auto"}>
        <Divider sx={{ marginBottom: 2 }} />
        <Box display="flex" justifyContent="space-between">
          <LinkButton
            size="small"
            to={`${RouteNames.MAKE_APPOINTMENT}/${doctorId}`}
            variant="text"
          >
            {t("appointment:doctorCard.makeAppointment")}
          </LinkButton>
          <LinkButton
            size="small"
            to={`${RouteNames.MAKE_APPOINTMENT}/${doctorId}`}
            variant="text"
          >
            {t("appointment:doctorCard.viewProfile")}
          </LinkButton>
        </Box>
      </Box>
    </StyledPaper>
  )
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(3),
  gap: theme.spacing(1.6),
  borderRadius: theme.spacing(2.5),
  height: "100%",
}))

export default DoctorCard
