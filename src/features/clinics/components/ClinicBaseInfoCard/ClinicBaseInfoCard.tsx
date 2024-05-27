import HomeIcon from "@mui/icons-material/Home"
import LocalPhoneIcon from "@mui/icons-material/LocalPhone"
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

const ClinicBaseInfoCard = () => {
  const theme = useTheme()
  const singleClinic = useAppSelector((state) => state.clinics.singleClinic)
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
            src={`${BASE_URL}` + singleClinic?.photo}
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
              {singleClinic?.clinicName}
            </Typography>
            <Divider orientation="horizontal" />
            <Box
              display="flex"
              sx={{ flexDirection: { xs: "column", lg: "row" } }}
              width="100%"
            >
              <Stack flexGrow={1} height="100%" mt={4}>
                <Box alignItems="center" display="flex" gap={2} mb={2.5}>
                  <LocalPhoneIcon color="primary" />
                  <Typography component="p" variant="h6">
                    {singleClinic?.phoneNumber}
                  </Typography>
                </Box>
                <Box alignItems="center" display="flex" gap={2} mb={2.5}>
                  <HomeIcon color="primary" />
                  <Typography component="p" variant="h6">
                    {singleClinic?.address.street},{"  "}
                    {singleClinic?.address.city},{"  "}
                    {singleClinic?.address.postalCode}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ClinicBaseInfoCard
