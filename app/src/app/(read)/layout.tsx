import { ReadBookLayoutUI } from "@/components/layout/read-book-layout"

const ReadBookLayout = ({
  children,
  }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <ReadBookLayoutUI>{children}</ReadBookLayoutUI>
  )
} 

export default ReadBookLayout