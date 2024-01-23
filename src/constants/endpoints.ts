export const BASE_URL = import.meta.env.VITE_API_KEY
export enum Endpoints {
  REGISTER_DOCTOR = "/doctors/register",
  REGISTER_PATIENT = "/patients/register",
  LOGIN = "/auth/login",
  REFRESH_ACCESS_TOKEN = "/auth/refreshToken",
  USER_DATA = "/auth/me",
  UPDATE_USER_PASSWORD = "/auth/me/updatePassword",
  UPLOAD_PHOTO = "/auth/me/uploadPhoto",
  DELETE_PHOTO = "/auth/me/deletePhoto",
}
