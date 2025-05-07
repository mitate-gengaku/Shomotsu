"use client";

import { useAtomValue } from "jotai";

import { makimonoAtom } from "@/stores/makimono";
import { cn } from "@/utils/cn";

export const ReadBookLayoutUI = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const isMakimonoView = useAtomValue(makimonoAtom);

  return (
    <div
      className={cn(
        "w-full flex flex-col min-h-screen max-h-screen bg-white relative",
        isMakimonoView ? "overflow-y-hidden" : "overflow-y-scroll",
      )}
      data-testid="read-book-layout"
    >
      <main className="flex flex-col h-full lg:pb-0" data-testid="main">
        {children}
      </main>
    </div>
  );
};
