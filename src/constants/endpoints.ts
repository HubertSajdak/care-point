export const BASE_URL = import.meta.env.VITE_API_KEY

export enum Endpoints {
  CREATE_APPOINTMENT = "/appointments",
  DELETE_PHOTO = "/auth/me/deletePhoto",
  GET_ALL_CLINICS = "/clinics",
  GET_ALL_DOCTORS = "/doctors",
  GET_ALL_PATIENTS = "/patients",
  GET_CLINIC_AFFILIATIONS = "/clinicAffiliations",
  GET_CURRENT_USER_SPECIALIZATIONS = "/doctorSpecializations/me",
  GET_SPECIALIZATIONS = "/specializations",
  GET_USER_CLINIC_AFFILIATIONS = "/clinicAffiliations/userClinicAffiliations",
  GET_USER_SPECIALIZATIONS = "/doctorSpecializations",
  LOGIN = "/auth/login",
  MY_APPOINTMENTS = "/appointments/myAppointments",
  REFRESH_ACCESS_TOKEN = "/auth/refreshToken",
  REGISTER_DOCTOR = "/doctors/register",
  REGISTER_PATIENT = "/patients/register",
  UPDATE_USER_PASSWORD = "/auth/me/updatePassword",
  UPLOAD_CLINIC_PHOTO = "/clinics/uploadPhoto",
  UPLOAD_PHOTO = "/auth/me/uploadPhoto",
  USER_DATA = "/auth/me",
}
