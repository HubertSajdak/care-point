import { Avatar, Card, CardContent, Stack, Typography } from "@mui/material"
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
                height: "56px",
                width: "56px",
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
