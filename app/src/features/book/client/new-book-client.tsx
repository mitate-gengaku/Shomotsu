"use client"

import { BoltIcon, LogOutIcon, SparklesIcon, UserIcon, X } from "lucide-react";
import Link from "next/link";
import React, { useRef } from "react";

import Sidebar from "@/components/layout/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { userData } from "@/config/user-data";
import { cn } from "@/utils/cn";

const categories = [
  { value: "novel", label: "小説" },
  { value: "non-fiction", label: "ノンフィクション" },
  { value: "self-help", label: "自己啓発" },
  { value: "business", label: "ビジネス" },
  { value: "science", label: "科学" },
  { value: "history", label: "歴史" },
  { value: "biography", label: "伝記" },
  { value: "travel", label: "旅行" },
  { value: "cookbook", label: "料理" },
  { value: "children", label: "児童書" },
];

export const NewBookClient = () => {
  return (
    <section className="w-full lg:w-1/2 mx-auto h-full mb-8 md:pb-12 lg:mb-0 flex flex-col gap-4 md:gap-8" data-testid="new-book-page">
      <form className="w-full">
        <Card className="border-none shadow-none">
          <CardHeader className="px-0">
            <CardTitle className="font-semibold text-2xl lg:text-3xl">
              コンテンツを作成する
            </CardTitle>
            <CardDescription>アイデアを形にしましょう。</CardDescription>
          </CardHeader>
          <CardContent className="px-0 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm">
                タイトル
              </Label>
              <h2 className="text-xl lg:text-2xl font-semibold">{"銀河鉄道の夜"}</h2>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm">
                カテゴリ
              </Label>
              <Select >
                <SelectTrigger id="category" className="w-full bg-slate-50 data-[state=open]:ring-1 focus:ring-teal-500 data-[state=open]:ring-teal-500">
                  <SelectValue placeholder="カテゴリを選択してください" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value} className={cn(
                      "focus:bg-teal-50 [&_svg:not([class*='text-'])]:text-teal-500")}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cover" className="text-sm">
                表紙
              </Label>
              <div>
                <img
                  src={userData.avatar}
                  alt="表紙"
                  className="w-[100px] h-[150px] object-cover"
                />
              </div>
              <Input id="cover" type="file" className="bg-slate-50" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="content" className="text-sm">
                  コンテンツ
                </Label>
                <Button
                  variant={"outline"}
                  size={"icon"}
                  type="button"
                  className="size-7 [&_svg]:size-3"
                  >
                  <SparklesIcon />
                </Button>
              </div>
              <Textarea
                id="content"
                placeholder="本の内容を入力してください"
                
                className="bg-slate-50 focus-visible:ring-teal-500 min-h-[250px] resize-y"
              />
            </div>
            <div className="space-y-2">
              <div>
                <Label htmlFor="publish" className="text-sm">
                  公開
                </Label>
                <p className="text-xs text-muted-foreground">
                  公開すると検索エンジンにインデックスされ、サイト内の投稿一覧にも表示されます
                </p>
              </div>
              <Switch id="publish" className="data-[state=checked]:bg-teal-500 transition-all" />
            </div>
          </CardContent>
          <CardFooter className="px-0">
            <div className="w-full flex items-center justify-end gap-2">
              <Button className="bg-teal-500 hover:bg-teal-600 transition-all">本を作成</Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </section>
  );
};