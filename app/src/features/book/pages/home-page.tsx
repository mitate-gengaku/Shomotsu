import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ContentTitleForm } from "@/features/book/components/content-title-form"
import { cn } from "@/utils/cn"
import { FileIcon, FileUpIcon, SendIcon } from "lucide-react"

export const HomePage = () => {
  return (
    <div
      className="w-full lg:w-1/2 mx-auto h-full mb-8 lg:mb-0"
      data-testid="home-page"
    >
      <div className="flex flex-col mb-8 gap-8">
        <div className="flex flex-col items-center">
          <h3 className="text-xl sm:text-2xl font-semibold">
            新しい本を作成する
          </h3>
        </div>
        <ContentTitleForm />
      </div>
    </div>
  )
}