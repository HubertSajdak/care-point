import { http, HttpResponse } from "msw"

export const handlers = [
  http.get("http://localhost:5173/scoops", () => {
    return HttpResponse.json({
      user: {
        id: "abc-123",
        name: "John Maverick",
      },
    })
  }),
]
