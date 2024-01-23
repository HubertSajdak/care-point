import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { RouteNames } from "@/constants/routes"
import FullWidthTabs from "@/shared/Tabs/Tabs"
import { Box, styled } from "@mui/material"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import RegisterDoctorForm from "../components/RegisterDoctorForm"
import RegisterFormWrapper from "../components/RegisterFormWrapper"
import RegisterPatientForm from "../components/RegisterPatientForm"
import { setRegistrationState } from "../authSlice"
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
  }, [isRegistrationSuccess])
  return (
    <Box mb={4} boxShadow={2}>
      <FullWidthTabs
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
    </Box>
  )
}

export default Register

export const StyledBox = styled(Box)(({ theme }) => ({
  boxShadow: theme.shadows[3],
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(5),
  borderRadius: theme.shape.borderRadius,
}))
