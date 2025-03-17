"use client"

import { FormatDate } from "@/components/format/date";
import { Button } from "@/components/ui/button";
import { userData } from "@/config/user-data";
import { IBook } from "@/types/book";
import { ChevronRightIcon } from "lucide-react";
import { useTransition } from "react";

export const ExploreClientPage = ({ books }: { books: IBook[] }) => {
  return (
    <section
      className="w-full lg:w-1/2 mx-auto h-full mb-8 md:pb-12 lg:mb-0 flex flex-col gap-4 md:gap-8" data-testid="explore-book-page">
      <h2 className="text-xl md:text-2xl font-semibold">最近追加された本</h2>
      <div className="w-full grid grid-cols-2 gap-4 sm:hidden">
        {books.map((book) => (
          <div key={book.id} className="group" data-testid="book-card">
            <div 
              className="relative aspect-[2/3] mb-2 rounded-lg overflow-hidden group-hover:shadow-md transition-shadow"
              style={{
                boxShadow:
                  "10px 15px 15px -5px rgba(0, 0, 0, 0.2), 2px 4px 6px rgba(0, 0, 0, 0.15)",
              }}>
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
            <h4 className="font-medium text-sm leading-tight">
              {book.title}
            </h4>
            <FormatDate 
              date={book.created_at}
              className="text-xs text-muted-foreground"
              />
          </div>
        ))}
      </div>
  
      {/* Tablet and desktop view */}
      <div className="w-full hidden sm:grid grid-cols-4 gap-6 pb-2">
        {books.map((book) => (
          <div
            key={book.id}
            className="min-w-36 group"
            data-testid="book-card"
          >
            <div 
              className="relative aspect-[2/3] mb-3 rounded-lg overflow-hidden group-hover:shadow-md transition-shadow"
              style={{
                boxShadow:
                  "0px 15px 22px -5px rgba(0, 0, 0, 0.2), 0px 0px 2px rgba(0, 0, 0, 0.15)",
              }}>
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
            <h4 className="font-medium text-sm md:text-base leading-tight">
              {book.title}
            </h4>
            <FormatDate 
              date={book.created_at}
              className="text-xs text-muted-foreground"
              />
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center">
        <Button variant={"outline"}>
          次のページへ
          <ChevronRightIcon />
        </Button>
      </div>
    </section>
  )
}