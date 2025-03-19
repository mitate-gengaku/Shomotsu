"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSetAtom } from "jotai";
import { SendIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { Spinner } from "@/components/loading/spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { titleSchema } from "@/features/book/schema/title";
import { titleAtom } from "@/stores/title";
import { cn } from "@/utils/cn";

export const ContentTitleForm = () => {
  const router = useRouter();
  const setTitle = useSetAtom(titleAtom);
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ title: string }>({
    defaultValues: {
      title: "",
    },
    resolver: zodResolver(titleSchema),
  });

  const onSubmit = handleSubmit((data) => {
    startTransition(() => {
      setTitle(data.title);
      router.push(`/new`);
    });
  });

  return (
    <form
      id="content-title-form"
      data-id="content-title-form"
      onSubmit={onSubmit}
    >
      <Card>
        <CardContent className="flex flex-col">
          <Label className="mb-1 text-xs text-gray-600" htmlFor="title">
            本のタイトル
          </Label>
          <div className="relative mb-2">
            <Input
              id="title"
              className={cn(
                "h-11 pr-14 bg-slate-50 focus-visible:ring-teal-500",
                errors.title &&
                  "bg-red-50 text-red-500 focus-visible:ring-red-500 border-red-500",
              )}
              placeholder="銀河鉄道の夜"
              disabled={isPending}
              {...register("title")}
            />
            <Button
              size="icon"
              className={cn(
                "bg-teal-500 hover:bg-teal-600 transition-all absolute z-[1] top-1 right-2",
                errors.title && "bg-red-500 hover:bg-red-600",
              )}
              disabled={isPending}
            >
              {isPending ? <Spinner className="text-white" /> : <SendIcon />}
            </Button>
          </div>
          {errors.title && (
            <p className="text-red-500 text-xs">{errors.title.message}</p>
          )}
        </CardContent>
      </Card>
    </form>
  );
};
