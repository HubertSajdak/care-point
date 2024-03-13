import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import {
  IClinicAffiliation,
  IClinicInfo,
  ISortDirection,
  ReqStatus,
} from "@/types/api-types"

import {
  getAllClinics,
  getSingleClinic,
  getUserClinicsAffiliations,
  getSingleClinicAffiliation,
} from "./clinicsThunks"

interface InitialClinicsValues {
  clinics: IClinicInfo[] | null
  currentPage: number
  pageSize: number
  search: string
  singleClinic: IClinicInfo | null
  singleClinicAffiliation: IClinicAffiliation | null
  sortBy: string
  sortDirection: ISortDirection
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
  currentPage: 1,
  pageSize: 5,
  search: "",
  sortBy: "clinicName",
  sortDirection: "asc",
  totalItems: 0,
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
    changeSort: (
      state,
      {
        payload,
      }: PayloadAction<{
        sortingDirection: ISortDirection
        sortingProperty: string
      }>,
    ) => {
      state.sortBy = payload.sortingProperty
      state.sortDirection = payload.sortingDirection
    },
    changePage: (state, { payload }: PayloadAction<number>) => {
      state.currentPage = payload
    },
    changeRowsPerPage: (state, { payload }: PayloadAction<number>) => {
      state.pageSize = payload
      state.currentPage = 1
    },
    changeSearch: (state, { payload }: PayloadAction<string>) => {
      state.search = payload
      state.currentPage = 1
    },
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
export const { changePage, changeRowsPerPage, changeSearch, changeSort } =
  clinicsSlice.actions
export default clinicsSlice.reducer
