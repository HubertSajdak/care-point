import { Container, Grid, MenuItem, Select, Typography } from "@mui/material"
import { FormikContextType, FormikProvider } from "formik"
import React from "react"
import { useTranslation } from "react-i18next"

import { useAppSelector } from "@/app/hooks"
import { consultationTimeOptions } from "@/constants/consultationTimeOptions"
import { capitalizeFirstChar, TextFieldFormik } from "@/shared"

import { AddClinicAffiliationValues } from "../../../schemas/addClinicAffiliation"

interface StepAffiliationBasicInfoProps {
  formikProviderValue: FormikContextType<AddClinicAffiliationValues>
}

function StepAffiliationBasicInfo({
  formikProviderValue,
}: StepAffiliationBasicInfoProps) {
  const { t } = useTranslation()
  const singleClinic = useAppSelector((state) => state.clinics.singleClinic)

  return (
    <FormikProvider value={formikProviderValue}>
      <form>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 0,
            py: 6,
          }}
        >
          <Typography textAlign="center" variant="h4">
            {t("clinic:selectedClinic")}: {singleClinic?.clinicName}
          </Typography>
          <Grid maxWidth={800} mt={4} container>
            <Grid mb={3} xs={12} item>
              <Typography component="h4" mb={1} variant="h5">
                {t("form:appointment.consultationFee")}
              </Typography>
              <TextFieldFormik name={"consultationFee"} type="number" />
            </Grid>
            <Grid mb={3} xs={12} item>
              <Typography component="h4" mb={1} variant="h5">
                {t("form:appointment.consultationTime")}
              </Typography>
              <Select
                value={formikProviderValue.values.timePerPatient}
                fullWidth
                onChange={async (e) => {
                  await formikProviderValue.setFieldValue(
                    "timePerPatient",
                    e.target.value,
                  )
                }}
              >
                {consultationTimeOptions.map((el) => {
                  return (
                    <MenuItem key={el.id} value={el.value}>
                      {capitalizeFirstChar(t(el.label))}
                    </MenuItem>
                  )
                })}
              </Select>
            </Grid>
          </Grid>
        </Container>
      </form>
    </FormikProvider>
  )
}

export default StepAffiliationBasicInfo
