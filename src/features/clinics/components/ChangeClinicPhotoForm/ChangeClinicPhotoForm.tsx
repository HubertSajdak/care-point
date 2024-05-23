import CancelIcon from "@mui/icons-material/Cancel"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import DeleteIcon from "@mui/icons-material/Delete"
import { Box } from "@mui/material"
import { useFormikContext } from "formik"
import { useTranslation } from "react-i18next"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { deleteClinicPhoto } from "@/features/clinics"
import { Button, FileInputFormik } from "@/shared"

const ChangeClinicPhotoForm = () => {
  const dispatch = useAppDispatch()
  const clinic = useAppSelector((state) => state.clinics.singleClinic)
  const { errors, isSubmitting, resetForm, values } = useFormikContext<{
    clinicId: string
    file: File | null
  }>()
  const { t } = useTranslation()
  return (
    <Box display="grid" height="100%">
      <FileInputFormik
        accept="image/*"
        disabled={isSubmitting}
        errorText={errors.file}
        imgPreview={values.file}
        name="file"
        photo={clinic?.photo ? clinic?.photo : ""}
        variant="square"
      />
      {values.file ? (
        <Box display="flex" flexDirection="column" gap={2} my={2}>
          <Button
            disabled={Boolean(errors.file) || isSubmitting}
            startIcon={<CloudUploadIcon />}
            type="submit"
            variant="contained"
          >
            {t("buttons:uploadPhoto")}
          </Button>
          <Button
            color="warning"
            disabled={isSubmitting}
            startIcon={<CancelIcon />}
            variant="outlined"
            onClick={resetForm}
          >
            {t("buttons:cancel")}
          </Button>
        </Box>
      ) : null}
      {clinic?.photo && !values.file ? (
        <Box display="flex" flexDirection="column" gap={2} my={2}>
          <Button
            color="warning"
            startIcon={<DeleteIcon />}
            variant="outlined"
            onAsyncClick={async () => {
              await dispatch(deleteClinicPhoto(values.clinicId))
            }}
          >
            {t("buttons:deletePhoto")}
          </Button>
        </Box>
      ) : null}
    </Box>
  )
}

export default ChangeClinicPhotoForm
