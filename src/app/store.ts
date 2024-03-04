import { clinicsSlice } from "@/features/clinics"
import { doctorsSlice } from "@/features/doctors"
import { patientsSlice } from "@/features/patients"
import { appointmentsSlice, authSlice } from "@/redux"

// eslint-disable-next-line import/order
import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    patients: patientsSlice,
    doctors: doctorsSlice,
    appointments: appointmentsSlice,
    clinics: clinicsSlice,
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
