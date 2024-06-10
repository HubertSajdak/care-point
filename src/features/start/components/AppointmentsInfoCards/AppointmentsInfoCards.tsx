import { Grid } from "@mui/material"
import React from "react"

import InfoCard from "./InfoCard"

interface AppointmentsInfoCardsProps {
  appointmentsConfig: {
    icon: React.ReactNode
    iconColor: string
    id: number
    text: string | number
    title: string
    titleColor?: string
  }[]
}

function AppointmentsInfoCards({
  appointmentsConfig,
}: AppointmentsInfoCardsProps) {
  return appointmentsConfig.map((config) => {
    return (
      <Grid key={config.id} lg={4} xs={12} item>
        <InfoCard
          icon={config.icon}
          iconColor={config.iconColor}
          key={config.id}
          text={config.text}
          title={config.title}
          titleColor={config.titleColor}
        />
      </Grid>
    )
  })
}

export default AppointmentsInfoCards
