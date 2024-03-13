import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { IDoctorUser, ISortDirection, ReqStatus } from "@/types/api-types"

import { getAllDoctors, getSingleDoctor } from "./doctorsThunks"

interface InitialDoctorsDataValues {
  currentPage: number
  data: IDoctorUser[] | null
  pageSize: number
  search: string
  selectedDoctorData: IDoctorUser | null
  sortBy: string
  sortDirection: ISortDirection
  status: ReqStatus
  totalItems: number
}

const initialState: InitialDoctorsDataValues = {
  search: "",
  sortBy: "name",
  sortDirection: "asc",
  pageSize: 6,
  currentPage: 1,
  status: "idle",
  data: null,
  selectedDoctorData: null,
  totalItems: 0,
}

const doctorsSlice = createSlice({
  name: "doctors",
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
export const { changePage, changeRowsPerPage, changeSearch, changeSort } =
  doctorsSlice.actions
export default doctorsSlice.reducer
