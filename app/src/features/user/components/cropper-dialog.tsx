"use client";
import "cropperjs/dist/cropper.css";
import { useUser } from "@clerk/nextjs";
import imageCompression from "browser-image-compression";
import { useAtom } from "jotai";
import { useActionState, useRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import { toast } from "sonner";

import { Spinner } from "@/components/loading/spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { uploadAvatar } from "@/features/user/actions/upload";
import { cropperFileAtom } from "@/stores/cropper-file";

export const convertDataUrlToFile = async (
  dataURL: string,
  filename: string,
  type: "image/png" | "image/jpeg",
): Promise<File> => {
  const blob = await (await fetch(dataURL)).blob();
  return new File([blob], filename, { type: type });
};

export const CropperDialog = () => {
  const { user } = useUser();
  const cropperRef = useRef<ReactCropperElement>(null);
  const [cropperFile, setCropperFile] = useAtom(cropperFileAtom);

  const trimmingImage = async () => {
    if (!cropperRef.current || !user) return;

    const canvas = cropperRef.current.cropper.getCroppedCanvas();
    const dataURL = canvas.toDataURL();
    const file = await convertDataUrlToFile(
      dataURL,
      cropperFile?.name || "",
      "image/png",
    );

    const resizedImage = await imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 512,
      useWebWorker: true,
      initialQuality: 0.2,
    });

    const formData = new FormData();

    formData.append("avatar", resizedImage, file.name);

    const result = await uploadAvatar(formData);

    if (result.status === "success") {
      toast.success(result.message);
      setCropperFile(undefined);
      await user.reload();
    } else {
      toast.error(result.message);
    }
  };

  const [_, action, isPending] = useActionState(trimmingImage, undefined);

  return (
    <Dialog
      open={typeof cropperFile !== "undefined"}
      onOpenChange={() => setCropperFile(undefined)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>アバター画像のトリミング</DialogTitle>
          <DialogDescription>
            枠線に合わせて画像をトリミングしてください
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-8" action={action}>
          {typeof cropperFile !== "undefined" && (
            <Cropper
              src={URL.createObjectURL(cropperFile)}
              style={{ height: 300, width: "100%" }}
              initialAspectRatio={1 / 1}
              aspectRatio={1 / 1}
              autoCropArea={1}
              dragMode="none"
              viewMode={1}
              guides={false}
              ref={cropperRef}
            />
          )}
          <Button
            className="w-full bg-teal-500 hover:bg-teal-600 transition-all"
            disabled={isPending}
          >
            {isPending ? (
              <Spinner className="text-white" />
            ) : (
              "新しいアバター画像を設定する"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
