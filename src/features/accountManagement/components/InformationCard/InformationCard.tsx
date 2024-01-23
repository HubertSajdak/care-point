import { Card, CardContent, CardHeader } from "@mui/material"
import { useTranslation } from "react-i18next"
import ChangeUserInfoForm from "../ChangeUserInfoForm/ChangeUserInfoForm"

const InformationCard = () => {
  const { t } = useTranslation()
  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader
        subheader={t("common:editInformation")}
        title={t("common:profile")}
      />
      <CardContent
        sx={{ pt: 0, "&:last-child": { pb: 2, px: 1.5 }, height: "auto" }}
      >
        <ChangeUserInfoForm />
      </CardContent>
    </Card>
  )
}

export default InformationCard
