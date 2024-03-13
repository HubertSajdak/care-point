export {
  changePage,
  changeRowsPerPage,
  changeSearch,
  changeSort,
  default as clinicsSlice,
} from "./store/clinicsSlice"
export * from "./store/clinicsThunks"
export { default as AddClinic } from "./views/AddClinic"
export { default as AddClinicAffiliation } from "./views/AddClinicAffiliation"
export { default as AllClinics } from "./views/AllClinics"
export { default as EditClinic } from "./views/EditClinic"
export { default as EditClinicAffiliation } from "./views/EditClinicAffiliation"
export { default as MyClinics } from "./views/MyClinics"
