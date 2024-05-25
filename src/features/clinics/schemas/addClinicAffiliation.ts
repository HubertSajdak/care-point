import { yup } from "@/libs"

const addClinicAffiliationSchema = yup.object().shape({
  doctorId: yup.string().required(),
  clinicName: yup.string().required(),
  clinicId: yup.string().required(),
  workingTime: yup
    .array()
    .of(
      yup.object({
        weekDay: yup.string().required(),
        startTime: yup.string().required(),
        stopTime: yup
          .string()
          .when("startTime", (startTime, schema) => {
            if (startTime) {
              return schema
            }
            return schema
          })
          .required(),
      }),
    )
    .required(),
  available: yup.boolean().required(),
  reasonOfAbsence: yup.string().required(),
  absenceTime: yup.object({
    from: yup.string().required(),
    to: yup
      .string()
      .when("from", (from, schema) => {
        if (from) {
          return schema
        }
        return schema
      })
      .required(),
  }),
  consultationFee: yup.number().required(),
  timePerPatient: yup.number().required(),
})

export type AddClinicAffiliationValues = yup.InferType<
  typeof addClinicAffiliationSchema
>
export { addClinicAffiliationSchema }
