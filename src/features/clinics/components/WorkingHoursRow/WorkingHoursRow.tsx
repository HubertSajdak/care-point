import { Box, Chip, Divider, Typography, useMediaQuery } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useTheme } from "styled-components"

import { translateWeekDays } from "@/shared"
import { IWorkingHours } from "@/types/api-types"

const WorkingHoursRow = ({
  startTime,
  stopTime,
  weekDay,
}: Omit<IWorkingHours, "_id">) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"))
  return (
    <Box
      alignItems="center"
      display="flex"
      gap={2}
      justifyContent="space-between"
      mb={1}
      sx={{ flexDirection: { xs: "column", sm: "row" } }}
    >
      <Typography>{t(translateWeekDays(weekDay))}</Typography>
      <Box display="flex" gap={3} justifyContent="center">
        <Chip
          // color="primary"
          label={startTime || "-"}
          size={isSmall ? "small" : "medium"}
          sx={{
            minWidth: theme.spacing(7.5),
            fontSize: 14,
            fontWeight: "bold",
          }}
        />
        <Divider
          orientation="horizontal"
          sx={{ width: theme.spacing(1.25), marginBottom: 2 }}
        />
        <Chip
          // color="primary"
          label={stopTime || "-"}
          size={isSmall ? "small" : "medium"}
          sx={{
            minWidth: theme.spacing(7.5),
            fontSize: 14,
            fontWeight: "bold",
          }}
        />
      </Box>
    </Box>
  )
}
export default WorkingHoursRow
