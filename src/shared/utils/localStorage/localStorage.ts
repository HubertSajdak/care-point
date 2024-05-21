const CARE_POINT_APP_ACCESS_TOKEN = "care-point-access-token"
const CARE_POINT_APP_REFRESH_TOKEN = "care-point-refresh-token"
export const setAccessTokenToLocalStorage = (accessToken: string) => {
  localStorage.setItem(CARE_POINT_APP_ACCESS_TOKEN, JSON.stringify(accessToken))
}

// I would use hashing, I wouldn't store tokens directly, check msal library as an exapmle, they use objects and has keys - it is hard to guess which key is responsible for what
// this will increase security a little bit
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
