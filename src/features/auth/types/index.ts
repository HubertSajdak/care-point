import { ReqeustRegisterPatientCredentials } from "@/types/api-types"

export interface RegisterPatientValues
  extends ReqeustRegisterPatientCredentials {
  confirmPassword: string
  role: "patient"
  termsAndConditions: boolean
}
