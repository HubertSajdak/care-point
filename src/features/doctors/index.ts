export * from "./api/getDoctors"
export * from "./api/getSingleDoctor"
export {
  changePage,
  changeRowsPerPage,
  changeSearch,
  changeSort,
  default as doctorsSlice,
} from "./store/doctorsSlice"
export * from "./store/doctorsThunks"
export { default as AllDoctors } from "./views/AllDoctors"
export { default as DoctorSelection } from "./views/DoctorSelection"
export { default as MakeAppointment } from "./views/MakeAppointment"
