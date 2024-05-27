import {
  Avatar,
  Card,
  CardContent,
  Stack,
  Typography,
  useTheme,
} from "@mui/material"
import React from "react"

const InfoCard = ({
  icon,
  iconColor,
  text,
  title,
  titleColor,
}: {
  icon: React.ReactNode
  iconColor?: string
  text: string | number
  title: string
  titleColor?: string
}) => {
  const theme = useTheme()
  return (
    <Card>
      <CardContent>
        <Stack spacing={3}>
          <Stack
            direction="row"
            spacing={6}
            sx={{ alignItems: "flex-start", justifyContent: "space-between" }}
          >
            <Stack spacing={1}>
              <Typography
                color={titleColor}
                fontWeight="bold"
                variant="overline"
              >
                {title}
              </Typography>
              <Typography variant="h4">{text}</Typography>
            </Stack>
            <Avatar
              sx={{
                height: theme.spacing(7),
                width: theme.spacing(7),
                backgroundColor: iconColor,
              }}
            >
              {icon}
            </Avatar>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default InfoCard
