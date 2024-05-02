import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { getCurrentUserAppointments, getDoctorAppointments } from "@/redux"
import {
  IAppointment,
  IAppointmentStatus,
  IQueryParams,
  ReqStatus,
} from "@/types/api-types"

type IAppointmentFilters = "all" | IAppointmentStatus

interface IAppointmentQueryParams extends IQueryParams {
  appointmentFilter: IAppointmentFilters | null
}

interface InitialStateValues {
  doctorAppointments: {
    data: IAppointment[]
    totalItems: number
  } | null
  queryParams: IAppointmentQueryParams
  status: ReqStatus
  totalItems: number
  userAppointmentsData: IAppointment[] | null
}

const initialState: InitialStateValues = {
  status: "idle",

  userAppointmentsData: null,
  totalItems: 0,
  doctorAppointments: null,
  queryParams: {
    pageSize: 5,
    search: "",
    sortBy: "appointmentDate",
    sortDirection: "asc",
    currentPage: 1,
    appointmentFilter: "all",
  },
}
const appointmentsSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    setQueryParams: (
      state,
      { payload }: PayloadAction<Partial<IAppointmentQueryParams>>,
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
    builder.addCase(getCurrentUserAppointments.pending, (state) => {
      state.status = "loading"
    })
    builder.addCase(
      getCurrentUserAppointments.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.userAppointmentsData = payload.data
          state.totalItems = payload.totalItems
        }
        state.status = "idle"
      },
    )
    builder
      .addCase(getCurrentUserAppointments.rejected, (state) => {
        state.status = "error"
      })
      .addCase(getDoctorAppointments.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getDoctorAppointments.fulfilled, (state, { payload }) => {
        if (payload) {
          state.doctorAppointments = payload
        }
        state.status = "idle"
      })
      .addCase(getDoctorAppointments.rejected, (state) => {
        state.status = "error"
      })
  },
})
export const { setQueryParams } = appointmentsSlice.actions
export default appointmentsSlice.reducer
