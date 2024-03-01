import { createSlice } from "@reduxjs/toolkit"

import { IClinicInfo, ReqStatus } from "@/types/api-types"

import { getAllClinics } from "./clinicThunks"

interface InitialClinicsValues {
  clinics: IClinicInfo[] | null
  status: ReqStatus
}
const initialState: InitialClinicsValues = {
  status: "idle",
  clinics: null,
}

const clinicsSlice = createSlice({
  name: "clinics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllClinics.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getAllClinics.fulfilled, (state, { payload }) => {
        if (payload) {
          state.clinics = payload.data
        }
        state.status = "idle"
      })
      .addCase(getAllClinics.rejected, (state) => {
        state.status = "error"
      })
  },
})

export default clinicsSlice.reducer
