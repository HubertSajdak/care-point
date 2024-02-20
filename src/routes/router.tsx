import { Navigate, createBrowserRouter } from "react-router-dom"

import { RouteNames, UserRoles } from "@/constants"
import { AccountManagement } from "@/features/accountManagement"
import { Login, Register } from "@/features/auth"
import {
  AllDoctors,
  DoctorSelection,
  MakeAppointment,
} from "@/features/doctors"
import { AllPatients } from "@/features/patients"
import { Start } from "@/features/start"
import BasePageLayout from "@/layouts/BasePageLayout/BasePageLayout"
import { UnauthorizedView } from "@/shared"
import DashboardLayoutWrapper from "@/wrappers/DashboardLayoutWrapper/DashboardLayoutWrapper"

import PrivateRoute from "./PrivateRoute"
import PublicRoute from "./PublicRoute"

const {
  ACCOUNT_MANAGEMENT,
  ALL_DOCTORS,
  ALL_PATIENTS,
  DASHBOARD,
  DOCTORS_SELECTION,
  LOGIN,
  MAKE_APPOINTMENT,
  REGISTER,
  START,
  UNAUTHORIZED,
} = RouteNames
export const router = createBrowserRouter([
  {
    element: <BasePageLayout />,
    errorElement: <h1>Something went wrong</h1>,
    children: [
      { index: true, path: UNAUTHORIZED, element: <UnauthorizedView /> },
    ],
  },
  {
    element: (
      <PublicRoute>
        <BasePageLayout />
      </PublicRoute>
    ),
    errorElement: <h1>An Error Occured</h1>,
    children: [
      { index: true, element: <Navigate to={LOGIN} /> },
      { path: LOGIN, element: <Login /> },
      { path: REGISTER, element: <Register /> },
    ],
  },
  {
    path: DASHBOARD,
    element: (
      <PrivateRoute>
        <DashboardLayoutWrapper />
      </PrivateRoute>
    ),
    errorElement: <h1>Something went wrong</h1>,
    children: [
      {
        index: true,
        element: <Navigate to={START} />,
      },
      { path: START, element: <Start /> },
      { path: ACCOUNT_MANAGEMENT, element: <AccountManagement /> },
    ],
  },
  {
    path: DASHBOARD,
    element: (
      <PrivateRoute role={UserRoles.DOCTOR}>
        <DashboardLayoutWrapper />
      </PrivateRoute>
    ),
    errorElement: <h1>Something went wrong</h1>,
    children: [
      {
        index: true,
        element: <Navigate to={START} />,
      },
      { path: ALL_PATIENTS, element: <AllPatients /> },
    ],
  },
  {
    path: DASHBOARD,
    element: (
      <PrivateRoute role={UserRoles.PATIENT}>
        <DashboardLayoutWrapper />
      </PrivateRoute>
    ),
    errorElement: <h1>Something went wrong</h1>,
    children: [
      {
        index: true,
        element: <Navigate to={START} />,
      },
      { path: ALL_DOCTORS, element: <AllDoctors /> },
      { path: DOCTORS_SELECTION, element: <DoctorSelection /> },
      { path: `${MAKE_APPOINTMENT}/:doctorId`, element: <MakeAppointment /> },
    ],
  },
])
