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
      <button className={cn(className)} onClick={() => onSignOut()} ref={ref}>
        <LogOutIcon data-testid="signout-icon" />
        サインアウト
      </button>
    );
  },
);

SignOutButton.displayName = "SignOutButton";
