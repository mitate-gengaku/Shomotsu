import React from "react";

import { userData } from "@/config/user-data";
import { ContentTitleForm } from "@/features/book/components/content-title-form";
import { cn } from "@/utils/cn";

const HomePage = () => {
  return (
    <section
      className="w-full lg:w-1/2 mx-auto h-full mb-8 lg:mb-0"
      data-testid="home-page"
    >
      <div className="flex flex-col mb-8 gap-8">
        <div className="flex flex-col items-center">
          <h3 className="text-xl sm:text-2xl font-semibold">
            新しい本を作成する
          </h3>
        </div>
        <ContentTitleForm />
      </div>
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="text-base font-semibold">最近作成した本</h3>
      </div>

      {/* Mobile view (scrollable cards) */}
      <div
        className="grid grid-cols-2 gap-8 md:hidden"
        data-testid="mobile-bookcard-container"
      >
        {userData.books.slice(0, 2).map((book) => (
          <div key={book.id} className=" cursor-pointer">
            <div
              className="relative aspect-[2/3] mb-2 rounded-lg overflow-hidden transition-shadow"
              style={{
                boxShadow:
                  "10px 15px 15px -5px rgba(0, 0, 0, 0.2), 2px 4px 6px rgba(0, 0, 0, 0.15)",
              }}
            >
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 pointer-events-none rounded-lg"
                style={{
                  background:
                    "linear-gradient(-90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 80%, rgba(255, 255, 255, 0.4) 94%, rgba(255, 255, 255, 0.5) 96%, rgba(255, 255, 255, 0) 100%)",
                }}
              />
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
          <div key={book.id} className="min-w-[160px] cursor-pointer">
            <div
              className="relative aspect-[2/3] mb-3 rounded-lg overflow-hidden transition-shadow"
              style={{
                boxShadow:
                  "0px 15px 22px -5px rgba(0, 0, 0, 0.2), 0px 0px 2px rgba(0, 0, 0, 0.15)",
              }}
            >
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 pointer-events-none rounded-lg"
                style={{
                  background:
                    "linear-gradient(-90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 80%, rgba(255, 255, 255, 0.4) 94%, rgba(255, 255, 255, 0.5) 96%, rgba(255, 255, 255, 0) 100%)",
                }}
              />
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
