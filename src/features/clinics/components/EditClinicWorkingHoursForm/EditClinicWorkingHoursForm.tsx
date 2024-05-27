import { Box, Grid } from "@mui/material"
import dayjs from "dayjs"
import { useFormikContext } from "formik"
import { t } from "i18next"

import { useAppSelector } from "@/app/hooks"
import { workingDayConfig } from "@/constants/workingDayConfig"
import { Button } from "@/shared"

import WorkingDayRow from "../WorkingDayRow/WorkingDayRow"

const EditClinicWorkingHoursForm = () => {
  const { isSubmitting } = useFormikContext()
  const singleClinic = useAppSelector((state) => state.clinics.singleClinic)
  return (
    <Box alignItems="center" display="flex" flexDirection="column">
      <Grid maxWidth={800} rowSpacing={2} container>
        <WorkingDayRow
          stopTimeMinTime={(workingDayId) => {
            return dayjs(
              `2018-04-04 ${singleClinic?.workingTime[workingDayId].startTime}`,
            ).add(15, "minute")
          }}
          workingDays={workingDayConfig}
        />
      </Grid>
      <Box alignSelf="flex-end" display="flex" justifyContent="flex-end" mt={2}>
        <Button isSubmitting={isSubmitting} type="submit" variant="contained">
          {t("buttons:saveDetails")}
        </Button>
      </Box>
    </Box>
  )
}

export default EditClinicWorkingHoursForm
