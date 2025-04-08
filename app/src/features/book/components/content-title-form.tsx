"use client";

import {
  getFormProps,
  getInputProps,
  useForm,
  useInputControl,
} from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { useSetAtom } from "jotai";
import { SendIcon } from "lucide-react";
import { ChangeEvent, useActionState, useState } from "react";

import { Spinner } from "@/components/loading/spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { create } from "@/features/book/actions/create";
import { TitleType } from "@/features/book/components/new-book-form";
import { titleSchema } from "@/features/book/schema/title";
import { confettiAtom } from "@/stores/confetti";
import { cn } from "@/utils/cn";

export const ContentTitleForm = () => {
  const [data, setData] = useState<{ title?: string; slug?: string }>({
    title: undefined,
    slug: undefined,
  });
  const setConfetti = useSetAtom(confettiAtom);
  const [lastResult, action, isPending] = useActionState(create, undefined);
  const [form, fields] = useForm<TitleType>({
    lastResult,
    constraint: getZodConstraint(titleSchema),
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: titleSchema });
    },
    onSubmit: () => {
      setConfetti(true);
    },
    defaultValue: {
      title: data.title,
      slug: data.slug,
    },
  });
  const titleControl = useInputControl(fields.title);
  const slugControl = useInputControl(fields.slug);

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setData({
      ...data,
      title: value,
    });
    titleControl.change(value);
  };

  const onChangeSlug = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setData({
      ...data,
      slug: value,
    });
    slugControl.change(value);
  };

  return (
    <form
      {...getFormProps(form)}
      action={action}
      data-testid="content-title-form"
    >
      <Card>
        <CardContent className="flex flex-col gap-2">
          <div className="space-y-1">
            <Label className="mb-1 text-xs text-gray-600" htmlFor="title">
              本のタイトル
            </Label>
            <div className="relative">
              <Input
                {...getInputProps(fields.title, {
                  type: "text",
                })}
                key={fields.title.key}
                className={cn(
                  "h-11 pr-14 focus-visible:ring-teal-500",
                  fields.title.errors &&
                    "bg-red-50 text-red-500 focus-visible:ring-red-500 border-red-500",
                )}
                defaultValue={data.title}
                onChange={onChangeTitle}
                placeholder="銀河鉄道の夜"
                disabled={isPending}
                data-testid="input"
              />
              <Button
                size="icon"
                className={cn(
                  "bg-teal-500 hover:bg-teal-600 transition-all absolute z-[1] top-1 right-2",
                  fields.title.errors && "bg-red-500 hover:bg-red-600",
                )}
                disabled={isPending}
                data-testid="submit-button"
              >
                {isPending ? <Spinner className="text-white" /> : <SendIcon />}
              </Button>
            </div>
            {fields.title.errors && (
              <p data-testid="error-message" className="text-red-500 text-xs">
                {fields.title.errors}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <div className="flex flex-col">
              <Label className="mb-1 text-xs text-gray-600" htmlFor="slug">
                スラグ
              </Label>
              <Input
                {...getInputProps(fields.slug, {
                  type: "text",
                })}
                key={fields.slug.key}
                className={cn(
                  "text-xs focus-visible:ring-teal-500",
                  fields.slug.errors &&
                    "bg-red-50 text-red-500 focus-visible:ring-red-500 border-red-500",
                )}
                defaultValue={data.slug}
                onChange={onChangeSlug}
                placeholder="test-book"
                disabled={isPending}
                data-testid="input"
              />
            </div>
            {fields.slug.errors && (
              <p data-testid="error-message" className="text-red-500 text-xs">
                {fields.slug.errors}
              </p>
            )}
          </div>
          {form.errors && <p className="text-xs text-red-500">{form.errors}</p>}
        </CardContent>
      </Card>
    </form>
  );
};
