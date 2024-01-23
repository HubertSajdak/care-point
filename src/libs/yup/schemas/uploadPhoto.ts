import yup from "../config"

const uploadPhotoSchema = yup.object().shape({
  file: yup
    .mixed<File>()
    .imageFormat()
    .maxFileSize(2)
    .required("form:common.required"),
})
export type UploadPhotoValues = yup.InferType<typeof uploadPhotoSchema>

export default uploadPhotoSchema
