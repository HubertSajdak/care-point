export type ReqStatus = "idle" | "error" | "loading"
export type IUserRoles = "doctor" | "patient"
export type IAppointmentStatus =
  | "active"
  | "canceled"
  | "postponed"
  | "completed"
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
export interface ISpecialization {
  _id: string
  specializationKey: string
}
export interface IDoctorSpecialization {
  Specialization: ISpecialization
  _id: string
  doctorId: string
  specializationId: string
}
export type IWeekDays =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday"
export interface IWorkingHours {
  _id: string
  startTime: string
  stopTime: string
  weekDay: IWeekDays
}

export interface IClinicInfo {
  _id: string
  address: IAddress
  clinicName: string
  phoneNumber: number
  photo?: string
  workingTime: IWorkingHours[]
}
export interface IClinicAffiliation {
  _id: string
  absenceTime: {
    from: string
    to: string
  }
  available: boolean
  clinicId: string
  clinicInfo: IClinicInfo
  clinicName: string
  consultationFee: number
  doctorId: string
  reasonOfAbsence: string
  timePerPatient: number
  workingHours: IWorkingHours[]
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
  ClinicAffiliation: IClinicAffiliation[]
  DoctorSpecialization: IDoctorSpecialization[]
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
export type ReqChangePassword = Record<password, confirmPassword, "string">

export interface ParamsValues {
  currentPage: number
  pageSize: number
  search?: string | undefined
  sortBy: string
  sortDirection: ISortDirection
}

export interface IAppointment {
  _id: string
  appointmentAddress: IAddress
  appointmentDate: string
  appointmentStatus: IAppointmentStatus
  clinicAffiliationId: string
  clinicId: stirng
  clinicInfo: Pick<IClinicInfo, "clinicName" | "_id", "photo" | "phoneNumber">
  consultationFee: number
  doctorId: string
  doctorInfo: Pick<IDoctorUser, "name" | "surname" | "photo" | "_id">
  patientId: string
}
