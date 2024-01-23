export type ReqStatus = "idle" | "error" | "loading"
export type IUserRoles = "doctor" | "patient"
export interface SuccessReqMsg {
  message: string
}
export enum LogoutMsg {
  LOGOUT = "common:logoutMsg.logout",
  SESSION_EXPIRED = "common:logoutMsg.sessionExpired",
  ACC_REMOVED = "common:logoutMsg.accRemoved",
  SERVER_ERROR = "common:logoutMsg.serverError",
}
export interface LogoutPayload {
  msg: LogoutMsg
  type: "success" | "error"
}
export interface FailedReqMsg {
  message: string
  error?: any
}
export interface IAddress {
  street: string
  city: string
  postalCode: string
}
export interface IPatientUser {
  _id: string
  name: string
  surname: string
  email: string
  phoneNumber: number | string
  address: IAddress
  photo?: string
  role: IUserRoles
}

export interface IDoctorUser {
  _id: string
  name: string
  surname: string
  email: string
  photo?: string
  professionalStatement: string | null
  role: IUserRoles
}

export interface ReqeustRegisterPatientCredentials {
  name: string
  surname: string
  phoneNumber: number | string
  email: string
  password: string
  address: IAddress
  role: IUserRoles
}
export interface ReqeustRegisterDoctorCredentials {
  name: string
  surname: string
  email: string
  password: string
  role: IUserRoles
}

export interface ReqLoginCredentials {
  email: string
  password: string
}
export interface ResLogin {
  message: string
  accessToken: string
  refreshToken: string
}
