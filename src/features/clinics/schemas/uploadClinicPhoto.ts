import { yup } from "@/libs"

const uploadClinicPhotoSchema = yup.object().shape({
  clinicId: yup.string().required(),
  file: yup
    .mixed<File>()
    .imageFormat()
    .maxFileSize(2)
    .required("form:common.required"),
})
export type UploadClinicPhotoValues = yup.InferType<
  typeof uploadClinicPhotoSchema
>

export { uploadClinicPhotoSchema }
