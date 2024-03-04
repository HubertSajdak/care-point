import { Card, CardContent, CardHeader } from "@mui/material"
import { useTranslation } from "react-i18next"

import EditClinicInfoForm from "../EditClinicInfoForm/EditClinicInfoForm"

const ClinicInfoCard = () => {
  const { t } = useTranslation()
  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader
        subheader={t("clinic:editClinicSubtitle")}
        title={t("clinic:clinicInformationTitle")}
      />
      <CardContent
        sx={{
          position: "relative",
          pt: 0,
          "&:last-child": { pb: 2, px: 0 },
          height: `calc(100% - 86px)`,
        }}
      >
        <EditClinicInfoForm />
      </CardContent>
    </Card>
  )
}

export default ClinicInfoCard
