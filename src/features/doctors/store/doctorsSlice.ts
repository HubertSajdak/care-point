import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { IDoctorUser, IQueryParams, ReqStatus } from "@/types/api-types"

import { getAllDoctors, getSingleDoctor } from "./doctorsThunks"

interface InitialDoctorsDataValues {
  appointmentsQueryParams: IQueryParams
  data: IDoctorUser[] | null
  selectedDoctorData: IDoctorUser | null
  status: ReqStatus
  tableQueryParams: IQueryParams
  totalItems: number
}

const initialState: InitialDoctorsDataValues = {
  status: "idle",
  data: null,
  selectedDoctorData: null,
  totalItems: 0,
  tableQueryParams: {
    currentPage: 1,
    pageSize: 5,
    search: "",
    sortBy: "name",
    sortDirection: "asc",
  },
  appointmentsQueryParams: {
    currentPage: 1,
    pageSize: 6,
    search: "",
    sortBy: "name",
    sortDirection: "asc",
  },
}

const doctorsSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    setTableQueryParams: (
      state,
      { payload }: PayloadAction<Partial<IQueryParams>>,
    ) => ({
      ...state,
      tableQueryParams: {
        ...state.tableQueryParams,
        ...payload,
        ...(!payload.currentPage && { currentPage: 1 }),
      },
    }),
    setAppointmentsQueryParams: (
      state,
      { payload }: PayloadAction<Partial<IQueryParams>>,
    ) => ({
      ...state,
      appointmentsQueryParams: {
        ...state.appointmentsQueryParams,
        ...payload,
        ...(!payload.currentPage && { currentPage: 1 }),
      },
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllDoctors.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getAllDoctors.fulfilled, (state, { payload }) => {
        if (payload) {
          state.data = payload.data
          state.totalItems = payload.totalItems
        }
        state.status = "idle"
      })
      .addCase(getAllDoctors.rejected, (state) => {
        state.status = "error"
      })
      .addCase(getSingleDoctor.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getSingleDoctor.fulfilled, (state, action) => {
        if (action.payload) {
          state.selectedDoctorData = action.payload
        }
        state.status = "idle"
      })
      .addCase(getSingleDoctor.rejected, (state) => {
        state.status = "error"
      })
  },
})
export const { setAppointmentsQueryParams, setTableQueryParams } =
  doctorsSlice.actions
export default doctorsSlice.reducer
