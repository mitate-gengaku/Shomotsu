import { http, HttpResponse } from "msw";

export const getBookHandler = http.post(
  "http://localhost:3000/api/books",
  () => {
    return HttpResponse.json({
      bookId: "238A26BF-C676-4FFA-BF17-73D673D35B6B",
      message: "本を作成しました。",
    });
  },
);
