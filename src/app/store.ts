import { authSlice } from "@/features/auth"
import { doctorsSlice } from "@/features/doctors"
import { patientsSlice } from "@/features/patients"
import { appointmentsSlice } from "@/redux"

// eslint-disable-next-line import/order
import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    patients: patientsSlice,
    doctors: doctorsSlice,
    appointments: appointmentsSlice,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
