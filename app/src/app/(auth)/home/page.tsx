import { SendIcon } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { userData } from "@/config/user-data";
import { cn } from "@/utils/cn";

const HomePage = () => {
  return (
    <section className="h-full mb-8 lg:mb-0" data-testid="home-page">
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
                    "bg-teal-500 hover:bg-teal-600 transition-all absolute z-[10] top-1 right-2",
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
      <div
        className="grid grid-cols-2 gap-3 md:hidden"
        data-testid="mobile-bookcard-container"
      >
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
          "hidden md:flex overflow-x-auto pb-2",
          userData.books.length < 4 && "gap-4",
          userData.books.length === 4 && "gap-4 justify-between",
        )}
        data-testid="desktop-bookcard-container"
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
  );
};

export default HomePage;
