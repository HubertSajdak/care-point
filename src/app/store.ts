import authSlice from "@/features/auth/authSlice"
import doctorsSlice from "@/features/doctors/doctorsSlice"
import patientsSlice from "@/features/patients/patientsSlice"

// eslint-disable-next-line import/order
import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    patients: patientsSlice,
    doctors: doctorsSlice,
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
