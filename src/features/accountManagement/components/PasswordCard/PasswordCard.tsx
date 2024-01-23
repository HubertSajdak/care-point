import { Box, Card, CardContent, CardHeader } from "@mui/material"
import { useTranslation } from "react-i18next"
import ChangePasswordForm from "../ChangePasswordForm/ChangePasswordForm"

const PasswordCard = () => {
  const { t } = useTranslation()
  return (
    <Card>
      <CardHeader
        subheader={t("common:changePassword")}
        title={t("common:password")}
      />
      <CardContent sx={{ pt: 0 }}>
        <Box sx={{ m: -1.5, p: 1, pb: 0 }}>
          <ChangePasswordForm />
        </Box>
      </CardContent>
    </Card>
  )
}

export default PasswordCard
