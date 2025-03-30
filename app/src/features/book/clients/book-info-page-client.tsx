"use client";

import {
  BookmarkIcon,
  CpuIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  EyeOffIcon,
  UserIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { useDebouncedCallback } from "use-debounce";

import { FormatDate } from "@/components/format/date";
import { XLogoIcon } from "@/components/icon/x";
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
import { CopyButton } from "@/components/utils/copy-button";
import { XShare } from "@/components/utils/x-share";
import { addLibrary } from "@/features/book/services/add-library";
import { BookWithAllRelations } from "@/types/book";
import { cn } from "@/utils/cn";

interface Props {
  book: BookWithAllRelations;
  bookMarked: boolean;
  url: string;
}

export const BookInfoPageClient = ({ book, bookMarked, url }: Props) => {
  const path = usePathname();

  const onAddLibrary = async (
    bookId: string,
    bookMarked: boolean,
    slug: string,
  ) => {
    try {
      await addLibrary(bookId, bookMarked, slug);
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
    <div
      className="w-full lg:w-1/2 mx-auto relative"
      data-testid="book-detail-page"
    >
      <div className="mb-8 flex items-center justify-between">
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
      </div>
      <div className="flex flex-col lg:flex-row items-ceter gap-8 lg:gap-2 mb-6">
        <div className="lg:w-1/3">
          <div
            className="w-2/5 mx-auto lg:w-4/5 lg:mx-0 rounded-lg shadow-lg relative"
            style={{
              boxShadow:
                "10px 15px 22px -5px rgba(0, 0, 0, 0.2), 2px 4px 6px rgba(0, 0, 0, 0.15)",
            }}
          >
            {bookMarked && (
              <span className="absolute h-24 left-5 border-[14px] border-teal-500 z-[1] border-b-transparent" />
            )}
            <img
              src={book.cover}
              alt={`${book.title}の表紙`}
              className="w-full rounded-lg"
              data-testid="book-cover"
            />
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
          <h2
            className="text-3xl font-semibold text-center lg:text-left flex items-center gap-2"
            data-testid="title"
          >
            {book.title}
          </h2>
          <div className="flex items-center gap-4">
            <Avatar className="size-10" data-testid="author-avatar">
              <AvatarImage
                src={book.user.imageUrl}
                alt={`${book.user.name}のプロフィール画像`}
                className="w-full rounded-lg object-cover"
              />
              <AvatarFallback>
                <UserIcon />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-medium" data-testid="author">
                {book.user.name}
              </p>
              <p className="text-sm text-gray-600">著者</p>
            </div>
          </div>
          <div className="w-full space-y-4">
            <div className="hidden md:block">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-50 mb-1 text-center lg:text-left">
                カテゴリ
              </h3>
              <div
                className="flex items-center gap-2 flex-wrap justify-center lg:justify-start"
                data-testid="categories"
              >
                <Button
                  size={"sm"}
                  className="rounded-full bg-teal-500 hover:bg-teal-600 transition-all"
                >
                  <CpuIcon />
                  {book.category.label}
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-50 mb-1 text-center lg:text-left">
                発行年
              </h3>
              <div className="flex items-center gap-2 flex-wrap justify-center lg:justify-start">
                <FormatDate
                  date={new Date(book.createdAt)}
                  className="text-gray-500 text-sm"
                />
              </div>
            </div>
            <div className="w-full flex items-center gap-2">
              <Button
                className="flex-1 bg-teal-500 hover:bg-teal-600 transition-all"
                data-testid="read-book-button"
              >
                本を読む
              </Button>
              <Button
                size={"icon"}
                variant={"outline"}
                onClick={() => handleLibrary(book.id, bookMarked, path)}
              >
                <BookmarkIcon
                  className={cn(bookMarked && "fill-yellow-500 stroke-none")}
                />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size={"icon"} variant={"outline"}>
                    <EllipsisVerticalIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="min-w-56 p-0"
                  sideOffset={16}
                >
                  <DropdownMenuLabel className="px-4">共有</DropdownMenuLabel>
                  <DropdownMenuSeparator className="m-0" />
                  <DropdownMenuItem
                    className="w-full px-4 h-12 cursor-pointer"
                    asChild
                  >
                    <CopyButton copyText={`${url + path}`} />
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="w-full px-4 h-12 cursor-pointer gap-1"
                    asChild
                  >
                    <XShare
                      text={book.title}
                      url={url + path}
                      hashtags={["Shomotsu"]}
                    >
                      <XLogoIcon />
                      にポスト
                    </XShare>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
      <Card className="mb-6 p-6">
        <Tabs defaultValue="summary">
          <TabsList className="w-full">
            <TabsTrigger value="summary" data-testid="summary-trigger">
              あらすじ
            </TabsTrigger>
            <TabsTrigger value="toc" data-testid="toc-trigger">
              目次
            </TabsTrigger>
          </TabsList>
          <TabsContent value="summary">
            <p
              className="mb-8 text-gray-700 dark:text-gray-50 leading-relaxed"
              data-testid="summary"
            >
              そしてだんだん十字架は窓の正面に来ました。私は大学へはいっていて言いました。僕はほんとうにカムパネルラといつまでもいっしょに行こうねえジョバンニがこう言いながらふりかえって見ていると考えます。ジョバンニはおじぎをすると扉をあけておいてそこへ播かないとはえないんです。ジョバンニは思わずかけよって博士の前に立っているなど、とてももう腸もちぎれるようでした。
            </p>
            <div className="flex flex-col gap-4 md:hidden">
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-50 mb-1">
                  カテゴリ
                </h3>
                <div
                  className="flex items-center gap-2 flex-wrap"
                  data-testid="categories"
                >
                  <Button
                    size={"sm"}
                    className="rounded-full bg-teal-500 hover:bg-teal-600 transition-all"
                  >
                    <CpuIcon />
                    {book.category.label}
                  </Button>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-50 mb-1">
                  発行年
                </h3>
                <FormatDate
                  date={new Date(book.createdAt)}
                  className="text-gray-500 text-sm"
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="toc">
            <ScrollArea className="h-[200px]">
              <ul className="space-y-2" data-testid="toc">
                <li>第1章：AI技術の現状と展望</li>
                <li>第2章：教育分野におけるAI活用</li>
                <li>第3章：医療・ヘルスケアの革新</li>
                <li>第4章：スマートシティと交通システム</li>
                <li>第5章：環境問題とAIソリューション</li>
                <li>第6章：倫理的な課題と対応</li>
              </ul>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};
