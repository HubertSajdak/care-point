import { nanoid } from "nanoid"

export const handlePostalCodeKeyUp = (e: any) => {
  let newValue = e.target.value.replaceAll(" ", "")
  if (e.target.value.length === 3 && e.target.value.endsWith("-")) {
    newValue = newValue.replace("-", "")
  }
  if (e.target.value.length === 3 && !e.target.value.endsWith("-")) {
    newValue = newValue.slice(0, 2) + "-" + newValue.slice(2)
  }
  if (e.target.value.length === 2) {
    newValue = newValue + "-"
  }
  e.target.value = newValue
}

export const capitalizeFirstChar = (text: string) => {
  return `${text.slice(0, 1).toUpperCase()}${text.slice(1)}`
}

export const generateUniqueFileName = (
  originalFileName: string,
  startString?: string,
) => {
  const fileExtension = originalFileName.split(".").pop()
  return `${
    startString ? startString.trim().replaceAll(" ", "") : "file"
  }-${nanoid()}.${fileExtension}`
}

export const truncateString = (string: string, displayedLength: number) => {
  return string.length > displayedLength
    ? string.slice(0, displayedLength - 1) + "..."
    : string
}

export const stringToColor = (string: string) => {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = "#"

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}
