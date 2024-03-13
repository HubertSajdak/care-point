import { createSlice } from "@reduxjs/toolkit"

import {
  getAllSpecializations,
  getDoctorSpecializations,
} from "@/features/specializations"
import {
  ISpecializations,
  IUserSpecializations,
  ReqStatus,
} from "@/types/api-types"

interface InitialStateValues {
  allSpecializations: {
    data: ISpecializations[]
    totalItems: number
  } | null
  currentUserSpecializations: {
    data: IUserSpecializations[]
    totalItems: number
  } | null
  status: ReqStatus
}

const initialState: InitialStateValues = {
  status: "idle",
  allSpecializations: null,
  currentUserSpecializations: null,
}

const specializationsSlice = createSlice({
  name: "specializations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSpecializations.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getAllSpecializations.fulfilled, (state, { payload }) => {
        if (payload) {
          state.allSpecializations = payload
        }
        state.status = "idle"
      })
      .addCase(getAllSpecializations.rejected, (state) => {
        state.status = "error"
      })
      .addCase(getDoctorSpecializations.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getDoctorSpecializations.fulfilled, (state, { payload }) => {
        if (payload) {
          state.currentUserSpecializations = payload
        }
        state.status = "idle"
      })
      .addCase(getDoctorSpecializations.rejected, (state) => {
        state.status = "error"
      })
  },
})
export default specializationsSlice.reducer
