import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { getCurrentUserAppointments, getDoctorAppointments } from "@/redux"
import {
  IAppointment,
  IAppointmentStatus,
  ISortDirection,
  ReqStatus,
} from "@/types/api-types"

interface InitialStateValues {
  appointmentFilter: IAppointmentStatus | "all"
  currentPage: number
  doctorAppointments: {
    data: IAppointment[]
    totalItems: number
  } | null
  pageSize: number
  search: string
  sortBy: string
  sortDirection: ISortDirection
  status: ReqStatus
  totalItems: number
  userAppointmentsData: IAppointment[] | null
}

const initialState: InitialStateValues = {
  status: "idle",
  currentPage: 1,
  pageSize: 5,
  search: "",
  sortBy: "appointmentDate",
  sortDirection: "asc",
  userAppointmentsData: null,
  totalItems: 0,
  appointmentFilter: "all",
  doctorAppointments: null,
}
const appointmentsSlice = createSlice({
  name: "appointments",
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
    changeFilters: (
      state,
      { payload }: PayloadAction<"active" | "canceled" | "completed" | "all">,
    ) => {
      state.appointmentFilter = payload
      state.currentPage = 1
    },
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
export const {
  changeFilters,
  changePage,
  changeRowsPerPage,
  changeSearch,
  changeSort,
} = appointmentsSlice.actions
export default appointmentsSlice.reducer
