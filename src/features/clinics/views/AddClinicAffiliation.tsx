import { Typography } from "@mui/material"
import { useTranslation } from "react-i18next"

import AddClinicAffiliationForm from "../components/AddClinicAffiliationForm/AddClinicAffiliationForm"

const AddClinicAffiliation = () => {
  const { t } = useTranslation()

  return (
    <div>
      <Typography component="h2" fontWeight="bold" mb={2} variant="h4">
        {t("clinic:addClinicAffiliationTitle")}
      </Typography>
      <Typography component="h3" mb={2} variant="subtitle1">
        {t("clinic:addClinicAffiliationSubtitle")}
      </Typography>
      <div>
        <AddClinicAffiliationForm />
      </div>
    </div>
  )
}

export default AddClinicAffiliation
