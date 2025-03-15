"use client";

import { motion } from "framer-motion";
import { AlignLeftIcon, EllipsisIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import {
  AlertDialogCancel,
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

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

  const buttonVariants = {
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
      <Button size={"icon"} variant={"ghost"} className="z-[9999]" asChild>
        <motion.button
          onClick={() => setIsOpen((open) => !open)}
          onMouseEnter={() => handleSidebar(true)}
          onMouseLeave={() => handleSidebar(false)}
          variants={buttonVariants}
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
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="z-[999] flex items-center justify-center size-6 absolute right-0 top-0.5 rounded-sm">
                        <EllipsisIcon className="size-3" />
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent
                      onMouseEnter={() => handleSidebar(true)}
                    >
                      <AlertDialogHeader>
                        <AlertDialogTitle>本の削除</AlertDialogTitle>
                        <AlertDialogDescription>
                          この操作は取り消せません。本当に「
                          <span className="font-semibold">{item}</span>
                          」を削除しますか？
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>キャンセル</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-500 hover:bg-red-600 transition-all">
                          削除
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
