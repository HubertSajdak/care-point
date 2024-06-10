import { AxisConfig } from "@mui/x-charts"
import { t } from "i18next"

import { normalizeKey, translateMonths } from "@/shared"
import { MakeOptional } from "@/types/globals"

export const chartXAxis = (): MakeOptional<AxisConfig, "id">[] | undefined => {
  return [
    {
      id: "barCategories",
      data: [
        t(normalizeKey(translateMonths("january")!)),
        t(normalizeKey(translateMonths("february")!)),
        t(normalizeKey(translateMonths("march")!)),
        t(normalizeKey(translateMonths("april")!)),
        t(normalizeKey(translateMonths("may")!)),
        t(normalizeKey(translateMonths("june")!)),
        t(normalizeKey(translateMonths("july")!)),
        t(normalizeKey(translateMonths("august")!)),
        t(normalizeKey(translateMonths("september")!)),
        t(normalizeKey(translateMonths("october")!)),
        t(normalizeKey(translateMonths("november")!)),
        t(normalizeKey(translateMonths("december")!)),
      ],
      scaleType: "band",
    },
  ]
}
