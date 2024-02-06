const CARE_POINT_APP_ACCESS_TOKEN = "care-point-access-token"
const CARE_POINT_APP_REFRESH_TOKEN = "care-point-refresh-token"
export const setAccessTokenToLocalStorage = (accessToken: string) => {
  localStorage.setItem(CARE_POINT_APP_ACCESS_TOKEN, JSON.stringify(accessToken))
}
export const setRefreshTokenToLocalStorage = (refreshToken: string) => {
  localStorage.setItem(
    CARE_POINT_APP_REFRESH_TOKEN,
    JSON.stringify(refreshToken),
  )
}
export const getAccessTokenFromLocalStorage = () => {
  const result = localStorage.getItem(CARE_POINT_APP_ACCESS_TOKEN)
  const token: string = result ? JSON.parse(result) : ""
  return token
}
export const getRefreshTokenFromLocalStorage = () => {
  const result = localStorage.getItem(CARE_POINT_APP_REFRESH_TOKEN)
  const token: string = result ? JSON.parse(result) : ""
  return token
}

export const removeAccessTokenFromLocalStorage = () => {
  localStorage.removeItem(CARE_POINT_APP_ACCESS_TOKEN)
}
export const removeRefreshTokenFromLocalStorage = () => {
  localStorage.removeItem(CARE_POINT_APP_REFRESH_TOKEN)
}
