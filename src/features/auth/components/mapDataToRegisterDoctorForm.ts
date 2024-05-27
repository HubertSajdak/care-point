import { ReqeustRegisterDoctorCredentials } from "@/types/api-types"

interface RegisterDoctorValues extends ReqeustRegisterDoctorCredentials {
  confirmPassword: string
  termsAndConditions: boolean
}

export const mapDataToRegisterDoctorForm: RegisterDoctorValues = {
  name: "",
  surname: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "doctor",
  termsAndConditions: false,
}
