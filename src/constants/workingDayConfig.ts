import { IWeekDays } from "@/types/api-types"

interface WorkingDayConfigValues {
  id: number
  label: IWeekDays
  startTimeId: string
  startTimeLabel: string
  startTimeName: string
  stopTimeId: string
  stopTimeLabel: string
  stopTimeName: string
}
export const workingDayConfig: WorkingDayConfigValues[] = [
  {
    id: 0,
    label: "monday",
    startTimeId: "monday-start-time",
    stopTimeId: "monday-stop-time",
    startTimeName: "workingTime[0].startTime",
    stopTimeName: "workingTime[0].stopTime",
    startTimeLabel: "from",
    stopTimeLabel: "to",
  },
  {
    id: 1,
    label: "tuesday",
    startTimeId: "tuesday-start-time",
    stopTimeId: "tuesday-stop-time",
    startTimeName: "workingTime[1].startTime",
    stopTimeName: "workingTime[1].stopTime",
    startTimeLabel: "from",
    stopTimeLabel: "to",
  },
  {
    id: 2,
    label: "wednesday",
    startTimeId: "wednesday-start-time",
    stopTimeId: "wednesday-stop-time",
    startTimeName: "workingTime[2].startTime",
    stopTimeName: "workingTime[2].stopTime",
    startTimeLabel: "from",
    stopTimeLabel: "to",
  },
  {
    id: 3,
    label: "thursday",
    startTimeId: "thursday-start-time",
    stopTimeId: "thursday-stop-time",
    startTimeName: "workingTime[3].startTime",
    stopTimeName: "workingTime[3].stopTime",
    startTimeLabel: "from",
    stopTimeLabel: "to",
  },
  {
    id: 4,
    label: "friday",
    startTimeId: "friday-start-time",
    stopTimeId: "friday-stop-time",
    startTimeName: "workingTime[4].startTime",
    stopTimeName: "workingTime[4].stopTime",
    startTimeLabel: "from",
    stopTimeLabel: "to",
  },
  {
    id: 5,
    label: "saturday",
    startTimeId: "saturday-start-time",
    stopTimeId: "saturday-stop-time",
    startTimeName: "workingTime[5].startTime",
    stopTimeName: "workingTime[5].stopTime",
    startTimeLabel: "from",
    stopTimeLabel: "to",
  },
  {
    id: 6,
    label: "sunday",
    startTimeId: "sunday-start-time",
    stopTimeId: "sunday-stop-time",
    startTimeName: "workingTime[6].startTime",
    stopTimeName: "workingTime[6].stopTime",
    startTimeLabel: "from",
    stopTimeLabel: "to",
  },
]
