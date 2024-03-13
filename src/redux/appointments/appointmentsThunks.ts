import { createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

import { RootState } from "@/app/store"
import { getSingleDoctorAppointments } from "@/redux/appointments/api/getSingleDoctorAppointments"
import { errorHandler } from "@/shared"

import { deleteAppointment } from "./api/deleteAppointment"
import { getUserAppointments } from "./api/getUserAppointments"
import { makeAppointment, MakeAppointmentValues } from "./api/makeAppointment"

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
export const cancelAppointment = createAsyncThunk(
  "appointments/cancelAppointment",
  async (appointmentId: string, thunkAPI) => {
    try {
      const res = await deleteAppointment(appointmentId)
      thunkAPI.dispatch(getCurrentUserAppointments())
      toast.success(res.data.message)
    } catch (error) {
      errorHandler({ error, thunkAPI })
    }
  },
)

export const getCurrentUserAppointments = createAsyncThunk(
  "appointments/getUserAppointments",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState
    const {
      appointmentFilter,
      currentPage,
      pageSize,
      search,
      sortBy,
      sortDirection,
    } = state.appointments
    const params = {
      sortBy,
      sortDirection,
      pageSize,
      currentPage,
      appointmentFilter,
      ...(search && { search }),
    }
    try {
      const res = await getUserAppointments(params)
      return res.data
    } catch (error) {
      errorHandler({ error, thunkAPI })
    }
  },
)

export const getDoctorAppointments = createAsyncThunk(
  "appointments/getDoctorAppointments",
  async (id: string, thunkAPI) => {
    try {
      const res = await getSingleDoctorAppointments(id)
      return res.data
    } catch (error) {
      errorHandler({ error, thunkAPI })
    }
  },
)
