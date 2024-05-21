import yup from "../config"

// why you have all schemas here if you have features?

const addClinicSchema = yup.object().shape({
  clinicName: yup.string().required(),
  address: yup.object({
    street: yup.string().required(),
    city: yup.string().required(),
    postalCode: yup.string().postalCode().required(),
  }),
  phoneNumber: yup.string().phoneNumber().required(),
  photo: yup.mixed<File>().imageFormat().maxFileSize(2).notRequired(),
  workingTime: yup
    .array()
    .of(
      yup.object({
        weekDay: yup.string().required(),
        startTime: yup.string(),
        stopTime: yup.string().when("startTime", (startTime, schema) => {
          if (startTime) {
            return schema
          }
          return schema
        }),
      }),
    )
    .required(),
})

export type AddClinicFormValues = yup.InferType<typeof addClinicSchema>
export { addClinicSchema }
