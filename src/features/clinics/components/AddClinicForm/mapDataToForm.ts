import { AddClinicFormValues } from "../../schemas/addClinic"

export const mapDataToForm: AddClinicFormValues = {
  clinicName: "",
  address: {
    street: "",
    city: "",
    postalCode: "",
  },
  phoneNumber: "",
  photo: undefined,
  workingTime: [
    {
      weekDay: "monday",
      startTime: "",
      stopTime: "",
    },
    {
      weekDay: "tuesday",
      startTime: "",
      stopTime: "",
    },
    {
      weekDay: "wednesday",
      startTime: "",
      stopTime: "",
    },
    {
      weekDay: "thursday",
      startTime: "",
      stopTime: "",
    },
    {
      weekDay: "friday",
      startTime: "",
      stopTime: "",
    },
    {
      weekDay: "saturday",
      startTime: "",
      stopTime: "",
    },
    {
      weekDay: "sunday",
      startTime: "",
      stopTime: "",
    },
  ],
}
