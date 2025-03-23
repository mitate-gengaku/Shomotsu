import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

interface Props {
  isMobile?: boolean;
}

export const SignedOutMenu = ({ isMobile = false }: Props) => (
  <SignedOut>
    <Button
      variant={"outline"}
      className="transition-all"
      size={isMobile ? "sm" : "default"}
      asChild
    >
      <SignInButton>ログイン</SignInButton>
    </Button>
    <Button
      variant={"default"}
      className="bg-teal-500 hover:bg-teal-600 transition-all"
      size={isMobile ? "sm" : "default"}
      asChild
    >
      <SignUpButton>今すぐ始める</SignUpButton>
    </Button>
  </SignedOut>
);
