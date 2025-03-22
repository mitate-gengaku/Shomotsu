import { PrivateLayoutUI } from "@/components/layout/private-layout";

const PrivateLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return <PrivateLayoutUI>{children}</PrivateLayoutUI>;
};

export default PrivateLayout;
