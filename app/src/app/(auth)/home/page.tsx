import { HomeIcon, SendIcon } from "lucide-react";
import React from "react";

import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/utils/cn";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthHeader } from "@/components/layout/auth-header";

const userData = {
  name: "田中 太郎",
  avatar: "/150.png",
  books: [
    {
      id: 1,
      title: "私の冒険",
      progress: 85,
      lastEdited: "2025-03-05",
      cover: "https://placehold.co/100x150",
    },
    {
      id: 2,
      title: "料理の旅",
      progress: 40,
      lastEdited: "2025-03-01",
      cover: "https://placehold.co/100x150",
    },
    {
      id: 3,
      title: "未来の世界",
      progress: 10,
      lastEdited: "2025-02-28",
      cover: "https://placehold.co/100x150",
    },
    {
      id: 4,
      title: "未来の世界",
      progress: 10,
      lastEdited: "2025-02-28",
      cover: "https://placehold.co/100x150",
    },
  ],
};
const HomePage = () => {
  return (
    <div
      className="flex flex-col min-h-screen bg-white dark:bg-slate-950"
      data-testid="home-page"
    >
      <AuthHeader />

      <main className="flex-1 w-full lg:w-1/2 mx-auto px-4 sm:px-6 pt-[calc(4rem+60px)] pb-20 lg:pb-0">
        <section className="mb-8 lg:mb-0">
          <div className="flex flex-col mb-8 gap-8">
            <div className="flex flex-col items-center">
              <h3 className="text-xl sm:text-2xl font-semibold">
                新しい本を作成する
              </h3>
            </div>
            <form>
              <Card>
                <CardContent className="flex flex-col">
                  <Label className="mb-1 text-xs text-gray-600" htmlFor="title">
                    本のタイトル
                  </Label>
                  <div className="relative mb-2">
                    <Input
                      id="title"
                      className={cn(
                        "h-11 pr-14 bg-slate-50 focus-visible:ring-teal-500",
                      )}
                      placeholder="銀河鉄道の夜"
                    />
                    <Button
                      size="icon"
                      className={cn(
                        "bg-teal-500 hover:bg-teal-600 transition-all absolute z-[9999] top-1 right-2",
                      )}
                    >
                      <SendIcon />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </form>
          </div>
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-base font-semibold">最近作成した本</h3>
          </div>

          {/* Mobile view (scrollable cards) */}
          <div className="grid grid-cols-2 gap-3 sm:hidden">
            {userData.books.slice(0, 2).map((book) => (
              <div key={book.id} className="group">
                <div className="relative aspect-[2/3] mb-2 rounded-lg overflow-hidden group-hover:shadow-md transition-shadow">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                    <Progress value={book.progress} className="h-1 mb-1" />
                    <p className="text-xs text-white">{book.progress}% 完了</p>
                  </div>
                </div>
                <h4 className="font-medium text-xs leading-tight mb-1">
                  {book.title}
                </h4>
                <p className="text-xs text-slate-500">
                  最終編集: {book.lastEdited}
                </p>
              </div>
            ))}
          </div>

          {/* Tablet and desktop view */}
          <div
            className={cn(
              "hidden sm:flex overflow-x-auto pb-2",
              userData.books.length < 4 && "gap-4",
              userData.books.length === 4 && "justify-between",
            )}
          >
            {userData.books.map((book) => (
              <div key={book.id} className="min-w-[160px] group">
                <div className="relative aspect-[2/3] mb-3 rounded-lg overflow-hidden group-hover:shadow-md transition-shadow">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                    <Progress value={book.progress} className="h-1 mb-1" />
                    <p className="text-xs text-white">{book.progress}% 完了</p>
                  </div>
                </div>
                <h4 className="font-medium text-sm leading-tight mb-1">
                  {book.title}
                </h4>
                <p className="text-xs text-slate-500">
                  最終編集: {book.lastEdited}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <nav className="fixed bottom-0 inset-x-0 sm:hidden flex items-center justify-around py-2 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <Button
          variant="ghost"
          size="icon"
          className="flex flex-col items-center gap-1 text-slate-500"
        >
          <HomeIcon size={18} />
        </Button>
      </nav>
    </div>
  );
};

export default HomePage;