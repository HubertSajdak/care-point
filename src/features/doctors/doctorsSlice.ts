import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { IDoctorUser, ISortDirection, ReqStatus } from "@/types/api-types"

import { getAllDoctors } from "./doctorsThunks"

interface InitialDoctorsDataValues {
  currentPage: number
  data: IDoctorUser[] | null
  pageSize: number
  search: string
  sortBy: string
  sortDirection: ISortDirection
  status: ReqStatus
  totalItems: number
}
const initialState: InitialDoctorsDataValues = {
  search: "",
  sortBy: "name",
  sortDirection: "asc",
  pageSize: 5,
  currentPage: 1,
  status: "idle",
  data: null,
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
    //   builder.addCase(getSingleDoctor.pending, (state) => {
    //     state.singleDoctorData.isLoading = true
    //     state.singleDoctorData.isError = false
    //   })
    //   builder.addCase(getSingleDoctor.fulfilled, (state, { payload }) => {
    //     state.singleDoctorData.isLoading = false
    //     state.singleDoctorData.data = payload
    //   })
    //   builder.addCase(getSingleDoctor.rejected, (state) => {
    //     state.singleDoctorData.isLoading = false
    //     state.singleDoctorData.isError = true
    //   })
    // },
  },
})
export const { changePage, changeRowsPerPage, changeSearch, changeSort } =
  doctorsSlice.actions
export default doctorsSlice.reducer
