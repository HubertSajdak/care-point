import { Card, CardContent, Typography } from "@mui/material"
import React from "react"
import { useTranslation } from "react-i18next"

import { useAppSelector } from "@/app/hooks"

import WorkingHoursRow from "../WorkingHoursRow/WorkingHoursRow"

const ClinicWorkingHoursCard = () => {
  const { t } = useTranslation()
  const singleClinic = useAppSelector((state) => state.clinics.singleClinic)
  return (
    <Card>
      <CardContent>
        <Typography component="p" mb={4} textAlign="center" variant="h5">
          {t("clinic:clinicWorkingHours")}
        </Typography>

        {singleClinic?.workingTime.map((el) => {
          return (
            <WorkingHoursRow
              key={el._id}
              startTime={el.startTime}
              stopTime={el.stopTime}
              weekDay={el.weekDay}
            />
          )
        })}
      </CardContent>
    </Card>
  )
}

export default ClinicWorkingHoursCard
