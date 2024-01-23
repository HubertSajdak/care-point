import CancelIcon from "@mui/icons-material/Cancel"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import DeleteIcon from "@mui/icons-material/Delete"
import { Box } from "@mui/material"
import { FormikProvider, useFormik } from "formik"
import { useTranslation } from "react-i18next"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { deleteUserPhoto, uploadUserPhoto } from "@/features/auth/authThunks"
import uploadPhotoSchema from "@/libs/yup/schemas/uploadPhoto"
import Button from "@/shared/Button/Button"
import FileInputFormik from "@/shared/FileInputFormik/FileInputFormik"
interface ChangeAvatarFormValues {
  file: File | null
}
const ChangeAvatarForm = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation(["buttons"])
  const user = useAppSelector((state) => state.auth.user)
  const changeAvatarFormik = useFormik<ChangeAvatarFormValues>({
    initialValues: {
      file: null,
    },
    onSubmit: async (values, { resetForm }) => {
      const { file } = values
      if (file) {
        await dispatch(uploadUserPhoto({ file }))
        resetForm()
      }
    },
    validationSchema: uploadPhotoSchema,
    enableReinitialize: true,
  })
  const { errors, resetForm } = changeAvatarFormik

  const handleDeletePhoto = async () => {
    await dispatch(deleteUserPhoto())
  }

  return (
    <FormikProvider value={changeAvatarFormik}>
      <form onSubmit={changeAvatarFormik.handleSubmit}>
        <Box display="grid">
          <FileInputFormik
            accept="image/*"
            disabled={changeAvatarFormik.isSubmitting}
            errorText={changeAvatarFormik.errors.file}
            imgPreview={changeAvatarFormik.values.file}
            name="file"
            photo={user?.photo ? user.photo : ""}
          />
          {changeAvatarFormik.values.file ? (
            <Box display="flex" flexDirection="column" gap={2} my={2}>
              <Button
                disabled={
                  Boolean(errors.file) || changeAvatarFormik.isSubmitting
                }
                startIcon={<CloudUploadIcon />}
                type="submit"
                variant="contained"
              >
                {t("buttons:uploadPhoto")}
              </Button>
              <Button
                color="warning"
                disabled={changeAvatarFormik.isSubmitting}
                startIcon={<CancelIcon />}
                variant="outlined"
                onClick={resetForm}
              >
                {t("buttons:cancel")}
              </Button>
            </Box>
          ) : null}
          {user?.photo && !changeAvatarFormik.values.file ? (
            <Box display="flex" flexDirection="column" gap={2} my={2}>
              <Button
                color="warning"
                startIcon={<DeleteIcon />}
                variant="outlined"
                onClick={handleDeletePhoto}
              >
                {t("buttons:deletePhoto")}
              </Button>
            </Box>
          ) : null}
        </Box>
      </form>
    </FormikProvider>
  )
}

export default ChangeAvatarForm
