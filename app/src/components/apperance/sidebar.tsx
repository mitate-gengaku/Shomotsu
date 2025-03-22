"use client";

import { motion } from "framer-motion";
import { AlignLeftIcon, EllipsisIcon } from "lucide-react";
import Link from "next/link";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";
import { useDebouncedCallback } from "use-debounce";

import { Spinner } from "@/components/loading/spinner";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { deleteBook } from "@/features/book/services/delete-book";
import { cn } from "@/utils/cn";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const books = ["銀河鉄道の夜", "熊嵐", "高熱街道"];

  const handleSidebar = useDebouncedCallback(
    (open: React.SetStateAction<boolean>) => {
      setIsOpen(open);
    },
    500,
  );

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: "-100%",
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

  const onDelete = (bookId: string) => {
    startTransition(async () => {
      try {
        const response = await deleteBook(bookId);
        toast.success(response.message);
        setDialogOpen((open) => !open);
        handleSidebar((open) => !open);
      } catch (e) {
        if (e instanceof Error) {
          toast.error(e.message);
          return;
        }
        toast.error("Something went wrong");
        return;
      }
    });
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
        className="fixed h-[calc(100%-60px)] top-[60px] left-1 bottom-1 w-64 bg-white shadow-lg z-40 rounded-sm"
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
              {books.map((item, index) => (
                <li key={index} className="relative group">
                  <Link
                    href={`/book/${item}`}
                    className="flex pl-2 z-10 pr-5 py-1 text-sm group-hover:bg-teal-50 rounded transition-colors duration-200"
                  >
                    {item}
                  </Link>
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger data-testid="alert-dialog-trigger" asChild>
                      <button className="z-[999] flex items-center justify-center size-6 absolute right-0 top-0.5 rounded-sm">
                        <EllipsisIcon className="size-3" />
                      </button>
                    </DialogTrigger>
                    <DialogContent
                      onMouseEnter={() => handleSidebar(true)}
                      data-testid="alert-dialog-content"
                    >
                      <DialogHeader>
                        <DialogTitle>本の削除</DialogTitle>
                        <DialogDescription>
                          この操作は取り消せません。本当に「
                          <span className="font-semibold">{item}</span>
                          」を削除しますか？
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose
                          disabled={isPending}
                          className={cn(buttonVariants({ variant: "outline" }))}
                          type="button"
                        >
                          キャンセル
                        </DialogClose>
                        <Button
                          onClick={() =>
                            onDelete("238A26BF-C676-4FFA-BF17-73D673D35B6B")
                          }
                          disabled={isPending}
                          className="bg-red-500 hover:bg-red-600 transition-all"
                        >
                          {isPending ? (
                            <Spinner className="text-white" />
                          ) : (
                            "削除"
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>
      </motion.div>
    </>
  );
};
