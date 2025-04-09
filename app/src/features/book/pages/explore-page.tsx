import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DesktopBookList } from "@/features/book/components/desktop-book-list";
import { MobileBookList } from "@/features/book/components/mobile-book-list";
import { NewBookSection } from "@/features/book/components/new-book-section";
import { getCategories } from "@/features/book/services/get-categories";

export const ExplorePage = async () => {
  const { categories } = await getCategories();

  return (
    <div
      className="w-full lg:w-1/2 mx-auto md:pb-12 relative space-y-8"
      data-testid="explore-page"
    >
      <NewBookSection />
      {categories.length ? (
        <div className="space-y-4">
          <h2 className="text-xl lg:text-2xl font-semibold">人気のカテゴリ</h2>
          <Tabs defaultValue={categories[0].category} defaultChecked>
            <TabsList className="bg-transparent">
              {categories.map((category) => (
                <TabsTrigger
                  value={category.category}
                  className="px-6 data-[state=active]:border-b-[3px] data-[state=active]:border-teal-500 rounded-none shadow-none"
                  key={category.id}
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {categories.map((category) => (
              <TabsContent value={category.category} key={category.id}>
                {!category.books.length && <p>本はまだありません</p>}
                <MobileBookList books={category.books} />
                <DesktopBookList books={category.books} />
                <div className="flex items-center justify-center">
                  {category.books.length ? (
                    <Button className="mx-auto" variant={"outline"} asChild>
                      <Link href={`/explore/${category.category}`}>
                        {category.label}をもっと見る→
                      </Link>
                    </Button>
                  ) : null}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      ) : null}
    </div>
  );
};
