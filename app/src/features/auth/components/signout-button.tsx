import { useClerk } from "@clerk/nextjs";
import { LogOutIcon } from "lucide-react";
import { forwardRef } from "react";

import { cn } from "@/utils/cn";

interface Props {
  className?: string;
}

export const SignOutButton = forwardRef<HTMLButtonElement, Props>(
  ({ className }, ref) => {
    const { signOut } = useClerk();

    const onSignOut = () => {
      signOut();
    };

    return (
      <button
        className={cn(
          className,
          "w-full h-12 px-4 flex items-center gap-4 hover:bg-accent cursor-pointer",
        )}
        onClick={() => onSignOut()}
        ref={ref}
      >
        <LogOutIcon data-testid="signout-icon" />
        サインアウト
      </button>
    );
  },
);
