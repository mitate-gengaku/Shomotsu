import { BaseLayoutUI } from "@/components/layout/base-layout";

const PublicLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return <BaseLayoutUI>{children}</BaseLayoutUI>;
};

export default PublicLayout;
