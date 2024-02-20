import { createSlice } from "@reduxjs/toolkit"

import { ReqStatus } from "@/types/api-types"
interface InitialStateValues {
  status: ReqStatus
}
const initialState: InitialStateValues = {
  status: "idle",
}
const appointmentsSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
})

export default appointmentsSlice.reducer
