import { Paper, Typography } from "@mui/material"
import { BarChart } from "@mui/x-charts"
import React from "react"
import { useTranslation } from "react-i18next"
import { useTheme } from "styled-components"

import { useAppSelector } from "@/app/hooks"

import { chartSeries } from "../../constants/chartSeries"
import { chartXAxis } from "../../constants/chartXAxis"

function AppointmentsChart() {
  const theme = useTheme()
  const { t } = useTranslation()
  const userAppointments = useAppSelector(
    (state) => state.appointments.userAppointmentsData,
  )
  return (
    <>
      <Typography component="h4" mb={2} variant="h5">
        {t("common:yearlyAppointmentsChart")}
      </Typography>
      <Paper
        sx={{
          width: "100%",
          height: `calc(100% - ${theme.spacing(6)})`,
          boxShadow: theme.mainShadow.main,
        }}
      >
        <BarChart
          colors={[
            theme.palette.grey[500],
            theme.palette.primary.main,
            theme.palette.warning.main,
          ]}
          height={430}
          series={chartSeries(userAppointments || [])}
          slotProps={{
            legend: {
              itemMarkWidth: 16,
              itemMarkHeight: 16,
            },
          }}
          width={undefined}
          xAxis={chartXAxis()}
          yAxis={[
            {
              label: t("common:appointmentsNumber"),
            },
          ]}
        />
      </Paper>
    </>
  )
}

export default AppointmentsChart
