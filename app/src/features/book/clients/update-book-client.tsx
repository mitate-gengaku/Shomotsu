"use client";

import "cropperjs/dist/cropper.css";
import { getFormProps, getInputProps, getTextareaProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import React, { ChangeEvent, FormEvent, useActionState, useEffect, useRef, useState } from "react";

import { Spinner } from "@/components/loading/spinner";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { update } from "@/features/book/actions/update";
import { updateContentSchema } from "@/features/book/schema/update-content";
import { UpdateContentType } from "@/features/book/types/content";
import { BookWithAllRelations } from "@/types/book";
import { Category } from "@/types/category";
import { cn } from "@/utils/cn";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UploadIcon } from "lucide-react";
import { Cropper, ReactCropperElement } from "@/components/lib/cropper";
import imageCompression from "browser-image-compression";
import { avatarSchema } from "@/features/user/schema/avatar-schema";
1
interface Props {
  book: BookWithAllRelations;
  categories: Category[];
}

export const UpdateBookPageClient = ({ book, categories }: Props) => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState({
    description: book.description,
    category: book.categoryId,
    content: book.content,
    publish: book.publish,
  });
  const [contentHeight, setContentHeight] = useState<number>(500);
  const [file, setFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<string | string[]>("")
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const cropperRef = useRef<ReactCropperElement>(null)
  const [lastResult, action, isPending] = useActionState(update, undefined);

  const [form, fields] = useForm<UpdateContentType>({
    lastResult,
    constraint: getZodConstraint(updateContentSchema),
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: updateContentSchema });
    },
    defaultValue: {
      bookId: book.id,
      content: data.content,
      category: data.category,
      description: data.description,
      publish: data.publish,
    },
  });

  const onChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setData({
      ...data,
      content: e.target.value,
    });

    if (textareaRef.current) {
      setContentHeight(textareaRef.current.scrollHeight);
    }

    if (!e.target.value.length) {
      setContentHeight(60);
    }
  };

  const onChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files.length) return;
    
    const result = avatarSchema.safeParse(files[0])
    if (result.success) {
      setFile(result.data.avatar)
    } else {
      setErrors(result.error.message)
    }
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true)
    if (!cropperRef.current) return;

    const canvas = cropperRef.current.cropper.getCroppedCanvas();
    const dataURL = canvas.toDataURL();
    const blob = await (await fetch(dataURL)).blob();
    const croppedFile = new File([blob], file?.name ?? "", { type: file?.type });

    const resizedImage = await imageCompression(croppedFile, {
      maxSizeMB: 1,
      maxWidthOrHeight: 512,
      useWebWorker: true,
      initialQuality: 0.2,
    });

    try {
      const formData = new FormData();
      formData.set("file", resizedImage)
      
      setLoading(false)
    } catch (e) {
      setLoading(false)

      if (e instanceof Error) {
        console.log(e.message)
      }
      console.log("something went wrong")
    }
  }

  useEffect(() => {
    if (textareaRef.current) {
      setContentHeight(textareaRef.current.scrollHeight);
    }
  }, []);

  return (
    <div className="w-full lg:w-1/2 mx-auto relative md:pb-12" data-testid="update-book-page">
      <form {...getFormProps(form)} action={action}>
        <Tabs defaultValue="content">
          <TabsList>
            <TabsTrigger value="content" disabled={isPending}>
              コンテンツ
            </TabsTrigger>
            <TabsTrigger value="information" disabled={isPending}>
              本の情報
            </TabsTrigger>
          </TabsList>
          <TabsContent value="content">
            <div className="space-y-1">
              <Label htmlFor="content" className="text-xs text-muted-foreground">
                コンテンツ
              </Label>
              {fields.content.errors && <p className="text-red-500 text-xs">{fields.content.errors}</p>}
              <Textarea
                {...getTextareaProps(fields.content)}
                key={fields.content.key}
                placeholder="本のコンテンツを入力してください"
                disabled={isPending}
                className={cn(
                  "text-sm shadow-none border-none focus-visible:ring-transparent focus:border-transparent resize-none overflow-hidden",
                )}
                defaultValue={data.content ?? ""}
                onChange={onChangeContent}
                ref={textareaRef}
                style={{
                  height: contentHeight,
                }}
              />
            </div>
          </TabsContent>
          <TabsContent value="information">
            <Card className="py-6 shadow-none border-none">
              <div className="space-y-4">
                <h3 className="text-xl lg:text-2xl font-semibold">{book.title}</h3>
                <input
                  {...getInputProps(fields.bookId, { type: "hidden" })}
                  key={fields.bookId.key}
                  defaultValue={book.id}
                />
                <input
                  {...getInputProps(fields.content, { type: "hidden" })}
                  key={fields.content.key}
                  defaultValue={data.content ? data.content : undefined}
                />
                <div className="space-y-4">
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="description" className="text-xs text-muted-foreground">
                      内容紹介
                    </Label>
                    <Textarea
                      {...getTextareaProps(fields.description)}
                      key={fields.description.key}
                      placeholder="ジョバンニは、いつから乗っていながら、まるであんな女の子とばかり談しているのでした。すると耳に手をあげました。"
                      disabled={isPending}
                      className={"px-0 border-none shadow-none text-sm min-h-28 resize-none !ring-transparent"}
                      defaultValue={data.description}
                    />
                    {fields.description.errors && <p className="text-red-500 text-xs">{fields.description.errors}</p>}
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs text-muted-foreground font-medium">
                      表紙
                    </p>
                    <Label
                      htmlFor="file"
                      className={cn(
                        buttonVariants(),
                        "w-fit bg-teal-500 hover:bg-teal-600 cursor-pointer",
                        isPending && "disabled:pointer-events-none disabled:opacity-50"
                      )}
                      >
                      画像を選択
                      <input 
                        id="file"
                        name="file"
                        type="file"
                        className="sr-only"
                        accept=".png,.jpg"
                        onChange={onChangeFile}
                        disabled={isPending}
                        />
                    </Label>
                    {errors && <p className="text-red-500 text-xs">{errors}</p>}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="category" className="text-xs text-muted-foreground">
                      カテゴリ
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
                          "text-sm w-full",
                          fields.category.errors && "border-red-500 bg-red-50 focus-visible:ring-red-500",
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
                            value={cat.id}
                            className={cn(
                              "focus:bg-teal-50 [&_svg:not([class*='text-'])]:text-teal-500 dark:focus:bg-teal-800",
                              fields.category.errors && "focus:bg-red-50",
                            )}
                          >
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fields.category.errors && <p className="text-red-500 text-xs">{fields.category.errors}</p>}
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label className="text-xs text-muted-foreground">公開</Label>
                    <Switch
                      key={fields.publish.key}
                      id={fields.publish.id}
                      name={fields.publish.name}
                      required={fields.publish.required}
                      aria-invalid={!fields.publish.valid || undefined}
                      aria-describedby={!fields.publish.valid ? fields.publish.errorId : undefined}
                      className="data-[state=checked]:bg-teal-500"
                      checked={data.publish}
                      onCheckedChange={(checked) => {
                        form.update({
                          name: fields.publish.name,
                          value: checked,
                        });
                        setData({
                          ...data,
                          publish: checked,
                        });
                      }}
                      disabled={isPending || !data.content?.length}
                    />
                    {fields.publish.errors && <p className="text-red-500 text-xs">{fields.publish.errors}</p>}
                  </div>
                </div>
              </div>
              <Button
                className="w-fit bg-teal-500 hover:bg-teal-600 transition-all"
                disabled={isPending}
                type={"submit"}
              >
                {isPending ? <Spinner className="text-white" /> : "更新"}
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </form>

      <Dialog 
        open={file !== null}
        onOpenChange={() => setFile(null)}
        >
        <DialogContent asChild>
          <form onSubmit={onSubmit}>
            <DialogHeader>
              <DialogTitle>表紙の画像</DialogTitle>
              <DialogDescription>表紙にしたい画像を選択してください</DialogDescription>
            </DialogHeader>
              {file ? (
                <Cropper
                  src={URL.createObjectURL(file)}
                  style={{ height: 300, width: "100%" }}
                  initialAspectRatio={1 / 1.4}
                  aspectRatio={1 / 1.4}
                  autoCropArea={1}
                  dragMode="none"
                  viewMode={1}
                  guides={false}
                  ref={cropperRef}
                  />
              ) : (
                <div className="h-56 border-dashed border-2 rounded-md flex items-center justify-center hover:bg-slate-50 group">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className={cn(
                      buttonVariants({ variant: "outline", size: "icon" }),
                      "group-hover:bg-slate-50 dark:hover:bg-slate-950"
                    )}>
                      <UploadIcon />
                    </div>
                    <h3 className="text-xs text-muted-foreground font-semibold">ファイルをドロップ</h3>
                  </div>
                </div>
              )}
            <DialogFooter>
              <DialogClose asChild>
                <Button variant={"outline"}>キャンセル</Button>
              </DialogClose>
              <Button className="bg-teal-500 hover:bg-teal-600">アップロード</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
