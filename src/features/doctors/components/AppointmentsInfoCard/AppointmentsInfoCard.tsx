import { Avatar, Card, CardContent, Stack, Typography } from "@mui/material"
import Box from "@mui/material/Box"
import React from "react"
import { useTheme } from "styled-components"

const AppointmentsInfoCard = ({
  icon,
  iconBorderColor,
  text,
  title,
  titleColor,
}: {
  icon: React.ReactNode
  iconBorderColor?: string
  text: string | number
  title: string
  titleColor?: string
}) => {
  const theme = useTheme()
  return (
    <Card>
      <CardContent sx={{ height: "100%" }}>
        <Box display="flex" gap={4}>
          <Avatar
            sx={{
              borderRadius: theme.spacing(1),
              border: `${theme.spacing(0.25)} solid ${iconBorderColor}`,
              background: theme.palette.primary.contrastText,
              width: 50,
              height: 50,
            }}
            variant="square"
          >
            {icon}
          </Avatar>
          <Stack gap={2}>
            <Typography
              color={titleColor}
              component="p"
              sx={{ textWrap: "nowrap" }}
              variant="body1"
            >
              {title}
            </Typography>
            <Typography component="p" fontWeight="bold" variant="h4">
              {text}
            </Typography>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  )
}

export default AppointmentsInfoCard
