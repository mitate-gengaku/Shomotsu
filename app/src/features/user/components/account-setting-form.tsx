"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Spinner } from "@/components/loading/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userNameSchema } from "@/features/user/schema/username-schema";
import { cn } from "@/utils/cn";

export const AccountSettingForm = ({ username }: { username: string }) => {
  const {
    control,
    register,
    formState: { isSubmitting, isLoading, errors },
  } = useForm({
    resolver: zodResolver(userNameSchema),
    defaultValues: {
      username: username,
    },
  });

  return (
    <Form
      action={"/setting/account"}
      control={control}
      onSuccess={() => toast.success("プロフィールを更新しました")}
      onError={() => toast.error("エラーが発生しました")}
      className="space-y-4"
    >
      <div className="space-y-1">
        <Label className="text-sm text-muted-foreground">ユーザー名</Label>
        <Input
          {...register("username")}
          className={cn(
            "bg-slate-50 dark:bg-slate-900",
            errors.username?.message &&
              "border-red-500 bg-red-50 focus-visible:ring-red-500",
            !errors.username?.message && "focus-visible:ring-teal-500",
          )}
          disabled={isLoading || isSubmitting}
        />
        {errors.username?.message && (
          <p className="text-red-500 text-xs">{errors.username?.message}</p>
        )}
      </div>
      <Button
        type="submit"
        className="bg-teal-500 hover:bg-teal-600 transition-all"
        disabled={isLoading || isSubmitting}
      >
        {isLoading || isSubmitting ? (
          <Spinner className="text-white" />
        ) : (
          "プロフィールを更新"
        )}
      </Button>
    </Form>
  );
};
