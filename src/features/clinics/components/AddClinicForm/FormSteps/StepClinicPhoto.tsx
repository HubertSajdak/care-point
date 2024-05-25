import CancelIcon from "@mui/icons-material/Cancel"
import { Box, Typography } from "@mui/material"
import { FormikContextType, FormikProvider } from "formik"
import React from "react"
import { useTranslation } from "react-i18next"

import { Button, FileInputFormik } from "@/shared"

import { AddClinicFormValues } from "../../../schemas/addClinic"

interface StepClinicPhotoProps {
  formikProviderValue: FormikContextType<AddClinicFormValues>
}

function StepClinicPhoto({ formikProviderValue }: StepClinicPhotoProps) {
  const { t } = useTranslation()
  return (
    <FormikProvider value={formikProviderValue}>
      <Box alignItems="center" display="flex" flexDirection="column" my={2}>
        <Typography component="h3" mb={4} variant="h5">
          {t("form:clinic.addClinicPhoto")}
        </Typography>
        <Box>
          <FileInputFormik
            accept="image/*"
            disabled={formikProviderValue.isSubmitting}
            errorText={formikProviderValue.errors.photo}
            imgPreview={formikProviderValue.values.photo}
            name="photo"
            variant="square"
          />
        </Box>
        <Box>
          {formikProviderValue.values.photo ? (
            <Box display="flex" flexDirection="column" gap={2} my={2}>
              <Button
                color="warning"
                disabled={formikProviderValue.isSubmitting}
                startIcon={<CancelIcon />}
                variant="outlined"
                onClick={async () => {
                  await formikProviderValue.setFieldValue("photo", null)
                }}
              >
                {t("buttons:cancel")}
              </Button>
            </Box>
          ) : null}
        </Box>
      </Box>
    </FormikProvider>
  )
}

export default StepClinicPhoto
