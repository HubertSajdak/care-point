import { Box, Paper, styled } from "@mui/material"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { RouteNames } from "@/constants"
import { Tabs } from "@/shared"
import { setRegistrationState } from "@/shared/store"

import RegisterDoctorForm from "../components/RegisterDoctorForm"
import RegisterFormWrapper from "../components/RegisterFormWrapper"
import RegisterPatientForm from "../components/RegisterPatientForm"

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isRegistrationSuccess = useAppSelector(
    (state) => state.auth.isRegistrationSuccessfull,
  )
  const { t } = useTranslation()
  useEffect(() => {
    if (isRegistrationSuccess) {
      dispatch(setRegistrationState(false))
      navigate(RouteNames.LOGIN)
    }
  }, [dispatch, isRegistrationSuccess, navigate])
  return (
    <Paper sx={{ boxShadow: 2, mb: 4, overflow: "hidden" }}>
      <Tabs
        content={[
          {
            id: 0,
            label: t("authPages:asPatient"),
            render: (
              <RegisterFormWrapper>
                <RegisterPatientForm />
              </RegisterFormWrapper>
            ),
          },
          {
            id: 1,
            label: t("authPages:asDoctor"),
            render: (
              <RegisterFormWrapper>
                <RegisterDoctorForm />
              </RegisterFormWrapper>
            ),
          },
        ]}
      />
    </Paper>
  )
}

export default Register

export const StyledBox = styled(Box)(({ theme }) => ({
  boxShadow: theme.shadows[3],
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(5),
  borderRadius: theme.shape.borderRadius,
}))
