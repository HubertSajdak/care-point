import { Typography } from "@mui/material"
import { useTranslation } from "react-i18next"

import EditClinicAffiliationForm from "../components/EditClinicAffiliationForm/EditClinicAffliliationForm"

const EditClinicAffiliation = () => {
  const { t } = useTranslation()

  return (
    <div>
      <Typography component="h2" fontWeight="bold" mb={2} variant="h4">
        {t("clinic:editClinicAffiliationTitle")}
      </Typography>
      <Typography component="h3" mb={2} variant="subtitle1">
        {t("clinic:editClinicAffiliationSubtitle")}
      </Typography>
      <div>
        <EditClinicAffiliationForm />
      </div>
    </div>
  )
}

export default EditClinicAffiliation
