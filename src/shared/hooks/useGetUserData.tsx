import { useCallback, useEffect } from "react"

import { useAppDispatch } from "@/app/hooks"
import { getUserData } from "@/shared/store"

function useGetUserData() {
  const dispatch = useAppDispatch()
  const fetchUserData = useCallback(async () => {
    await dispatch(getUserData())
  }, [dispatch])
  useEffect(() => {
    fetchUserData()
  }, [dispatch, fetchUserData])
}

export default useGetUserData
