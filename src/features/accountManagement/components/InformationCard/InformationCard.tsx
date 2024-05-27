import { Card, CardContent, CardHeader } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useTheme } from "styled-components"

import ChangeUserInfoForm from "../ChangeUserInfoForm/ChangeUserInfoForm"

const InformationCard = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  return (
    <Card
      sx={{
        height: "100%",
      }}
    >
      <CardHeader
        subheader={t("common:editInformation")}
        title={t("common:profile")}
      />
      <CardContent
        sx={{
          position: "relative",
          pt: 0,
          "&:last-child": { pb: 2, px: 1.5 },
          height: `calc(100% - ${theme.spacing(11)})`,
        }}
      >
        <ChangeUserInfoForm />
      </CardContent>
    </Card>
  )
}

export default InformationCard
