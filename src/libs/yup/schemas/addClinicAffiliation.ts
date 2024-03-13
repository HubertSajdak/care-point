import yup from "../config"

const addClinicAffiliationSchema = yup.object().shape({
  clinicName: yup.string().required(),
  clinicId: yup.string().required(),
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
  available: yup.boolean(),
  reasonOfAbsence: yup.string().notRequired(),
  absenceTime: yup.object({
    from: yup.string(),
    to: yup.string().when("from", (from, schema) => {
      if (from) {
        return schema
      }
      return schema
    }),
  }),
  consultationFee: yup.number().required(),
  timePerPatient: yup.number().required(),
})

export type AddClinicAffiliationValues = yup.InferType<
  typeof addClinicAffiliationSchema
>
export { addClinicAffiliationSchema }
