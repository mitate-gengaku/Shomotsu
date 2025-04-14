"use client";

import React, { useTransition } from "react";
import { toast } from "sonner";

import { Spinner } from "@/components/loading/spinner";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteBook } from "@/features/book/actions/delete";
import { cn } from "@/utils/cn";

interface Props {
  book_id: string;
  book_title: string;
  isDialogOpen: boolean;
  setDialogOpen: (open: React.SetStateAction<boolean>) => void;
  handleSidebar: (open: React.SetStateAction<boolean>) => void;
}

export const DeleteBookDialog = ({ book_id, book_title, isDialogOpen, setDialogOpen, handleSidebar }: Props) => {
  const [isPending, startTransition] = useTransition();

  const onDelete = (bookId: string) => {
    startTransition(async () => {
      try {
        const response = await deleteBook(bookId);
        toast.success(response);
        setDialogOpen((open) => !open);
        handleSidebar((open) => !open);
      } catch (e) {
        if (e instanceof Error) {
          toast.error(e.message);
          return;
        }
        toast.error("Something went wrong");
        return;
      }
    });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent onMouseEnter={() => handleSidebar(true)} data-testid="alert-dialog-content">
        <DialogHeader>
          <DialogTitle>本の削除</DialogTitle>
          <DialogDescription>
            この操作は取り消せません。本当に「
            <span className="font-semibold">{book_title}</span>
            」を削除しますか？
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose disabled={isPending} className={cn(buttonVariants({ variant: "outline" }))} type="button">
            キャンセル
          </DialogClose>
          <Button
            onClick={() => onDelete(book_id)}
            disabled={isPending}
            className="bg-red-500 hover:bg-red-600 transition-all"
          >
            {isPending ? <Spinner className="text-white" /> : "削除"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
