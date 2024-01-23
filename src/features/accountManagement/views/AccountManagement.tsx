import { Box, Grid, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"

import AccountCard from "../components/AccountCard/AccountCard"
import InformationCard from "../components/InformationCard/InformationCard"
import PasswordCard from "../components/PasswordCard/PasswordCard"

const AccountManagement = () => {
  const { t } = useTranslation(["common"])
  return (
    <Box>
      <Typography component="h2" fontWeight="bold" mb={2} variant="h4">
        {t("common:account")}
      </Typography>
      <Grid alignItems="stretch" columnGap={3} rowSpacing={3} container>
        <Grid md={3} xs={12} item>
          <AccountCard />
        </Grid>
        <Grid xs={12} item md>
          <InformationCard />
        </Grid>
        <Grid xs={12} item>
          <PasswordCard />
        </Grid>
      </Grid>
    </Box>
  )
}

export default AccountManagement
