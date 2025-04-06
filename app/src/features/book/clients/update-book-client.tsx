"use client";

import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import React, { useActionState, useState } from "react";

import { Spinner } from "@/components/loading/spinner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { updateBookAction } from "@/features/book/actions/update-book-action";
import { updateContentSchema } from "@/features/book/schema/update-content";
import { UpdateContentType } from "@/features/book/types/content";
import { BookWithAllRelations } from "@/types/book";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/utils/cn";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/config/categories";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
  book: BookWithAllRelations;
}

export const UpdateBookPageClient = ({ book }: Props) => {
  const [data, setData] = useState({
    description: book.description,
    category: book.category,
    publish: book.publish
  })
  const [checked, setChecked] = useState<boolean>(book.publish);
  const [lastResult, action, isPending] = useActionState(
    updateBookAction,
    undefined,
  );

  const [form, fields] = useForm<UpdateContentType>({
    lastResult,
    constraint: getZodConstraint(updateContentSchema),
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: updateContentSchema });
    },
    defaultValue: {
      bookId: "",
      slug: "",
      publish: false,
    },
  });

  return (
    <div
      className="w-full lg:w-1/2 mx-auto relative"
      data-testid="update-book-page"
    >
      <Card className="p-6 gap-0">
        <h3 className="text-xl lg:text-2xl font-semibold">{book.title}</h3>
        <form {...getFormProps(form)} action={action} className="space-y-6">
          <input
            {...getInputProps(fields.bookId, { type: "hidden" })}
            key={fields.bookId.key}
            defaultValue={book.id}
          />
          <input
            {...getInputProps(fields.slug, { type: "hidden" })}
            key={fields.slug.key}
            defaultValue={book.slug}
          />
          <Tabs defaultValue="content">
            <TabsList>
              <TabsTrigger value="content">
                コンテンツ入力
              </TabsTrigger>
              <TabsTrigger value="information">
                本の情報
              </TabsTrigger>
            </TabsList>
            <TabsContent value="content"></TabsContent>
            <TabsContent value="information">
              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="description" className="text-xs text-muted-foreground">
                    内容紹介
                  </Label>
                  <Textarea
                    // {...getTextareaProps(fields.description)}
                    // key={fields.description.key}
                    placeholder="ジョバンニは、いつから乗っていながら、まるであんな女の子とばかり談しているのでした。すると耳に手をあげました。"
                    disabled={isPending}
                    className={cn(
                      "text-sm bg-slate-50 min-h-28 resize-none",
                      /*fields.description.errors &&
                        "border-red-500 bg-red-50 focus-visible:ring-red-500 focus-visible:border-red-500 focus-visible:ring-1",
                      !fields.description.errors &&
                        "focus-visible:border-teal-500 focus-visible:ring-teal-500",*/
                    )}
                    />
                </div>
              <div className="space-y-1">
                <Label htmlFor="category" className="text-xs text-muted-foreground">
                  カテゴリ
                </Label>
                <Select
                  /*name={fields.category.name}
                  key={fields.category.key}
                  defaultValue={fields.category.initialValue as string}
                  onValueChange={(value) => {
                    form.update({
                      name: fields.category.name,
                      value,
                    });
                  }}*/
                >
                  <SelectTrigger
                    // key={`${fields.category.key}-trigger`}
                    // id={fields.category.id}
                    className={cn(
                      "text-sm w-full bg-slate-50",
                      /*fields.category.errors &&
                        "border-red-500 bg-red-50 focus-visible:ring-red-500",
                      !fields.category.errors &&
                        "data-[state=open]:ring-1 focus:ring-teal-500 data-[state=open]:ring-teal-500",*/
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
                          // fields.category.errors && "focus:bg-red-50",
                        )}
                      >
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/*fields.category.errors && (
                  <p className="text-red-500 text-xs">{fields.category.errors}</p>
                )*/}
              </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-xs text-muted-foreground">公開</Label>
                  <Switch
                    key={fields.publish.key}
                    id={fields.publish.id}
                    name={fields.publish.name}
                    required={fields.publish.required}
                    aria-invalid={!fields.publish.valid || undefined}
                    aria-describedby={
                      !fields.publish.valid ? fields.publish.errorId : undefined
                    }
                    className="data-[state=checked]:bg-teal-500"
                    checked={checked}
                    onCheckedChange={(checked) => {
                      form.update({
                        name: fields.publish.name,
                        value: checked,
                      });
                      setChecked(checked);
                    }}
                    disabled={isPending}
                  />
                  {fields.publish.errors && (
                    <p className="text-red-500 text-xs">{fields.publish.errors}</p>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <Button
            className="bg-teal-500 hover:bg-teal-600 transition-all"
            disabled={isPending}
            type={"submit"}
          >
            {isPending ? <Spinner className="text-white" /> : "更新"}
          </Button>
        </form>
      </Card>
    </div>
  );
};
