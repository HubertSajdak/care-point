import { clinicsSlice } from "@/features/clinics"
import { doctorsSlice } from "@/features/doctors"
import { patientsSlice } from "@/features/patients"
import { specializationsSlice } from "@/features/specializations"
import { appointmentsSlice, authSlice } from "@/shared/store"

// eslint-disable-next-line import/order
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    patients: patientsSlice,
    doctors: doctorsSlice,
    appointments: appointmentsSlice,
    clinics: clinicsSlice,
    specializations: specializationsSlice,
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
