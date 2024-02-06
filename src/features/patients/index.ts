export * from "./api/getPatients"
export {
  changePage,
  changeRowsPerPage,
  changeSearch,
  changeSort,
  default as patientsSlice,
} from "./store/patientsSlice"
export * from "./store/patientsThunks"
export { default as AllPatients } from "./views/AllPatients"
