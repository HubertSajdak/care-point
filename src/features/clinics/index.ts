export {
  changePage,
  changeRowsPerPage,
  changeSearch,
  changeSort,
  default as clinicsSlice,
} from "./store/clinicsSlice"
export * from "./store/clinicsThunks"
export { default as AddClinic } from "./views/AddClinic"
export { default as AllClinics } from "./views/AllClinics"
export { default as EditClinic } from "./views/EditClinic"
