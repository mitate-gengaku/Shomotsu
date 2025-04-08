"use client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ListIcon,
  SettingsIcon,
} from "lucide-react";
import { Hachi_Maru_Pop } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/utils/cn";

const font = Hachi_Maru_Pop({
  weight: ["400"],
  subsets: ["latin"]
});

const generateContents = (content: string | null) => {
  if (!content) return [];
  const arrayOfParsedContent = content.split("\n");
  const chapters: string[] = [];
  let tmp: string[] = [];

  for (let i = 0; i < arrayOfParsedContent.length; i++) {
    const parsedItem = arrayOfParsedContent[i];
    const next = arrayOfParsedContent[i + 1];

    tmp.push(parsedItem);

    if (next && next.startsWith("## ")) {
      chapters.push(tmp.join("\n"));

      tmp = [];
    } else if (i === arrayOfParsedContent.length - 1) {
      chapters.push(tmp.join("\n"));
    }
  }

  return chapters;
};

interface Props {
  title: string;
  content: string | null;
  slug: string;
}

const fontSizeData: { value: number; label: string }[] = [
  {
    value: 0,
    label: "小さい",
  },
  {
    value: 1,
    label: "中くらい",
  },
  {
    value: 2,
    label: "大きい",
  },
];

const colorData: { value: number; color?: string; label: string }[] = [
  {
    value: 0,
    color: "bg-white text-gray-800 hover:[&:is(button)]:bg-gray-50",
    label: "デフォルト",
  },
  {
    value: 1,
    color: "bg-[#ece5c8] text-gray-800 hover:[&:is(button)]:bg-[#f0e5b8]",
    label: "淡い麦畑",
  },
  {
    value: 2,
    color: "bg-[#f9f8f6] text-gray-800 hover:[&:is(button)]:bg-gray-50",
    label: "ペーパー",
  },
  {
    value: 3,
    color: "bg-gray-800 dark:text-gray-50 dark:bg-slate-950 dark:hover:[&:is(button)]:bg-slate-800",
    label: "ダーク",
  },
  {
    value: 4,
    color: `${font.className} bg-pink-100 text-pink-400 hover:[&:is(button)]:bg-pink-200 font-semibold`,
    label: "ラブリー♡",
  },
];

export const ReadBookPageClient = ({ title, slug, content }: Props) => {
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [fontSize, setFontSize] = useState<number>(1);
  const [themeColor, setThemeColor] = useState<number>(0);

  const contents = generateContents(content);

  const onChangeFontSize = (size: number) => {
    setFontSize(() => size);
  };

  const onChangeThemeColor = (color: number) => {
    setThemeColor(() => color);
  };

  const onChangePage = (index: number) => {
    setCurrentPageIndex(() => {
      window.scrollTo({
        top: 0,
      });
      return index;
    });
  };

  const onClickPrevPage = () => {
    setCurrentPageIndex((index) => {
      if (index > 0) {
        window.scrollTo({
          top: 0,
        });

        return index - 1;
      }
      return 0;
    });
  };

  const onClickNextPage = () => {
    setCurrentPageIndex((index) => {
      if (index < contents.length - 1) {
        window.scrollTo({
          top: 0,
        });
        return index + 1;
      }
      return index;
    });
  };

  return (
    <div className={cn("w-full", colorData[themeColor].color)}>
      <div
        className={cn("w-full lg:w-1/2 mx-auto px-4 pt-16 pb-20 relative")}
        data-testid="read-book-page"
      >
        <div className="w-full absolute top-2 left-0 px-4 flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant={"ghost"}
                size={"icon"}
                className="ml-auto flex md:hidden hover:bg-transparent text-muted-foreground focus-visible:ring-transparent hover:text-gray-400"
              >
                <SettingsIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side={"bottom"}>
              <SheetHeader>
                <SheetTitle>設定</SheetTitle>
              </SheetHeader>
              <div className="py-8 space-y-6">
                <div className="space-y-1">
                  <h3>フォントサイズ</h3>
                  <div className="flex items-center gap-2">
                    {fontSizeData.map((font) => (
                      <Button
                        variant={"secondary"}
                        onClick={() => onChangeFontSize(font.value)}
                        key={font.label}
                        className={cn(
                          "hover:bg-slate-200 dark:hover:bg-slate-800",
                          fontSize === font.value && "ring-2 ring-teal-500",
                        )}
                      >
                        {font.label}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-1">
                  <h3>テーマ</h3>
                  <div className="p-2 grid grid-cols-5 gap-3.5">
                    {colorData.map((color) => (
                      <Button
                        key={color.value}
                        className={cn(
                          "size-16 text-[10px]",
                          color.color,
                          color.value === themeColor && "ring-2 ring-teal-500",
                        )}
                        onClick={() => onChangeThemeColor(color.value)}
                      >
                        {color.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={"ghost"}
                size={"icon"}
                className="ml-auto md:flex hidden hover:bg-transparent text-muted-foreground focus-visible:ring-transparent hover:text-gray-400"
              >
                <SettingsIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 py-4">
              <DropdownMenuLabel className="text-muted-foreground">
                フォントサイズ
              </DropdownMenuLabel>
              <DropdownMenuGroup>
                {fontSizeData.map((font) => (
                  <DropdownMenuCheckboxItem
                    checked={fontSize === font.value}
                    onCheckedChange={() => onChangeFontSize(font.value)}
                    key={font.label}
                    className={cn(
                      "hover:bg-teal-50 dark:hover:bg-slate-800",
                      fontSize === font.value && "[&_svg]:text-teal-500 ",
                    )}
                  >
                    {font.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-muted-foreground">
                テーマ
              </DropdownMenuLabel>
              <DropdownMenuGroup className="p-2 grid grid-cols-4 gap-3.5">
                {colorData.map((color) => (
                  <Button
                    key={color.value}
                    className={cn(
                      "size-16 text-[10px]",
                      color.color,
                      color.value === themeColor && "ring-2 ring-teal-500",
                    )}
                    onClick={() => onChangeThemeColor(color.value)}
                  >
                    {color.label}
                  </Button>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div
          className={cn(
            "prose prose-sm md:prose-base max-w-none font-medium",
            fontSize === 0 && "!text-[0.75em]",
            fontSize === 2 && "!text-[1.5em]",
            themeColor === 3 && "prose-invert",
            themeColor === 4 &&
              "prose-pink prose-a:text-pink-600 hover:prose-a:text-pink-700 transition-all prose-a:font-bold",
          )}
        >
          <p className="text-3xl lg:text-4xl font-bold">
            第{currentPageIndex + 1}章
          </p>
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkBreaks]}
            components={{
              // eslint-disable-next-line unused-imports/no-unused-vars
              a: ({ className, node, ...props }) => (
                <a
                  {...props}
                  className={cn("text-teal-600 hover:text-teal-500")}
                />
              ),
              // eslint-disable-next-line unused-imports/no-unused-vars
              img: ({ className, node, src, alt, ...props }) => (
                <img
                  {...props}
                  src={src}
                  alt={alt}
                  className={cn(className, "w-full h-80 object-cover")}
                />
              ),
            }}
            rehypePlugins={[rehypeSanitize]}
          >
            {contents[currentPageIndex]}
          </ReactMarkdown>
        </div>
        <div
          className={cn(
            "fixed left-0 bottom-0 w-full flex flex-col",
            colorData[themeColor].color,
          )}
        >
          <Progress
            value={((currentPageIndex + 1) / contents.length) * 100}
            className="[&>div]:bg-teal-500 rounded-none"
          />
          <div className="w-full lg:w-1/2 mx-auto px-4 h-12 flex justify-around items-center gap-8">
            <Button
              className="px-0 !bg-transparent border-transparent shadow-none text-teal-600 hover:text-teal-700 items-center"
              disabled={currentPageIndex === 0}
              onClick={() => onClickPrevPage()}
            >
              <ChevronLeftIcon />
              前の章へ
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="hover:bg-transparent text-muted-foreground focus-visible:ring-transparent hover:text-gray-400"
                >
                  <ListIcon />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>{title}</SheetTitle>
                  <SheetDescription>目次</SheetDescription>
                </SheetHeader>
                <div className="py-8 space-y-4">
                  <Link
                    href={`/book/${slug}`}
                    className="hover:text-teal-500 transition-all"
                  >
                    詳細ページに戻る
                  </Link>
                  <ul>
                    {contents.map((_, i) => (
                      <li
                        className={cn(
                          "p-2 rounded-md hover:bg-gray-50",
                          i === currentPageIndex && "text-teal-500",
                        )}
                        key={i}
                      >
                        <button onClick={() => onChangePage(i)}>
                          第{i + 1}章
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </SheetContent>
            </Sheet>
            <Button
              className="px-0 !bg-transparent border-transparent shadow-none text-teal-600 hover:text-teal-700 items-center"
              disabled={currentPageIndex === contents.length - 1}
              onClick={() => onClickNextPage()}
            >
              次の章へ
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
