import { Box, Grid } from "@mui/material"
import { useFormikContext } from "formik"
import { t } from "i18next"

import { workingDayConfig } from "@/constants/workingDayConfig"
import { Button, translateWeekDays } from "@/shared"

import WorkingDayRow from "../WorkingDayRow/WorkingDayRow"

const EditClinicWorkingHoursForm = () => {
  const { isSubmitting } = useFormikContext()
  return (
    <Box alignItems="center" display="flex" flexDirection="column">
      <Grid maxWidth={800} rowSpacing={2} container>
        {workingDayConfig.map((day) => {
          return (
            <WorkingDayRow
              key={day.id}
              label={t(translateWeekDays(day.label))}
              startTimeLabel={t(`form:common.${day.startTimeLabel}`)}
              startTimeName={day.startTimeName}
              stopTimeLabel={t(`form:common.${day.stopTimeLabel}`)}
              stopTimeName={day.stopTimeName}
            />
          )
        })}
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
