"use client";

import {
  getFormProps,
  getInputProps,
  getTextareaProps,
  useForm,
} from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { useAtomValue, useSetAtom } from "jotai";
import { SparklesIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useActionState, useEffect, useState } from "react";
import { z } from "zod";

import { Spinner } from "@/components/loading/spinner";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { categories } from "@/config/categories";
import { create } from "@/features/book/actions/create";
import { contentSchema } from "@/features/book/schema/content";
import { confettiAtom } from "@/stores/confetti";
import { titleAtom } from "@/stores/title";
import { cn } from "@/utils/cn";
import { titleSchema } from "@/features/book/schema/title";

export type ContentType = z.infer<typeof contentSchema>;
export type TitleType = z.infer<typeof titleSchema>

export const NewBookForm = () => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const title = useAtomValue(titleAtom);
  const setConfetti = useSetAtom(confettiAtom);
  const router = useRouter();
  const [lastResult, action, isPending] = useActionState(create, undefined);
  const [form, fields] = useForm<ContentType>({
    lastResult,
    constraint: getZodConstraint(contentSchema),
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: contentSchema });
    },
    shouldValidate: "onInput",
    onSubmit: () => {
      setConfetti(true);
    },
  });

  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;

    const file = files[0];

    setFile(file);
  };

  useEffect(() => {
    if (!title || !title.length) return;
  }, [title]);

  return (
    <form {...getFormProps(form)} className="w-full" action={action}>
      <Card className="py-0 border-none shadow-none">
        <CardHeader className="px-0">
          <CardTitle className="text-lg lg:text-2xl">
            コンテンツを作成する
          </CardTitle>
          <CardDescription>アイデアを形にしましょう。</CardDescription>
          {form.errors && (
            <p className="text-xs text-red-500">{form.errors}</p>
          )}
        </CardHeader>
        <CardContent className="px-0 space-y-6">
          <div className="space-y-1">
            {title ? (
              <>
                <p className="text-sm font-semibold">タイトル</p>
                <h2 className="text-3xl font-semibold">{title}</h2>
                <input
                  {...getInputProps(fields.title, { type: "hidden" })}
                  key={fields.title.key}
                  value={title}
                />
              </>
            ) : (
              <>
                <Label htmlFor={fields.title.id} className="text-sm w-fit">
                  タイトル<span className="text-red-500">*</span>
                </Label>
                <Input
                  {...getInputProps(fields.title, { type: "text" })}
                  key={fields.title.key}
                  className={cn(
                    "text-sm bg-slate-50",
                    fields.title.errors &&
                      "border-red-500 bg-red-50 focus-visible:ring-red-500",
                    !fields.title.errors && "focus-visible:ring-teal-500",
                  )}
                  placeholder="銀河鉄道の夜"
                  disabled={isPending}
                />
                {fields.title.errors && (
                  <p className="text-red-500 text-xs">{fields.title.errors}</p>
                )}
              </>
            )}
          </div>

          <div className="space-y-2">
            <div>
              <Label htmlFor={fields.title.id} className="text-sm w-fit">
                スラグ<span className="text-red-500">*</span>
              </Label>
              <p className="text-xs text-muted-foreground">
                ※「/book/スラグ」と表示されます
              </p>
            </div>
            <Input
              {...getInputProps(fields.slug, { type: "text" })}
              key={fields.slug.key}
              className={cn(
                "text-sm bg-slate-50",
                fields.slug.errors &&
                  "border-red-500 bg-red-50 focus-visible:ring-red-500",
                !fields.slug.errors && "focus-visible:ring-teal-500",
              )}
              placeholder="test-book-slug"
              disabled={isPending}
            />
            {fields.slug.errors && (
              <p className="text-red-500 text-xs">{fields.slug.errors}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="description" className="text-sm">
              内容紹介<span className="text-red-500">*</span>
            </Label>
            <Textarea
              {...getTextareaProps(fields.description)}
              key={fields.description.key}
              placeholder="内容紹介を入力してください"
              disabled={isPending}
              className={cn(
                "text-sm bg-slate-50 min-h-28 resize-none",
                fields.description.errors &&
                  "border-red-500 bg-red-50 focus-visible:ring-red-500 focus-visible:border-red-500 focus-visible:ring-1",
                !fields.description.errors &&
                  "focus-visible:border-teal-500 focus-visible:ring-teal-500",
              )}
            />
            {fields.description.errors && (
              <p className="text-red-500 text-xs">{fields.description.errors}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="category" className="text-sm w-fit">
              カテゴリ<span className="text-red-500">*</span>
            </Label>
            <Select
              name={fields.category.name}
              key={fields.category.key}
              defaultValue={fields.category.initialValue as string}
              onValueChange={(value) => {
                form.update({
                  name: fields.category.name,
                  value,
                });
              }}
            >
              <SelectTrigger
                key={`${fields.category.key}-trigger`}
                id={fields.category.id}
                className={cn(
                  "text-sm w-full bg-slate-50",
                  fields.category.errors &&
                    "border-red-500 bg-red-50 focus-visible:ring-red-500",
                  !fields.category.errors &&
                    "data-[state=open]:ring-1 focus:ring-teal-500 data-[state=open]:ring-teal-500",
                )}
                disabled={isPending}
              >
                <SelectValue placeholder="カテゴリを選択してください" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem
                    key={cat.category}
                    value={cat.category}
                    className={cn(
                      "focus:bg-teal-50 [&_svg:not([class*='text-'])]:text-teal-500",
                      fields.category.errors && "focus:bg-red-50",
                    )}
                  >
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fields.category.errors && (
              <p className="text-red-500 text-xs">{fields.category.errors}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="cover" className="text-sm w-fit">
              表紙<span className="text-red-500">*</span>
            </Label>
            {file && (
              <div>
                <img
                  src={URL.createObjectURL(file)}
                  alt="表紙"
                  className="w-[150px] object-fit"
                />
              </div>
            )}
            <input
              {...getInputProps(fields.cover, { type: "hidden" })}
              key={fields.cover.key}
              defaultValue={"https://placehold.co/100x150"}
              />
            {/*<Input
              {...getInputProps(fields.cover, { type: "text" })}
              key={fields.cover.key}
              className={cn(
                "text-sm bg-slate-50",
                fields.cover.errors && "bg-red-50 border-red-500",
                !fields.cover.errors &&
                  "focus:ring-1 focus:ring-teal-500 focus-visible:ring-1 focus-visible:ring-teal-500",
              )}
              type="file"
              accept=".png,.jpg"
              multiple={false}
              onChange={onChangeFile}
              disabled={isPending}
              data-testid="cover-file-input"
            />*/}
            {fields.cover.errors && (
              <p className="text-red-500 text-xs">{fields.cover.errors}</p>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="content" className="text-sm">
                コンテンツ<span className="text-red-500">*</span>
              </Label>
              {(title || fields.title.value) && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant={"outline"}
                      size={"icon"}
                      type="button"
                      className="size-7 [&_svg]:size-3"
                    >
                      <SparklesIcon />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-56 p-2 relative"
                    align="end"
                  >
                    <div className="flex w-56 h-full absolute left-0 top-0 z-[999] inset-0 items-center justify-center bg-background/60 backdrop-blur-sm">
                      <p className="text-sm">AIサポート機能開発中…🚀</p>
                    </div>
                    <DropdownMenuLabel asChild>
                      <h3>AIによる執筆サポート</h3>
                    </DropdownMenuLabel>
                    <DropdownMenuLabel
                      className="text-xs text-muted-foreground py-0"
                      asChild
                    >
                      <p>章タイトルを生成します</p>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <form className="px-1 space-y-1">
                      <div>
                        <Label className="text-xs text-muted-foreground font-medium">
                          章タイトル数
                        </Label>
                        <Select>
                          <SelectTrigger
                            className="bg-slate-50 rounded-sm h-8 px-2 text-xs w-full focus:ring-transparent focus-visible:ring-transparent"
                            disabled
                          >
                            <SelectValue placeholder="Theme" />
                          </SelectTrigger>
                          <SelectContent>
                            {[...new Array(15)].map((_: undefined, index) => (
                              <SelectItem
                                key={(index + 1).toString()}
                                value={(index + 1).toString()}
                                className="text-xs focus:bg-teal-50 [&_svg:not([class*='text-'])]:text-teal-500"
                              >
                                {index + 1}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground font-medium">
                          要望
                        </Label>
                        <Textarea
                          className={cn(
                            "bg-slate-50 p-2 rounded-sm text-xs md:text-xs focus-visible:ring-teal-500 resize-none",
                          )}
                          disabled
                          placeholder={`JavaScriptの技術本`}
                        />
                      </div>
                      <div className="flex items-center justify-end">
                        <Button
                          size={"sm"}
                          className="bg-teal-500 hover:bg-teal-600"
                          disabled
                        >
                          送信
                        </Button>
                      </div>
                    </form>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            <Textarea
              {...getTextareaProps(fields.content)}
              key={fields.content.key}
              placeholder="本のコンテンツを入力してください"
              disabled={isPending}
              className={cn(
                "text-sm bg-slate-50 focus-visible:ring-teal-500 min-h-[250px] resize-y",
                fields.content.errors &&
                  "border-red-500 bg-red-50 focus-visible:ring-red-500 focus-visible:border-red-500 focus-visible:ring-1",
                !fields.content.errors &&
                  "focus-visible:border-teal-500 focus-visible:ring-teal-500",
              )}
            />
            {fields.content.errors && (
              <p className="text-red-500 text-xs">{fields.content.errors}</p>
            )}
          </div>
          <div className="space-y-2">
            <div>
              <Label htmlFor={fields.publish.id} className="text-sm w-fit">
                公開
              </Label>
              <p className="text-xs text-muted-foreground">
                ※公開すると検索エンジンにインデックスされ、サイト内の投稿一覧にも表示されます
              </p>
            </div>
            <Switch
              key={fields.publish.key}
              id={fields.publish.id}
              name={fields.publish.name}
              required={fields.publish.required}
              defaultChecked={fields.publish.initialValue === "on"}
              aria-invalid={!fields.publish.valid || undefined}
              aria-describedby={
                !fields.publish.valid ? fields.publish.errorId : undefined
              }
              disabled={isPending}
              className="data-[state=checked]:bg-teal-500"
              onCheckedChange={(checked) => {
                form.update({
                  name: fields.publish.name,
                  value: checked,
                });
              }}
            />
            {fields.publish.errors && (
              <p className="text-red-500 text-xs">{fields.publish.errors}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="px-0">
          <div className="w-full flex items-center justify-end gap-2">
            <Button
              variant={"secondary"}
              type="button"
              disabled={isPending}
              onClick={() => router.back()}
            >
              キャンセル
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-teal-500 hover:bg-teal-600 transition-all"
            >
              {isPending ? (
                <Spinner className="text-white" />
              ) : (
                "コンテンツを作成"
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
};
