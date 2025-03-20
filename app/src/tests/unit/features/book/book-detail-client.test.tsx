import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";

import { BookDetailClient } from "@/features/book/client/book-detail-client";
import { IconKeyType } from "@/features/book/config/icons";

describe("BookDetailClientコンポーネントのテスト", async () => {
  test.skip("コンポーネントが正常に表示される", async () => {
    const book = {
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
      created_at: new Date(2025, 2, 15, 22, 0).toISOString(),
      updated_at: new Date(2025, 2, 15, 22, 0).toISOString(),
    };

    render(<BookDetailClient book={book} />);

    const client = screen.getByTestId("book-detail-page");
    expect(client).toBeInTheDocument();
  });

  test.skip("タイトルが表示される", () => {
    const book = {
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
      created_at: new Date(2025, 2, 15, 22, 0).toISOString(),
      updated_at: new Date(2025, 2, 15, 22, 0).toISOString(),
    };

    render(<BookDetailClient book={book} />);

    const title = screen.getByTestId("title");

    expect(title).toBeInTheDocument();
    expect(title.textContent).not.toBeNull();
  });

  test.skip("著者のアバター画像、名前が表示される", async () => {
    const book = {
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
      created_at: new Date(2025, 2, 15, 22, 0).toISOString(),
      updated_at: new Date(2025, 2, 15, 22, 0).toISOString(),
    };

    render(<BookDetailClient book={book} />);

    const author = screen.getByTestId("author");
    const avatar = screen.getByTestId("author-avatar");

    await waitFor(() => {
      expect(author).toBeInTheDocument();
      expect(avatar).toBeInTheDocument();
    });
  });

  test.skip("本を読むというラベルのボタンが表示される", () => {
    const book = {
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
      created_at: new Date(2025, 2, 15, 22, 0).toISOString(),
      updated_at: new Date(2025, 2, 15, 22, 0).toISOString(),
    };

    render(<BookDetailClient book={book} />);

    const readBookButton = screen.getByTestId("read-book-button");

    expect(readBookButton).toBeInTheDocument();
    expect(readBookButton.tagName).toBe("BUTTON");
  });

  test.skip("あらすじタブをクリックするとあらすじが表示される", async () => {
    const book = {
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
      created_at: new Date(2025, 2, 15, 22, 0).toISOString(),
      updated_at: new Date(2025, 2, 15, 22, 0).toISOString(),
    };

    render(<BookDetailClient book={book} />);

    const summaryTabTrigger = screen.getByTestId("summary-trigger");
    await userEvent.click(summaryTabTrigger);

    const summary = screen.getByTestId("summary");
    expect(summary).toBeInTheDocument();
  });

  test.skip("目次タブをクリックすると目次が表示される", async () => {
    const book = {
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
      created_at: new Date(2025, 2, 15, 22, 0).toISOString(),
      updated_at: new Date(2025, 2, 15, 22, 0).toISOString(),
    };

    render(<BookDetailClient book={book} />);

    const summaryTabTrigger = screen.getByTestId("summary-trigger");
    await userEvent.click(summaryTabTrigger);

    const summary = screen.getByTestId("summary");
    expect(summary).toBeInTheDocument();

    const tocTabTrigger = screen.getByTestId("toc-trigger");
    await userEvent.click(tocTabTrigger);

    const toc = screen.getByTestId("toc");
    const tocItems = toc.querySelectorAll("li");

    expect(toc).toBeInTheDocument();

    tocItems.forEach((tocItem) => {
      expect(tocItem).toBeInTheDocument();
    });
  });
  test.skip("カテゴリボタンが表示される", () => {
    const book = {
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
      created_at: new Date(2025, 2, 15, 22, 0).toISOString(),
      updated_at: new Date(2025, 2, 15, 22, 0).toISOString(),
    };

    render(<BookDetailClient book={book} />);

    const categories = screen.getByTestId("categories");
    const categoryButtons = categories.querySelectorAll("button");

    expect(categories).toBeInTheDocument();

    categoryButtons.forEach((categoryButton) => {
      expect(categoryButton).toBeInTheDocument();
    });
  });
});
