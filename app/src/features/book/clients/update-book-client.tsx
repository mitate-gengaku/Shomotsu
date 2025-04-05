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

interface Props {
  book: BookWithAllRelations;
}

export const UpdateBookPageClient = ({ book }: Props) => {
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
