"use client";

import { motion } from "framer-motion";
import { AlignLeftIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DeleteBookDialog } from "@/features/book/components/delete-book-dialog";
import { Book } from "@/types/book";

export const Sidebar = ({ books }: { books: Book[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleSidebar = useDebouncedCallback(
    (open: React.SetStateAction<boolean>) => {
      setIsOpen(open);
    },
    500,
  );

  const sidebarVariants = {
    open: {
      x: -4,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: "-110%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const sidebarButtonVariants = {
    open: {
      x: 0,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <>
      <Button
        size={"icon"}
        variant={"ghost"}
        className="z-[9999]"
        data-testid="sidebar-trigger"
        asChild
      >
        <motion.button
          onClick={() => setIsOpen((open) => !open)}
          onMouseEnter={() => handleSidebar(true)}
          onMouseLeave={() => handleSidebar(false)}
          variants={sidebarButtonVariants}
          animate={isOpen ? "open" : "closed"}
          aria-label="Toggle sidebar"
        >
          <AlignLeftIcon />
        </motion.button>
      </Button>
      <motion.div
        className="fixed h-[calc(100%-60px)] top-[60px] left-1 bottom-1 w-64 bg-white dark:bg-slate-950 shadow-lg z-40 rounded-sm"
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        onMouseEnter={() => handleSidebar(true)}
        onMouseLeave={() => handleSidebar(false)}
        data-testid="sidebar"
      >
        <div className="h-full pl-3 pr-1 py-6 border-r border-t">
          <h2 className="text-sm font-bold mb-3">作品一覧</h2>
          <ScrollArea className="h-[calc(100%-30px)] pr-3">
            <ul className="space-y-2">
              {books.length ? (
                books.map((book, index) => (
                  <li key={index} className="relative group">
                    <Link
                      href={`/book/${book.slug}`}
                      className="flex pl-2 z-10 pr-5 py-1 text-sm group-hover:bg-teal-50 dark:group-hover:bg-gray-300/20 rounded transition-colors duration-200"
                    >
                      {book.title}
                    </Link>
                    <DeleteBookDialog
                      book_id={book.id}
                      book_title={book.title}
                      isDialogOpen={dialogOpen}
                      setDialogOpen={setDialogOpen}
                      handleSidebar={handleSidebar}
                    />
                  </li>
                ))
              ) : (
                <p className="text-sm">まだ本はありません</p>
              )}
            </ul>
          </ScrollArea>
        </div>
      </motion.div>
    </>
  );
};
