import { IconKeyType, icons } from "@/features/book/config/icons"
import { ComputerIcon } from "lucide-react"

interface Props extends React.ComponentProps<"svg"> {
  icon: IconKeyType
}

export const CategoryIcons = ({ icon, ...props }: Props) => {
  const Icon = icons[icon] as React.ComponentType<React.ComponentProps<"svg">>
  return (
    <Icon {...props} />
  )
}