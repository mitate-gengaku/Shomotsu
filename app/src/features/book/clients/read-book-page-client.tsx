"use client";
import { useAtom } from "jotai";
import { ChevronLeftIcon, ChevronRightIcon, ListIcon, SettingsIcon } from "lucide-react";
import { Hachi_Maru_Pop } from "next/font/google";
import Link from "next/link";
import { Suspense, useRef, useState, WheelEvent } from "react";
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
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { generateContents } from "@/features/book/utils/generate-contents";
import { makimonoAtom } from "@/stores/makimono";
import { cn } from "@/utils/cn";

const font = Hachi_Maru_Pop({
  weight: ["400"],
  subsets: ["latin"],
});

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

  const [wheel, setWheel] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);

  const readRef = useRef<HTMLDivElement>(null);

  const contentRef = useRef<HTMLDivElement>(null);

  const [isMakinomoView, setMakimonoView] = useAtom(makimonoAtom);

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
        readRef.current?.scrollIntoView();
        return index - 1;
      }
      return 0;
    });
  };

  const onClickNextPage = () => {
    setCurrentPageIndex((index) => {
      if (index < contents.length - 1) {
        readRef.current?.scrollIntoView();
        return index + 1;
      }
      return index;
    });
  };

  const onWheel = (e: WheelEvent<HTMLDivElement>) => {
    const container = contentRef.current;
    if (!container) return;

    setWheel((prev) => {
      const prevValue = Math.floor(prev);
      const deltaY = Math.floor(e.deltaY);
      const result = prevValue + deltaY;

      if (result > container.clientWidth) {
        return prevValue + (container.clientWidth - prevValue);
      }

      if (result < 0) {
        return 0;
      }

      setWidth((result / container.clientWidth) * 100);

      return result;
    });
  };

  const setMakimonoViewCheck = (checked: boolean) => {
    setMakimonoView(checked);
  };

  if (isMakinomoView) {
    return (
      <div
        className="w-screen h-screen px-12 flex justify-start items-center overflow-x-hidden relative"
        onWheel={onWheel}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"ghost"}
              size={"icon"}
              className="flex absolute top-2 right-8 lg:right-[calc(25%+28px)] hover:bg-transparent text-muted-foreground focus-visible:ring-transparent hover:text-gray-400"
            >
              <SettingsIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 py-4">
            <DropdownMenuLabel className="text-muted-foreground">巻物</DropdownMenuLabel>
            <DropdownMenuGroup>
              <div className="px-2">
                <Switch
                  checked={isMakinomoView}
                  onCheckedChange={setMakimonoViewCheck}
                  className="data-[state=checked]:bg-teal-500"
                />
              </div>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <Suspense>
          <div className="z-10 fixed left-8 flex items-center justify-center">
            <div
              className="[transform-style:preserve-3d] [transition-duration:800ms;]"
              style={{
                transform: `perspective(1000px) rotateY(-${wheel / 10}deg)`,
              }}
            >
              {[...new Array(32)].map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "w-8 h-[600px] absolute block px-[10px] [transform-style:preserve-3d]",
                    // "[background:url('https://images.unsplash.com/photo-1742845918430-c6093f93f740?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')_no-repeat;]",
                  )}
                  style={{
                    transform: `translate(-50%, -50%) rotateY(${i * 11.25}deg) translateZ(152px)`,
                    background: `url(${new URL("http://localhost:3000/view.png")}) no-repeat`,
                    backgroundPositionX: `${i * -31}px`,
                  }}
                />
              ))}
            </div>
          </div>
          <div
            className="absolute left-[9rem] w-8 h-[87%] z-[9] shadow-2xl"
            style={{
              boxShadow: `48px 0 64px -2px #000000`,
            }}
          />
        </Suspense>
        <div
          className="absolute right-full h-[81%] border shadow-xl p-4 bg-green-800 [transition-duration:800ms;]"
          style={{
            transform: `translateX(${wheel - 200}px)`,
          }}
        >
          <div className="w-full h-full bg-white dark:bg-slate-950 flex flex-row-reverse">
            <div
              className={cn(
                "w-full py-3.5 prose dark:prose-invert max-w-none pl-[456px] pr-4 font-medium flex flex-row-reverse [&>*]:[writing-mode:vertical-rl]",
                "text-base",
                "[&>*]:my-0 [&>*]:mx-2 [&>*]:indent-4 prose-li:indent-0 prose-ol:pt-1 prose-ol:indent-0 prose-ul:indent-0 prose-img:my-0",
                // img
                "prose-img:h-full",
                // ol
                "prose-ol:list-none prose-ol:ml-0 prose-li:[counter-increment:custom] [&_ol>li:before]:text-gray-400 [&_ol>li:before]:[content:counter(custom)_'_'] [&_ol>li:before]:mb-2 [&_ol>li:before]:[text-combine-upright:all] [&_ol>li:first-child]:[counter-reset:custom]",
              )}
              ref={contentRef}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]} rehypePlugins={[rehypeSanitize]}>
                {content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full h-full", colorData[themeColor].color)} data-testid="read-book-page">
      <div className="sr-only" ref={readRef} />
      <div className={cn("w-full xl:w-1/2 mx-auto px-4 pt-16 pb-20 relative min-h-screen h-full")}>
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
                <div className="px-2">
                  <h3>巻物形式</h3>
                  <Switch
                    checked={isMakinomoView}
                    onCheckedChange={setMakimonoViewCheck}
                    className="data-[state=checked]:bg-teal-500"
                  />
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
              <DropdownMenuLabel className="text-muted-foreground">フォントサイズ</DropdownMenuLabel>
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
              <DropdownMenuLabel className="text-muted-foreground">テーマ</DropdownMenuLabel>
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
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-muted-foreground">巻物形式</DropdownMenuLabel>
              <DropdownMenuGroup>
                <div className="px-2">
                  <Switch
                    checked={isMakinomoView}
                    onCheckedChange={setMakimonoViewCheck}
                    className="data-[state=checked]:bg-teal-500"
                  />
                </div>
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
          <p className="text-3xl lg:text-4xl font-bold">第{currentPageIndex + 1}章</p>
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkBreaks]}
            components={{
              // eslint-disable-next-line unused-imports/no-unused-vars
              a: ({ className, node, ...props }) => (
                <a {...props} className={cn("text-teal-600 hover:text-teal-500")} />
              ),
              // eslint-disable-next-line unused-imports/no-unused-vars
              img: ({ className, node, src, alt, ...props }) => (
                <img {...props} src={src} alt={alt} className={cn(className, "w-full h-80 object-cover")} />
              ),
            }}
            rehypePlugins={[rehypeSanitize]}
          >
            {contents[currentPageIndex]}
          </ReactMarkdown>
        </div>
        <div
          className={cn(
            "fixed left-0 bottom-0 w-[calc(100%-4px)] xl:w-[calc(100%-12px)] flex flex-col",
            colorData[themeColor].color,
          )}
        >
          <Progress
            value={currentPageIndex === contents.length - 1 ? 100 : (currentPageIndex / contents.length) * 100}
            className="[&>div]:bg-teal-500 rounded-none"
          />
          <div className="w-full xl:w-1/2 mx-auto px-4 h-12 flex justify-around items-center gap-8">
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
                  className="flex hover:bg-transparent text-muted-foreground focus-visible:ring-transparent hover:text-gray-400"
                >
                  <ListIcon />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader className="text-left">
                  <SheetTitle>{title}</SheetTitle>
                  <SheetDescription>目次</SheetDescription>
                </SheetHeader>
                <div className="py-8 space-y-4">
                  <Link href={`/book/${slug}`} className="hover:text-teal-500 transition-all">
                    詳細ページに戻る
                  </Link>
                  <ul>
                    {contents.map((_, i) => (
                      <li
                        className={cn("rounded-md hover:bg-gray-50", i === currentPageIndex && "text-teal-500")}
                        key={i}
                      >
                        <button onClick={() => onChangePage(i)} className="w-full p-2 text-left">
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
