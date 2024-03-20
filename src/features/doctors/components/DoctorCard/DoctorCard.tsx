import AddLocationIcon from "@mui/icons-material/AddLocation"
import PaymentsIcon from "@mui/icons-material/Payments"
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material"
import { useTranslation } from "react-i18next"
import { useTheme } from "styled-components"

import { BASE_URL, RouteNames } from "@/constants"
import { LinkButton, stringToColor, truncateString } from "@/shared"
import {
  IAppointment,
  IClinicAffiliation,
  IDoctorSpecialization,
} from "@/types/api-types"

interface DoctorCardProps {
  clinicAffiliations: IClinicAffiliation[]
  doctorAppointmentsArr: IAppointment[]
  doctorId: string
  name: string
  photo?: string
  professionalStatement?: string | null
  specializations: IDoctorSpecialization[]
}

const DoctorCard = ({
  clinicAffiliations,
  doctorAppointmentsArr,
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
      <Grid columnSpacing={2.5} rowSpacing={4} container>
        <Grid gap={2} xs={12} item>
          <Box
            alignItems="center"
            display="flex"
            gap={2}
            justifyContent="center"
            width="100%"
          >
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
        </Grid>
        <Grid gap={2} xs={6} item>
          <Box display="flex" flexDirection="column" gap={2.5}>
            <Typography fontWeight="bold">
              {t("appointment:doctorCard.specializations")}:
            </Typography>
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
                <Typography
                  color="text.secondary"
                  component="span"
                  variant="body2"
                >
                  {t("appointment:doctorCard.noSpecializationsAssigned")}
                </Typography>
              )}
            </Stack>
            <Typography fontWeight="bold">
              {t("appointment:doctorCard.worksAt")}:
            </Typography>
            <Stack gap={1.2}>
              {clinicAffiliations.length > 0 ? (
                clinicAffiliations?.map(
                  ({
                    _id,
                    clinicInfo: { address },
                    clinicName,
                    consultationFee,
                  }) => {
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
                <Typography
                  color="text.secondary"
                  component="span"
                  variant="body2"
                >
                  {t("appointment:doctorCard.noOfficeAssigned")}
                </Typography>
              )}
            </Stack>
          </Box>
        </Grid>
        <Grid gap={2} xs={6} item>
          <Typography fontWeight="bold" mb={2}>
            Najbliższe wolne terminy:
          </Typography>
          {/*<Box display="flex" flexDirection="row" flexWrap="wrap" gap={2.5}>*/}
          {/*  {clinicAffiliations.length > 0 &&*/}
          {/*  doctorAppointmentsArr.length > 0 ? (*/}
          {/*    calculateNextAvailableDates(*/}
          {/*      clinicAffiliations || [],*/}
          {/*      doctorAppointmentsArr || [],*/}
          {/*    )*/}
          {/*      ?.slice(0, 5)*/}
          {/*      ?.map((el) => {*/}
          {/*        return (*/}
          {/*          <Tooltip*/}
          {/*            key={el?.date + el?.time + el?.clinicName}*/}
          {/*            title={el?.clinicName}*/}
          {/*          >*/}
          {/*            <Chip*/}
          {/*              color="primary"*/}
          {/*              label={*/}
          {/*                el?.time +*/}
          {/*                " | " +*/}
          {/*                el?.date.split("-").reverse().join("-")*/}
          {/*              }*/}
          {/*              sx={{ fontWeight: "bold" }}*/}
          {/*              variant="filled"*/}
          {/*            />*/}
          {/*          </Tooltip>*/}
          {/*        )*/}
          {/*      })*/}
          {/*  ) : (*/}
          {/*    <Typography>*/}
          {/*      Brak wolnych terminów w najbliższym czasie*/}
          {/*    </Typography>*/}
          {/*  )}*/}
          {/*</Box>*/}
        </Grid>
        <Grid gap={2} xs={12} item>
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
                to={`${RouteNames.ALL_DOCTORS}/${doctorId}`}
                variant="text"
              >
                {t("appointment:doctorCard.viewProfile")}
              </LinkButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
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
  boxShadow: theme.mainShadow.main,
}))

export default DoctorCard
