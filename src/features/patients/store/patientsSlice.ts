import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { getSinglePatient } from "@/features/patients"
import { IPatientUser, IQueryParams, ReqStatus } from "@/types/api-types"

import { getAllPatients } from "./patientsThunks"

interface InitialPatientsDataValues {
  data: IPatientUser[] | null
  queryParams: IQueryParams
  selectedPatientData: IPatientUser | null
  status: ReqStatus
  totalItems: number
}

const initialState: InitialPatientsDataValues = {
  status: "idle",
  data: null,
  selectedPatientData: null,
  totalItems: 0,
  queryParams: {
    search: "",
    sortBy: "name",
    sortDirection: "asc",
    pageSize: 5,
    currentPage: 1,
  },
}

const patientsSlice = createSlice({
  name: "patients",
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
      .addCase(getAllPatients.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getAllPatients.fulfilled, (state, { payload }) => {
        if (payload) {
          state.data = payload.data
          state.totalItems = payload.totalItems
        }
        state.status = "idle"
      })
      .addCase(getAllPatients.rejected, (state) => {
        state.status = "error"
      })
      .addCase(getSinglePatient.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getSinglePatient.fulfilled, (state, action) => {
        if (action.payload) {
          state.selectedPatientData = action.payload
        }
        state.status = "idle"
      })
      .addCase(getSinglePatient.rejected, (state) => {
        state.status = "error"
      })
  },
})
export const { setQueryParams } = patientsSlice.actions
export default patientsSlice.reducer
