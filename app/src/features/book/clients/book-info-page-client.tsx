"use client";

import { useUser } from "@clerk/nextjs";
import { BookmarkIcon, EllipsisVerticalIcon, EyeIcon, EyeOffIcon, PencilIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { useDebouncedCallback } from "use-debounce";

import { FormatDate } from "@/components/format/date";
import { XLogoIcon } from "@/components/icon/x";
import { Confetti } from "@/components/notifications/confetti";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { XShare } from "@/components/utils/x-share";
import { categoryIcons } from "@/config/category-icons";
import { add } from "@/features/book/actions/add";
import { BookWithAllRelations } from "@/types/book";
import { cn } from "@/utils/cn";

interface Props {
  book: BookWithAllRelations;
  bookMarked: boolean;
  url: string;
}

export const BookInfoPageClient = ({ book, bookMarked, url }: Props) => {
  const path = usePathname();
  const { user } = useUser();

  const onAddLibrary = async (bookId: string, bookMarked: boolean, slug: string) => {
    try {
      await add(bookId, bookMarked, slug);
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
        return;
      }
      toast.error("Something went wrong");
      return;
    }
  };

  const handleLibrary = useDebouncedCallback(onAddLibrary, 500);

  return (
    <div className="w-full lg:w-1/2 mx-auto md:pb-12 relative" data-testid="book-detail-page">
      <div className="mb-8 flex items-center justify-between">
        {book.category && (
          <Breadcrumb>
            <BreadcrumbList className="justify-center lg:justify-start">
              <BreadcrumbItem>
                <BreadcrumbLink href="/home">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/explore">Explore</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{book.category.label}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        )}
        {user && user.id === book.userId && (
          <Badge variant={"outline"} className="gap-2">
            {book.publish ? (
              <>
                <EyeIcon className="size-4 text-teal-500" />
                公開中
              </>
            ) : (
              <>
                <EyeOffIcon className="size-4" />
                非公開
              </>
            )}
          </Badge>
        )}
      </div>
      <Confetti />
      <div className="flex flex-col lg:flex-row items-ceter gap-8 lg:gap-2 mb-6 relative">
        <div className="lg:w-1/3">
          <div
            className="w-2/5 mx-auto lg:w-4/5 lg:mx-0 rounded-lg shadow-lg relative"
            style={{
              boxShadow: "10px 15px 22px -5px rgba(0, 0, 0, 0.2), 2px 4px 6px rgba(0, 0, 0, 0.15)",
            }}
          >
            {bookMarked && (
              <span className="absolute h-24 left-5 border-[14px] border-teal-500 z-[1] border-b-transparent" />
            )}
            {book.cover ? (
              <img
                src={book.cover}
                alt={`${book.title}の表紙`}
                className="w-full rounded-lg"
                data-testid="book-cover"
              />
            ) : (
              <div className="w-full h-[230px] sm:h-96 xl:h-72 bg-gray-300 dark:bg-gray-400 rounded-lg flex flex-row-reverse justify-between p-3 md:p-4 select-none">
                <h3 className="font-bold dark:text-gray-800 text-2xl sm:text-3xl lg:text-4xl [writing-mode:vertical-rl]">
                  {book.title}
                </h3>
              </div>
            )}
            <div
              className="absolute inset-0 pointer-events-none rounded-lg"
              style={{
                background:
                  "linear-gradient(-90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 80%, rgba(255, 255, 255, 0.4) 94%, rgba(255, 255, 255, 0.5) 96%, rgba(255, 255, 255, 0) 100%)",
              }}
            />
          </div>
        </div>
        <div className="lg:w-2/3 flex flex-1 gap-4 flex-col items-center lg:items-start">
          <h2 className="text-3xl font-semibold text-center lg:text-left flex items-center gap-2" data-testid="title">
            {book.title}
          </h2>
          <div className="flex items-center gap-4">
            <Avatar className="size-10" data-testid="author-avatar">
              <AvatarImage
                src={book.user.imageUrl}
                alt={`${book.user.username}のプロフィール画像`}
                className="w-full rounded-lg object-cover"
              />
              <AvatarFallback>
                <UserIcon />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-medium" data-testid="author">
                {book.user.username}
              </p>
              <p className="text-sm text-gray-600">著者</p>
            </div>
          </div>
          <div className="w-full space-y-4">
            {book.category && (
              <div className="hidden md:block">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-50 mb-1 text-center lg:text-left">
                  カテゴリ
                </h3>
                <div
                  className="flex items-center gap-2 flex-wrap justify-center lg:justify-start"
                  data-testid="categories"
                >
                  <Button size={"sm"} className="rounded-full bg-teal-500 hover:bg-teal-600 transition-all" asChild>
                    <Link href={`/explore/${book.category.category}`}>
                      {categoryIcons[book.category.category]}
                      {book.category.label}
                    </Link>
                  </Button>
                </div>
              </div>
            )}
            <div className="hidden md:block">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-50 mb-1 text-center lg:text-left">
                発行年
              </h3>
              <div className="flex items-center gap-2 flex-wrap justify-center lg:justify-start">
                <FormatDate date={new Date(book.createdAt)} className="text-gray-500 text-sm" />
              </div>
            </div>
            <div className="w-full flex items-center gap-2">
              <Button
                className="flex-1 bg-teal-500 hover:bg-teal-600 transition-all"
                data-testid="read-book-button"
                asChild
              >
                <Link href={`/book/${book.slug}/read`}>本を読む</Link>
              </Button>
              <Button size={"icon"} variant={"outline"} onClick={() => handleLibrary(book.id, bookMarked, path)}>
                <BookmarkIcon className={cn(bookMarked && "fill-yellow-500 stroke-none")} />
              </Button>
              {user && user.id === book.userId && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size={"icon"} variant={"outline"}>
                      <EllipsisVerticalIcon />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-56 p-0" sideOffset={16}>
                    <DropdownMenuLabel className="px-4">操作</DropdownMenuLabel>
                    <DropdownMenuSeparator className="m-0" />
                    <DropdownMenuItem className="w-full px-4 h-10 cursor-pointer" asChild>
                      <Link href={`${url + path}/update`} className="items-center flex">
                        <PencilIcon />
                        編集
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>
        <div className="hidden md:flex flex-col gap-2 absolute -left-16">
          <Button variant={"outline"} size={"icon"} asChild>
            <XShare text={book.title} url={url + path} hashtags={["Shomotsu"]}>
              <XLogoIcon className="fill-gray-900 dark:fill-gray-50" />
            </XShare>
          </Button>
        </div>
      </div>
      <Card className="mb-6 p-6">
        <Tabs defaultValue="summary">
          <TabsList className="w-full">
            <TabsTrigger value="summary" data-testid="summary-trigger">
              あらすじ
            </TabsTrigger>
            <TabsTrigger disabled={!book.toc.length && true} value="toc" data-testid="toc-trigger">
              目次
            </TabsTrigger>
          </TabsList>
          <TabsContent value="summary">
            <p className="mb-8 text-gray-700 dark:text-gray-50 leading-relaxed" data-testid="summary">
              {book.description}
            </p>
            <div className="flex flex-col gap-4 md:hidden">
              {book.category && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-50 mb-1">カテゴリ</h3>
                  <div className="flex items-center gap-2 flex-wrap" data-testid="categories">
                    <Button size={"sm"} className="rounded-full bg-teal-500 hover:bg-teal-600 transition-all" asChild>
                      <Link href={`/explore/${book.category.category}`}>
                        {categoryIcons[book.category.category]}
                        {book.category.label}
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-50 mb-1">発行年</h3>
                <FormatDate date={new Date(book.createdAt)} className="text-gray-500 text-sm" />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="toc">
            <ScrollArea className="h-[200px]">
              <ul className="space-y-2" data-testid="toc">
                {book.toc.map((tocItem, i) => (
                  <li key={i}>
                    第{i + 1}章：{tocItem}
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </Card>
      <div className="flex md:hidden items-center gap-2">
        <Button variant={"outline"} size={"icon"} asChild>
          <XShare text={book.title} url={url + path} hashtags={["Shomotsu"]}>
            <XLogoIcon className="fill-gray-900 dark:fill-gray-50" />
          </XShare>
        </Button>
      </div>
    </div>
  );
};
