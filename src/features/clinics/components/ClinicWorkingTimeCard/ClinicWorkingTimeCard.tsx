import { Box, Card, CardContent, CardHeader } from "@mui/material"
import { useTranslation } from "react-i18next"

import EditClinicWorkingHoursForm from "../EditClinicWorkingHoursForm/EditClinicWorkingHoursForm"

const ClinicWorkingTimeCard = () => {
  const { t } = useTranslation()
  return (
    <Card>
      <CardHeader
        subheader={t("clinic:workingHoursSubtitle")}
        title={t("clinic:workingHoursTitle")}
      />
      <CardContent sx={{ pt: 3 }}>
        <Box sx={{ m: -1.5, p: 1, pb: 0 }}>
          <EditClinicWorkingHoursForm />
        </Box>
      </CardContent>
    </Card>
  )
}

export default ClinicWorkingTimeCard
