import { http, HttpResponse } from "msw";

export const helloHandler = http.get("https://example.com/hello", () => {
  return HttpResponse.json({
    message: "Hello, world!",
  });
});
