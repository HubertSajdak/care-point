import BoyIcon from "@mui/icons-material/Boy"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import EmailIcon from "@mui/icons-material/Email"
import HomeIcon from "@mui/icons-material/Home"
import LocalPhoneIcon from "@mui/icons-material/LocalPhone"
import ScaleIcon from "@mui/icons-material/Scale"
import {
  Avatar,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material"
import Box from "@mui/material/Box"
import React from "react"
import { useTheme } from "styled-components"

import { useAppSelector } from "@/app/hooks"
import { BASE_URL } from "@/constants"
import { calculateAge } from "@/shared"

const PatientBaseInfoCard = () => {
  const theme = useTheme()
  const singlePatientData = useAppSelector(
    (state) => state.patients.selectedPatientData,
  )
  return (
    <Card>
      <CardContent>
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
            src={`${BASE_URL}` + singlePatientData?.photo}
            sx={{
              width: { xs: 200, md: 300 },
              height: { xs: 200, md: 300 },
              border: `${theme.spacing(0.375)} solid ${
                theme.palette.primary.main
              }`,
            }}
          />
          <Stack width="100%">
            <Typography component="p" variant="h4">
              {singlePatientData?.name} {singlePatientData?.surname}
            </Typography>
            <Divider orientation="horizontal" />
            <Box
              display="flex"
              sx={{ flexDirection: { xs: "column", lg: "row" } }}
              width="100%"
            >
              <Stack flexGrow={1} height="100%" mt={4}>
                <Box alignItems="center" display="flex" gap={2} mb={2.5}>
                  <EmailIcon color="primary" />
                  <Typography component="p" variant="h6">
                    {singlePatientData?.email}
                  </Typography>
                </Box>{" "}
                <Box alignItems="center" display="flex" gap={2} mb={2.5}>
                  <LocalPhoneIcon color="primary" />
                  <Typography component="p" variant="h6">
                    {singlePatientData?.phoneNumber}
                  </Typography>
                </Box>{" "}
                <Box alignItems="center" display="flex" gap={2} mb={2.5}>
                  <HomeIcon color="primary" />
                  <Typography component="p" variant="h6">
                    {singlePatientData?.address.street},{"  "}
                    {singlePatientData?.address.city},{"  "}
                    {singlePatientData?.address.postalCode}
                  </Typography>
                </Box>{" "}
              </Stack>
              <Stack flexGrow={1} height="100%" mt={4}>
                <Box alignItems="center" display="flex" gap={2} mb={2.5}>
                  <CalendarMonthIcon color="primary" />
                  <Typography component="p" variant="h6">
                    {singlePatientData?.birthDate} (
                    {calculateAge(singlePatientData?.birthDate || "")})
                  </Typography>
                </Box>{" "}
                <Box alignItems="center" display="flex" gap={2} mb={2.5}>
                  <BoyIcon color="primary" />
                  <Typography component="p" variant="h6">
                    {singlePatientData?.height} cm
                  </Typography>
                </Box>{" "}
                <Box alignItems="center" display="flex" gap={2} mb={2.5}>
                  <ScaleIcon color="primary" />
                  <Typography component="p" variant="h6">
                    {singlePatientData?.weight} kg
                  </Typography>
                </Box>{" "}
              </Stack>
            </Box>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  )
}

export default PatientBaseInfoCard
