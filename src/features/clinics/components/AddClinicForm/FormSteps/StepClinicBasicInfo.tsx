import { Box, Container, Grid, Typography } from "@mui/material"
import { FormikContextType, FormikProvider } from "formik"
import React from "react"
import { useTranslation } from "react-i18next"

import { handlePostalCodeKeyUp, TextFieldFormik } from "@/shared"

import { AddClinicFormValues } from "../../../schemas/addClinic"

interface StepClinicBasicInfoProps {
  formikProviderValue: FormikContextType<AddClinicFormValues>
}

function StepClinicBasicInfo({
  formikProviderValue,
}: StepClinicBasicInfoProps) {
  const { t } = useTranslation()
  return (
    <FormikProvider value={formikProviderValue}>
      <form>
        <Container
          sx={{ display: "flex", justifyContent: "center", p: 0, py: 6 }}
        >
          <Grid
            columnSpacing={2}
            justifyContent="center"
            maxWidth={800}
            rowSpacing={2}
            container
          >
            <Grid xs={12} item>
              <Typography component="h4" mb={2} variant="h5">
                {t("form:clinic.clinicName")}
              </Typography>
              <TextFieldFormik
                label={t("form:clinic.clinicName")}
                name={"clinicName"}
              />
            </Grid>
            <Grid xs={12} item>
              <Typography component="h4" mb={2} variant="h5">
                {t("form:common.address")}
              </Typography>
              <Box
                display="flex"
                gap={2}
                sx={{ flexDirection: { xs: "column", sm: "row" } }}
              >
                <TextFieldFormik
                  label={t("form:common.street")}
                  name={"address.street"}
                />
                <TextFieldFormik
                  label={t("form:common.city")}
                  name={"address.city"}
                />
                <TextFieldFormik
                  inputProps={{
                    maxLength: 6,
                  }}
                  label={t("form:common.postalCode")}
                  name={"address.postalCode"}
                  onKeyUp={handlePostalCodeKeyUp}
                />
              </Box>
            </Grid>
            <Grid xs={12} item>
              <Typography component="h4" mb={2} variant="h5">
                {t("form:common.phoneNumber")}
              </Typography>
              <TextFieldFormik
                label={t("form:common.phoneNumber")}
                name={"phoneNumber"}
              />
            </Grid>
          </Grid>
        </Container>
      </form>
    </FormikProvider>
  )
}

export default StepClinicBasicInfo
