import { yup } from "@/libs"

const editClinicSchema = yup.object().shape({
  clinicName: yup.string().required(),
  address: yup.object({
    street: yup.string().required(),
    city: yup.string().required(),
    postalCode: yup.string().postalCode().required(),
  }),
  phoneNumber: yup.string().phoneNumber().required(),
  workingTime: yup
    .array()
    .of(
      yup.object({
        weekDay: yup.string().required(),
        startTime: yup.string(),
        stopTime: yup.string().when("startTime", (startTime, schema) => {
          if (startTime) {
            return schema.required()
          }
          return schema
        }),
      }),
    )
    .required(),
})

export type EditClinicFormValues = yup.InferType<typeof editClinicSchema>
export { editClinicSchema }
