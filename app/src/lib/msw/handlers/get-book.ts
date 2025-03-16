import { http, HttpResponse } from "msw";

const books = new Map(
  Object.entries({
    "238A26BF-C676-4FFA-BF17-73D673D35B6B": {
      id: "238A26BF-C676-4FFA-BF17-73D673D35B6B",
      title: "銀河鉄道の夜",
      user_id: "387a19fb-b2a4-43cd-a7b4-a3bfb8846f33",
      user: {
        name: "近藤れるひ",
        avatar: "https://placehold.co/150x150",
      },
      cover: "https://placehold.co/100x150",
      content:
        "こっちの方はレンズが薄いのでわずかの光る粒すなわち星がたくさん見えてきました。そこから幅の広いみちが、一すじ白く星あかりに照らしだされてあったのだ。それはね、鷺をたべるには鳥捕りは、黄いろのはこっちへ進み、またちょうどさっきのような色をした人たちが集まっていらっしゃると思うわええ、たくさんいたわ女の子がこたえました。一時間で行ってくるよと言いながら、自分もだんだん顔いろがかがやいてきました。そしてほんとうにそのいるかのかたちのおかしいことは、二人の影は、ちょうどおまえたちのように足をのばしていました。",
      publish: false,
      categories: [
        {
          title: "コンピューター",
          icon: "computer",
        },
      ],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  }),
);

export const getBookHandler = http.get(
  "http://localhost:3000/api/books/:id",
  ({ params }) => {
    const { id } = params;

    if (!books.get(String(id))) {
      return HttpResponse.json(null, { status: 404, statusText: "Not Found" });
    }
    return HttpResponse.json(books.get(String(id)));
  },
);
