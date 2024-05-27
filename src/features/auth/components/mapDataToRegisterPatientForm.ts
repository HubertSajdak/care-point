import { ReqeustRegisterPatientCredentials } from "@/types/api-types"

interface RegisterPatientValues extends ReqeustRegisterPatientCredentials {
  confirmPassword: string
  role: "patient"
  termsAndConditions: boolean
}

export const mapDataToRegisterPatientForm: RegisterPatientValues = {
  name: "",
  surname: "",
  phoneNumber: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "patient",
  address: {
    street: "",
    city: "",
    postalCode: "",
  },
  birthDate: "",
  height: 0,
  weight: 0,
  termsAndConditions: false,
}
