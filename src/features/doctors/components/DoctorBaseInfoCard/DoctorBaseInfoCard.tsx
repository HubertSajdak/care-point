import EmailIcon from "@mui/icons-material/Email"
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation"
import {
  Avatar,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material"
import Box from "@mui/material/Box"
import React from "react"
import { useTranslation } from "react-i18next"
import { useTheme } from "styled-components"

import { useAppSelector } from "@/app/hooks"
import { BASE_URL } from "@/constants"

const DoctorBaseInfoCard = () => {
  const theme = useTheme()
  const singleDoctorData = useAppSelector(
    (state) => state.doctors.selectedDoctorData,
  )
  const { t } = useTranslation()
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        height: "100%",
      }}
    >
      <CardContent sx={{ height: "100%" }}>
        <Box
          display="flex"
          gap={4}
          justifyContent="space-between"
          sx={{
            flexDirection: { xs: "column", lg: "row" },
            alignItems: { xs: "center", lg: "inherit" },
          }}
          width="100%"
        >
          <Avatar
            src={`${BASE_URL}` + singleDoctorData?.photo}
            sx={{
              width: { xs: 200, md: 300 },
              height: { xs: 200, md: 300 },
              border: `3px solid ${theme.palette.primary.main}`,
            }}
          />
          <Stack width="100%">
            <Typography component="p" variant="h4">
              {singleDoctorData?.name} {singleDoctorData?.surname}
            </Typography>
            <Divider orientation="horizontal" />
            <Stack height="100%" mt={4}>
              <Box alignItems="center" display="flex" gap={2} mb={4}>
                <EmailIcon color="primary" />
                <Typography component="p" variant="h6">
                  {singleDoctorData?.email}
                </Typography>
              </Box>
              <Typography component="p" variant="subtitle1">
                {singleDoctorData?.professionalStatement}
              </Typography>
              <Box
                alignItems="center"
                display="flex"
                flexWrap="wrap"
                gap={2}
                mt={4}
              >
                <MedicalInformationIcon color="primary" />
                {singleDoctorData?.DoctorSpecialization &&
                singleDoctorData?.DoctorSpecialization.length > 0 ? (
                  singleDoctorData?.DoctorSpecialization.map((el) => {
                    return (
                      <Chip
                        color="primary"
                        key={el.Specialization._id}
                        label={el.Specialization.specializationKey}
                        sx={{ fontSize: "16px", fontWeight: "bold" }}
                        variant="outlined"
                      />
                    )
                  })
                ) : (
                  <Typography>
                    {t("appointment:doctorCard.noSpecializationsAssigned")}
                  </Typography>
                )}
              </Box>
            </Stack>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  )
}

export default DoctorBaseInfoCard
