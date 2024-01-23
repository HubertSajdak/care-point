import { useAppSelector } from "@/app/hooks"

const Start = () => {
  const user = useAppSelector((state) => state.auth.user)
  return (
    <div>
      Welcome {user?.name} {user?.surname}
    </div>
  )
}

export default Start
