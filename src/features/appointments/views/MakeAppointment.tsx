import { useEffect } from "react"
import { useParams } from "react-router-dom"

import { useAppDispatch } from "@/app/hooks"
import { getSingleDoctor } from "@/features/doctors"

const MakeAppointment = () => {
  const { doctorId } = useParams()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!doctorId) return
    dispatch(getSingleDoctor(doctorId))
  }, [dispatch, doctorId])
  return <div>MakeAppointment</div>
}

export default MakeAppointment
