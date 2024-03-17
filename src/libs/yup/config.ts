import * as yup from "yup"

import { RegexType } from "@/constants"

const VALID_IMAGE_EXTENSIONS = ["jpg", "png", "jpeg"]
const DEFAULT_MAX_FILE_SIZE = 2
declare module "yup" {
  interface StringSchema {
    isChecked(errorText: string): this

    isEmail(): this

    isMatch(matchWith: string): this

    name(errorText: string): this

    password(): this

    phoneNumber(): this

    postalCode(): this
  }

  interface NumberSchema {
    isHeight(): this

    isWeight(): this
  }

  interface MixedSchema {
    imageFormat(): this

    maxFileSize(maxSize?: number): this
  }
}
yup.addMethod(yup.string, "name", function name(errorText: string) {
  return this.required()
    .min(2, "form:name.min")
    .matches(RegexType.NAME, errorText)
})

yup.addMethod(yup.string, "isEmail", function isEmail() {
  return this.required().matches(RegexType.EMAIL, "form:email.invalid")
})
yup.addMethod(yup.string, "phoneNumber", function phoneNumber() {
  return this.required().matches(
    RegexType.PHONE_NUMBER,
    "form:phoneNumber.invalid",
  )
})
yup.addMethod(yup.string, "password", function password() {
  return this.required()
    .min(8, "form:password.min")
    .matches(RegexType.PASSWORD, "form:password.invalid")
})

yup.addMethod(yup.string, "isMatch", function isMatch(matchWith: string) {
  return this.required().oneOf(
    [yup.ref(matchWith), ""],
    "form:confirmPassword.invalid",
  )
})

yup.addMethod(yup.boolean, "isChecked", function isChecked(errorText) {
  return this.oneOf([true], errorText)
})
yup.addMethod(yup.string, "postalCode", function postalCode() {
  return this.required().matches(
    RegexType.POSTAL_CODE,
    "form:postalCode.invalid",
  )
})
yup.addMethod(yup.number, "isHeight", function isHeight() {
  return this.required()
    .min(1, "form:height.invalid")
    .max(999, "form:height.invalid")
})
yup.addMethod(yup.number, "isWeight", function isWeight() {
  return this.required()
    .min(1, "form:weight.invalid")
    .max(999, "form:weight.invalid")
})
yup.addMethod(yup.mixed<File>, "imageFormat", function imageFormat() {
  return this.test("is-valid-image", "form:file.invalidFormat", (value) => {
    if (!value) return true
    const fileExtension = value.name.split(".").pop()
    return Boolean(
      fileExtension &&
        VALID_IMAGE_EXTENSIONS.find((extension) => extension === fileExtension),
    )
  })
})

yup.addMethod(
  yup.mixed<File>,
  "maxFileSize",
  function maxFileSize(maxSize?: number) {
    return this.test(
      "is-valid-size",
      maxSize ? `max ${maxSize}MB` : "form:file.maxFileSize",
      (value) => {
        if (!value) return true
        const maxFileSize =
          (maxSize ? maxSize : DEFAULT_MAX_FILE_SIZE) * 1024 ** 2
        return value.size <= maxFileSize
      },
    )
  },
)

yup.setLocale({
  mixed: {
    required: "form:common.required",
  },
  string: {
    // email: "forms:errors.notValidEmail",
  },
})

export default yup
