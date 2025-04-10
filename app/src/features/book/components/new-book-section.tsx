import { isDesktop } from "react-device-detect";

import { DesktopBookList } from "@/features/book/components/desktop-book-list";
import { MobileBookList } from "@/features/book/components/mobile-book-list";
import { getExploreBooks } from "@/features/book/services/get-explore-books";

export const NewBookSection = async () => {
  const { books } = await getExploreBooks(1, isDesktop ? 4 : 2);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl lg:text-2xl font-semibold">新作</h2>
      </div>

      <MobileBookList books={books} />

      <DesktopBookList books={books} />
      {!books.length && <p>本はまだありません</p>}
    </div>
  );
};
