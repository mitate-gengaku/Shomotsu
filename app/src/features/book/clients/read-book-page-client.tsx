"use client"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkBreaks from "remark-breaks"
import rehypeSanitize from "rehype-sanitize"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AlignLeft, AlignRight, SettingsIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSubContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/utils/cn"
const generateContents = (content: string | null) => {
  if (!content) return []
  const arrayOfParsedContent = content.split("\n");
  const chapters: string[] = [];
  let tmp: string[] = [];

  for (let i = 0; i < arrayOfParsedContent.length; i++) {
    const parsedItem = arrayOfParsedContent[i]
    const next = arrayOfParsedContent[i + 1]

    tmp.push(parsedItem)

    if (next && next.startsWith("## ")) {
      chapters.push(tmp.join("\n"))

      tmp = [];
    } else if (i === arrayOfParsedContent.length - 1) {
      chapters.push(tmp.join("\n"))
    }
  }

  return chapters
}

interface Props {
  content: string | null
}

const fontSizeData: {value: 0 | 1 | 2, label: string}[] = [
  {
    value: 0,
    label: "小さい"
  },
  {
    value: 1,
    label: "中くらい"
  },
  {
    value: 2,
    label: "大きい"
  }
]

const colorData: {value: 0 | 1 | 2, color?: string}[] = [
  {
    value: 0,
    color: "bg-white text-gray-800 hover:[&:is(button)]:bg-gray-50"
  },
  {
    value: 1,
    color: "bg-[#ece5c8] text-gray-800 hover:[&:is(button)]:bg-[#f0e5b8]"
  },
  {
    value: 2,
    color: "bg-gray-800"
  }
]

export const ReadBookPageClient = ({ content }: Props) => {
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0)
  const [fontSize, setFontSize] = useState<0 | 1 | 2>(1);
  const [themeColor, setThemeColor] = useState<0 | 1 | 2>(0);

  const contents = generateContents(content)

  const onChangeFontSize = (size: 0 | 1 | 2) => {
    setFontSize(() => size)
  }

  const onChangeThemeColor = (color: 0 | 1 | 2) => {
    setThemeColor(() => color)
  }

  return (
    <div className={cn(
      "w-full",
      colorData[themeColor].color
    )}>
      <div
        className={cn("w-full lg:w-1/2 mx-auto px-4  pt-16 pb-12 relative")}
        data-testid="read-book-page"
      >
        <div className="w-full absolute top-2 right-4 flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
            >
              <Button
                variant={"ghost"}
                size={"icon"}
                className="ml-auto hover:bg-transparent text-muted-foreground focus-visible:ring-transparent hover:text-gray-400"
              >
                <SettingsIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 py-4">
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
                      "hover:!bg-teal-50",
                      fontSize === font.value && "[&_svg]:text-teal-500"
                    )}
                    >
                    {font.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-muted-foreground">
                フォントファミリー
              </DropdownMenuLabel>
              <DropdownMenuGroup className="p-2 flex flex-wrap justify-between gap-2">
                <Button 
                  className={cn(
                    "size-20 text-[10px] bg-white text-gray-800 hover:bg-gray-50",
                    true && "ring-teal-500 ring-2"
                  )}
                  >
                  Sans Serif
                </Button>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-muted-foreground">
                テーマカラー
              </DropdownMenuLabel>
              <DropdownMenuGroup className="p-2 flex flex-wrap justify-between gap-2">
                {colorData.map((color) => (
                  <Button 
                    key={color.value}
                    className={cn(
                      "size-20 text-[10px]",
                      color.color,
                      color.value === themeColor && "ring-2 ring-teal-500"
                    )}
                    onClick={() => onChangeThemeColor(color.value)}
                    >
                    みんなはまだ
                  </Button>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className={cn(
          "prose prose-sm md:prose-base max-w-none",
          fontSize === 0 && "!text-[0.75em]",
          fontSize === 2 && "!text-[1.5em]",
          themeColor === 2 && "prose-invert",
          )}>
          <h1>第{currentPageIndex + 1}章</h1>
          <ReactMarkdown
            remarkPlugins={[
              remarkGfm,
              remarkBreaks
            ]}
            rehypePlugins={[
              rehypeSanitize
            ]}
          >
            {contents[0]}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}