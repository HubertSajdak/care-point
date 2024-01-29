export const BASE_URL = import.meta.env.VITE_API_KEY
export enum Endpoints {
  DELETE_PHOTO = "/auth/me/deletePhoto",
  GET_ALL_DOCTORS = "/doctors",
  GET_ALL_PATIENTS = "/patients",
  LOGIN = "/auth/login",
  REFRESH_ACCESS_TOKEN = "/auth/refreshToken",
  REGISTER_DOCTOR = "/doctors/register",
  REGISTER_PATIENT = "/patients/register",
  UPDATE_USER_PASSWORD = "/auth/me/updatePassword",
  UPLOAD_PHOTO = "/auth/me/uploadPhoto",
  USER_DATA = "/auth/me",
}
