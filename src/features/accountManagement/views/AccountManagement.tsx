import { Box, Grid, Paper, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import { useAppDispatch } from "@/app/hooks"
import { RouteNames } from "@/constants"
import { Modal } from "@/shared"
import { deleteAccount } from "@/shared/store"

import AccountCard from "../components/AccountCard/AccountCard"
import InformationCard from "../components/InformationCard/InformationCard"
import PasswordCard from "../components/PasswordCard/PasswordCard"

const AccountManagement = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { t } = useTranslation(["common"])
  const handleRemoveAccount = () => {
    dispatch(deleteAccount())
    navigate(RouteNames.LOGIN)
  }
  return (
    <Box>
      <Typography component="h2" fontWeight="bold" mb={2} variant="h4">
        {t("common:account")}
      </Typography>
      <Grid alignItems="stretch" columnGap={3} rowSpacing={3} container>
        <Grid lg={4} xs={12} item>
          <AccountCard />
        </Grid>
        <Grid xs={12} item lg>
          <InformationCard />
        </Grid>
        <Grid xs={12} item>
          <PasswordCard />
        </Grid>
        <Grid xs={12} item>
          <Paper
            sx={{
              padding: 2,
              borderRadius: (theme) => theme.spacing(2.5),
              display: "flex",
              justifyContent: "flex-end",
              boxShadow: (theme) => theme.mainShadow.main,
            }}
          >
            <Modal
              acceptBtnColor="error"
              openModalBtnColor="warning"
              openModalBtnText={"delete account"}
              rejectBtnColor="primary"
              rejectBtnVariant="contained"
              text={t("authPages:deleteAccountText")}
              title={t("authPages:deleteAccountTitle")}
              onAsyncClick={handleRemoveAccount}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AccountManagement
