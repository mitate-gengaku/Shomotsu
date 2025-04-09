import "cropperjs/dist/cropper.css";
import { useUser } from "@clerk/nextjs";
import imageCompression from "browser-image-compression";
import { useAtom } from "jotai";
import { useActionState, useRef } from "react";
import { ReactCropperElement } from "react-cropper";
import { toast } from "sonner";

import { upload } from "@/features/user/actions/upload";
import { convertDataUrlToFile } from "@/features/user/utils/convert-data-url-to-file";
import { cropperFileAtom } from "@/stores/cropper-file";

export const useCropper = () => {
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

    const result = await upload(formData);

    if (result.status === "success") {
      toast.success(result.message);
      setCropperFile(undefined);
      await user.reload();
    } else {
      toast.error(result.message);
    }
  };

  const onOpenChange = () => setCropperFile(undefined);

  const [_, action, isPending] = useActionState(trimmingImage, undefined);

  return {
    cropperFile,
    onOpenChange,
    action,
    cropperRef,
    isPending,
  };
};
