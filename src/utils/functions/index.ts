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
