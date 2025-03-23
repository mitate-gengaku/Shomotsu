import { PublicLayoutUI } from "@/components/layout/base-layout";

const PublicLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return <PublicLayoutUI>{children}</PublicLayoutUI>;
};

export default PublicLayout;
