export * from "./api/changePassword"
export * from "./api/deletePhoto"
export * from "./api/getUser"
export * from "./api/login"
export * from "./api/register"
export * from "./api/uploadPhoto"
export {
  default as authSlice,
  logoutUser,
  setIsAuthenticated,
  setRegistrationState,
} from "./store/authSlice"
export * from "./store/authThunks"
export { default as Login } from "./views/Login"
export { default as Register } from "./views/Register"
