import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import {
  IClinicAffiliation,
  IClinicInfo,
  IQueryParams,
  ReqStatus,
} from "@/types/api-types"

import {
  getAllClinics,
  getSingleClinic,
  getSingleClinicAffiliation,
  getUserClinicsAffiliations,
} from "./clinicsThunks"

interface InitialClinicsValues {
  clinics: IClinicInfo[] | null
  queryParams: IQueryParams
  singleClinic: IClinicInfo | null
  singleClinicAffiliation: IClinicAffiliation | null
  status: ReqStatus
  totalItems: number
  userClinicAffiliations: {
    data: IClinicAffiliation[] | null
    totalItems: number
  }
}

const initialState: InitialClinicsValues = {
  status: "idle",
  clinics: null,
  totalItems: 0,
  queryParams: {
    currentPage: 1,
    pageSize: 5,
    search: "",
    sortBy: "clinicName",
    sortDirection: "asc",
  },
  singleClinic: null,
  singleClinicAffiliation: null,
  userClinicAffiliations: {
    data: null,
    totalItems: 0,
  },
}

const clinicsSlice = createSlice({
  name: "clinics",
  initialState,
  reducers: {
    setQueryParams: (
      state,
      { payload }: PayloadAction<Partial<IQueryParams>>,
    ) => ({
      ...state,
      queryParams: {
        ...state.queryParams,
        ...payload,
        ...(!payload.currentPage && { currentPage: 1 }),
      },
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllClinics.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getAllClinics.fulfilled, (state, { payload }) => {
        if (payload) {
          state.clinics = payload.data
          state.totalItems = payload.totalItems
        }
        state.status = "idle"
      })
      .addCase(getAllClinics.rejected, (state) => {
        state.status = "error"
      })
      .addCase(getSingleClinic.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getSingleClinic.fulfilled, (state, { payload }) => {
        if (payload) {
          state.singleClinic = payload
        }
        state.status = "idle"
      })
      .addCase(getSingleClinic.rejected, (state) => {
        state.status = "error"
      })
      .addCase(getUserClinicsAffiliations.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getUserClinicsAffiliations.fulfilled, (state, { payload }) => {
        if (payload) {
          state.userClinicAffiliations.data = payload.data
          state.userClinicAffiliations.totalItems = payload.totalItems
        }
        state.status = "idle"
      })
      .addCase(getUserClinicsAffiliations.rejected, (state) => {
        state.status = "error"
      })
      .addCase(getSingleClinicAffiliation.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getSingleClinicAffiliation.fulfilled, (state, { payload }) => {
        if (payload) {
          state.singleClinicAffiliation = payload
        }
        state.status = "idle"
      })
      .addCase(getSingleClinicAffiliation.rejected, (state) => {
        state.status = "error"
      })
  },
})
export const { setQueryParams } = clinicsSlice.actions
export default clinicsSlice.reducer
