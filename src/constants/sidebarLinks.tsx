import BookmarkIcon from "@mui/icons-material/Bookmark"
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd"
import BookmarksIcon from "@mui/icons-material/Bookmarks"
import CorporateFareIcon from "@mui/icons-material/CorporateFare"
import DomainAddIcon from "@mui/icons-material/DomainAdd"
import GroupIcon from "@mui/icons-material/Group"
import GroupsIcon from "@mui/icons-material/Groups"
import LocalHospitalIcon from "@mui/icons-material/LocalHospital"
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork"
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation"
import MedicalServicesIcon from "@mui/icons-material/MedicalServices"
import PersonIcon from "@mui/icons-material/Person"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import SettingsIcon from "@mui/icons-material/Settings"

import { SidebarLinksProps } from "@/layouts/DashboardLayout/types"

import { RouteNames } from "./routes"

const {
  ACCOUNT_MANAGEMENT,
  ADD_CLINIC,
  ALL_CLINICS,
  ALL_DOCTORS,
  ALL_PATIENTS,
  DOCTORS_SELECTION,
  MY_APPOINTMENTS,
  MY_CLINICS,
  MY_SPECIALIZATIONS,
  START,
} = RouteNames
export const doctorSidebarLinks: SidebarLinksProps[] = [
  {
    id: 0,
    variant: "basic",
    path: START,
    text: "sidebar:start",
    icon: <PlayArrowIcon />,
  },
  {
    id: 1,
    variant: "nested",
    text: "sidebar:patients",
    icon: <GroupIcon />,
    children: [
      {
        id: 2,
        text: "sidebar:allPatients",
        path: ALL_PATIENTS,
        icon: <GroupsIcon />,
      },
    ],
  },
  {
    id: 3,
    variant: "nested",
    text: "sidebar:specializations",
    icon: <MedicalInformationIcon />,
    children: [
      {
        id: 4,
        text: "sidebar:mySpecializations",
        path: MY_SPECIALIZATIONS,
        icon: <MedicalServicesIcon />,
      },
    ],
  },
  {
    id: 6,
    variant: "nested",
    text: "sidebar:clinics",
    icon: <LocalHospitalIcon />,
    children: [
      {
        id: 7,
        text: "sidebar:addClinic",
        path: ADD_CLINIC,
        icon: <DomainAddIcon />,
      },
      {
        id: 8,
        text: "sidebar:allClinics",
        path: ALL_CLINICS,
        icon: <CorporateFareIcon />,
      },
      {
        id: 9,
        text: "sidebar:myClinics",
        path: MY_CLINICS,
        icon: <MapsHomeWorkIcon />,
      },
    ],
  },
  {
    id: 10,
    variant: "nested",
    text: "sidebar:settings",
    icon: <SettingsIcon />,
    children: [
      {
        id: 10,
        text: "sidebar:accountManagement",
        path: ACCOUNT_MANAGEMENT,
        icon: <PersonIcon />,
      },
    ],
  },
]
export const patientSidebarLinks: SidebarLinksProps[] = [
  {
    id: 0,
    variant: "basic",
    path: START,
    text: "sidebar:start",
    icon: <PlayArrowIcon />,
  },
  {
    id: 1,
    variant: "nested",
    text: "sidebar:doctors",
    icon: <GroupIcon />,
    children: [
      {
        id: 2,
        text: "sidebar:allDoctors",
        path: ALL_DOCTORS,
        icon: <GroupsIcon />,
      },
    ],
  },
  {
    id: 3,
    variant: "nested",
    text: "sidebar:appointment",
    icon: <BookmarkIcon />,
    children: [
      {
        id: 4,
        text: "sidebar:makeAppointment",
        path: DOCTORS_SELECTION,
        icon: <BookmarkAddIcon />,
      },
      {
        id: 5,
        text: "sidebar:myAppointments",
        path: MY_APPOINTMENTS,
        icon: <BookmarksIcon />,
      },
    ],
  },
  {
    id: 6,
    variant: "nested",
    text: "sidebar:settings",
    icon: <SettingsIcon />,
    children: [
      {
        id: 7,
        text: "sidebar:accountManagement",
        path: ACCOUNT_MANAGEMENT,
        icon: <PersonIcon />,
      },
    ],
  },
]
