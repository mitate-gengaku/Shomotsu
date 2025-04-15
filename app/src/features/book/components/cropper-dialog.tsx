"use client";
import { Cropper } from "@/components/lib/cropper";
import { Spinner } from "@/components/loading/spinner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCropper } from "@/features/user/hooks/use-cropper";

export const CropperDialog = () => {
  const { cropperFile, onOpenChange, action, cropperRef, isPending } = useCropper();

  return (
    <Dialog open={typeof cropperFile !== "undefined"} onOpenChange={() => onOpenChange()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>アバター画像のトリミング</DialogTitle>
          <DialogDescription>枠線に合わせて画像をトリミングしてください</DialogDescription>
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
          <Button className="w-full bg-teal-500 hover:bg-teal-600 transition-all" disabled={isPending}>
            {isPending ? <Spinner className="text-white" /> : "新しいアバター画像を設定する"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
