import { Box, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"

import AddClinicForm from "../components/AddClinicForm/AddClinicForm"

const AddClinic = () => {
  const { t } = useTranslation()
  return (
    <div>
      <Typography component="h2" fontWeight="bold" mb={2} variant="h4">
        {t("clinic:addClinicTitle")}
      </Typography>
      <Typography component="h3" mb={2} variant="subtitle1">
        {t("clinic:addClinicSubtitle")}
      </Typography>
      <Box>
        <AddClinicForm />
      </Box>
    </div>
  )
}

export default AddClinic
