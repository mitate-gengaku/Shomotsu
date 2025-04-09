"use client";

import { getFormProps, getInputProps } from "@conform-to/react";

import { Spinner } from "@/components/loading/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAccountSetting } from "@/features/user/hooks/use-account-setting";
import { cn } from "@/utils/cn";

export const AccountSettingForm = ({ username }: { username: string }) => {
  const { form, action, fields, onChangeInput, input, isPending } =
    useAccountSetting(username);

  return (
    <form {...getFormProps(form)} action={action} className="space-y-4">
      <div className="space-y-1">
        <Label className="text-sm text-muted-foreground">ユーザー名</Label>
        <Input
          {...getInputProps(fields.username, { type: "text" })}
          key={fields.username.key}
          className={cn(
            "bg-slate-50 dark:bg-slate-900",
            fields.username.errors &&
              "border-red-500 bg-red-50 focus-visible:ring-red-500",
            !fields.username.errors && "focus-visible:ring-teal-500",
          )}
          onChange={onChangeInput}
          defaultValue={input}
          disabled={isPending}
        />
        {fields.username.errors && (
          <p className="text-red-500 text-xs">{fields.username.errors}</p>
        )}
      </div>
      <Button
        type="submit"
        className="bg-teal-500 hover:bg-teal-600 transition-all"
        disabled={isPending}
      >
        {isPending ? <Spinner className="text-white" /> : "プロフィールを更新"}
      </Button>
    </form>
  );
};
