import { createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

import { errorHandler } from "@/shared"

import { MakeAppointmentValues, makeAppointment } from "./api/makeAppointment"

export const createAppointment = createAsyncThunk(
  "appointments/createAppointment",
  async (values: MakeAppointmentValues, thunkAPI) => {
    try {
      const res = await makeAppointment(values)
      toast.success(res.data.message)
    } catch (error) {
      errorHandler({ error, thunkAPI })
    }
  },
)
