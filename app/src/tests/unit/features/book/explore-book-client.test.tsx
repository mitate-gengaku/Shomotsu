import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { ExploreClientPage } from "@/features/book/client/explore-page";
import { IconKeyType } from "@/features/book/config/icons";
const books = [
  {
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
        icon: "computer" as IconKeyType,
      },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "238A26BFoC676-4FFA-BF17-73D673D35B6B",
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
        icon: "computer" as IconKeyType,
      },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "23rA26BF-C676-4FFA-BF17-73D673D35B6B",
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
        icon: "computer" as IconKeyType,
      },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2c8A26BF-C676-4FFA-BF17-73D673D35B6B",
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
        icon: "computer" as IconKeyType,
      },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "238A26BF-C676-4FFA-BF17-73Da73D35B6B",
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
        icon: "computer" as IconKeyType,
      },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "238A26BF-C676-4FFv-BF17-73D673D35B6B",
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
        icon: "computer" as IconKeyType,
      },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "238A26Bv-C676-4FFA-BF17-73D673D35B6B",
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
        icon: "computer" as IconKeyType,
      },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "238A26cF-C676-4FFA-BF17-73D673D35B6B",
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
        icon: "computer" as IconKeyType,
      },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "238A26BF-C67d-4FFA-BF17-73D673D35B6B",
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
        icon: "computer" as IconKeyType,
      },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "238A26dF-C676-4FFA-BF17-73D673D35B6a",
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
        icon: "computer" as IconKeyType,
      },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

describe("ExploreClientPage", () => {
  test("コンポーネントが正常に表示される", () => {
    render(<ExploreClientPage books={books} />);

    const exploreClientPage = screen.getByTestId("explore-book-page");

    expect(exploreClientPage).toBeInTheDocument();
  });

  test("BookCardが表示されている", async () => {
    render(<ExploreClientPage books={books} />);

    const bookCards = screen.getAllByTestId("book-card");

    bookCards.forEach((bookCard) => {
      expect(bookCard).toBeInTheDocument();
    });
  });

  test("次のページへというラベルがついたボタンが表示されている", async () => {
    render(<ExploreClientPage books={books} />);

    const nextPageButton = screen.getByRole("button", { name: "次のページ" });

    expect(nextPageButton).toBeInTheDocument();
  });
});
