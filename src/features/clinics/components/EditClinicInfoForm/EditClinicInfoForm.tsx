import { Box, Grid } from "@mui/material"
import { useFormikContext } from "formik"
import { useTranslation } from "react-i18next"
import { useTheme } from "styled-components"

import { Button, TextFieldFormik } from "@/shared"

const EditClinicInfoForm = () => {
  const { t } = useTranslation()
  const { isSubmitting } = useFormikContext()
  const theme = useTheme()
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      justifyContent="space-between"
    >
      <Box>
        <Grid
          alignItems="center"
          columnSpacing={3}
          height={`calc(100% - ${theme.spacing(3.75)})`}
          justifyContent="center"
          padding={1}
          rowSpacing={3}
          container
        >
          <Grid md={12} xs={12} item>
            <TextFieldFormik
              id="clinicName"
              label="clinic name"
              name="clinicName"
            />
          </Grid>
          <Grid md={4} xs={12} item>
            <TextFieldFormik id="street" label="street" name="address.street" />
          </Grid>
          <Grid md={4} xs={12} item>
            <TextFieldFormik id="city" label="city" name="address.city" />
          </Grid>
          <Grid md={4} xs={12} item>
            <TextFieldFormik
              id="postalCode"
              label="postal code"
              name="address.postalCode"
            />
          </Grid>
          <Grid md={12} xs={12} item>
            <TextFieldFormik
              id="phoneNumber"
              label="phone number"
              name="phoneNumber"
            />
          </Grid>
        </Grid>
      </Box>

      <Box
        alignItems="flex-end"
        display="flex"
        justifyContent="flex-end"
        ml={-1.4}
        mt={2}
        width="100%"
      >
        <Button isSubmitting={isSubmitting} type="submit" variant="contained">
          {t("buttons:saveDetails")}
        </Button>
      </Box>
    </Box>
  )
}

export default EditClinicInfoForm
