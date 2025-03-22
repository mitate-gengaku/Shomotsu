import { SignedIn } from "@clerk/nextjs";

import { UserDropdown } from "@/features/auth/components/user-dropdown";

export const SignedInMenu = () => (
  <SignedIn>
    <UserDropdown />
  </SignedIn>
);
