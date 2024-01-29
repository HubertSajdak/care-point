export type ReqStatus = "idle" | "error" | "loading"
export type IUserRoles = "doctor" | "patient"
export type ISortDirection = "asc" | "desc"
export interface SuccessReqMsg {
  message: string
}
export interface SuccessReqData<T> {
  data: T
  numOfPages: number
  totalItems: number
}
export enum LogoutMsg {
  ACC_REMOVED = "common:logoutMsg.accRemoved",
  LOGOUT = "common:logoutMsg.logout",
  SERVER_ERROR = "common:logoutMsg.serverError",
  SESSION_EXPIRED = "common:logoutMsg.sessionExpired",
}
export interface LogoutPayload {
  msg: LogoutMsg
  type: "success" | "error"
}
export interface FailedReqMsg {
  error?: any
  message: string
}
export interface IAddress {
  city: string
  postalCode: string
  street: string
}
export interface IPatientUser {
  _id: string
  address: IAddress
  email: string
  name: string
  phoneNumber: number | string
  photo?: string
  role: IUserRoles
  surname: string
}

export interface IDoctorUser {
  _id: string
  email: string
  name: string
  photo?: string
  professionalStatement: string | null
  role: IUserRoles
  surname: string
}

export interface ReqeustRegisterPatientCredentials {
  address: IAddress
  email: string
  name: string
  password: string
  phoneNumber: number | string
  role: IUserRoles
  surname: string
}
export interface ReqeustRegisterDoctorCredentials {
  email: string
  name: string
  password: string
  role: IUserRoles
  surname: string
}

export interface ReqLoginCredentials {
  email: string
  password: string
}
export interface ResLogin {
  accessToken: string
  message: string
  refreshToken: string
}
