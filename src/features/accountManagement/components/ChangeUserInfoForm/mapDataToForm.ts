import { IDoctorUser, IPatientUser } from "@/types/api-types"

export const mapDataToForm = (user: IPatientUser | IDoctorUser | null) => {
  return {
    name: user?.name || "",
    surname: user?.surname || "",
    phoneNumber: user && "phoneNumber" in user ? user?.phoneNumber : "",
    email: user?.email || "",
    role: user?.role || "",
    address:
      user && "address" in user
        ? {
            street: user?.address?.street || "",
            city: user?.address?.city || "",
            postalCode: user?.address?.postalCode || "",
          }
        : {
            street: "",
            city: "",
            postalCode: "",
          },
    birthDate: user && "birthDate" in user ? user?.birthDate : "",
    height: user && "height" in user ? user?.height : 0,
    weight: user && "weight" in user ? user?.weight : 0,
  }
}
