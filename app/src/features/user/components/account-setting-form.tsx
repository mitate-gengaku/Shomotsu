"use client";

import {
  getFormProps,
  getInputProps,
  useForm,
  useInputControl,
} from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { ChangeEvent, useActionState, useState } from "react";

import { Spinner } from "@/components/loading/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUserName } from "@/features/user/actions/update";
import { userNameSchema } from "@/features/user/schema/username-schema";
import { UserNameType } from "@/features/user/types/username";
import { cn } from "@/utils/cn";

export const AccountSettingForm = ({ username }: { username: string }) => {
  const [input, setInput] = useState<string>(username);
  const [lastResult, action, isPending] = useActionState(
    updateUserName,
    undefined,
  );
  const [form, fields] = useForm<UserNameType>({
    lastResult,
    constraint: getZodConstraint(userNameSchema),
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: userNameSchema });
    },
    defaultValue: {
      username: input,
    },
  });
  const userNameControl = useInputControl(fields.username);

  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    userNameControl.change(value);
    setInput(value);
  };

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
          onChange={onChangeUserName}
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
