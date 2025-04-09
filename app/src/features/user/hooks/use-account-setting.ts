import { useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { ChangeEvent, useActionState, useState } from "react";

import { update } from "@/features/book/actions/update";
import { userNameSchema } from "@/features/user/schema/username-schema";
import { UserNameType } from "@/features/user/types/username";

export const useAccountSetting = (username: string) => {
  const [input, setInput] = useState<string>(username);
  const [lastResult, action, isPending] = useActionState(update, undefined);

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

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return {
    form,
    action,
    fields,
    onChangeInput,
    input,
    isPending,
  };
};
