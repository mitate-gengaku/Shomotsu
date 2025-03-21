import { BaseLayoutUI } from "@/components/layout/landing-layout";

const LandingLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return <BaseLayoutUI>{children}</BaseLayoutUI>;
};

export default LandingLayout;
