import resources from "./resources"

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: [
      "buttons",
      "form",
      "authPages",
      "sidebar",
      "common",
      "table",
      "appointment",
      "clinic",
      "specializations",
    ]
    resources: typeof resources
  }
}
