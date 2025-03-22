import { SignedIn } from "@clerk/nextjs";

import { UserDropdown } from "@/features/auth/components/user-dropdown";
import {} from "react-device-detect";

export const SignedInMenu = () => (
  <SignedIn>
    <UserDropdown />
  </SignedIn>
);
