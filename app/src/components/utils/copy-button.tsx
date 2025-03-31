"use client";

import { CheckIcon, ClipboardIcon } from "lucide-react";
import React, { forwardRef, useState } from "react";

type Props = React.ComponentProps<"button"> & {
  copyText: string;
  onlyIcon?: boolean;
};

export const CopyButton = forwardRef<HTMLButtonElement, Props>(
  ({ copyText, onlyIcon = false, ...props }, ref) => {
    const [isCopied, setCopied] = useState<boolean>(false);

    const onCopy = async () => {
      setCopied(true);
      await global.navigator.clipboard.writeText(copyText);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    };

    return (
      <button {...props} ref={ref} onClick={() => onCopy()}>
        {isCopied ? (
          <>
            <CheckIcon className="text-teal-500 size-4" />
            {!onlyIcon && "コピーしました"}
          </>
        ) : (
          <>
            <ClipboardIcon className="size-4" />
            {!onlyIcon && "リンクをコピー"}
          </>
        )}
      </button>
    );
  },
);

CopyButton.displayName = "CopyButton";
