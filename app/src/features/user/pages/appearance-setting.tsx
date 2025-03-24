import { SettingSidebar } from "@/components/apperance/setting-sidebar"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { AppearanceForm } from "@/features/user/components/appearance-form"

export const AppearanceSettingPage = () => {
  return (
    <div
      className="w-full lg:w-1/2 mx-auto flex flex-col md:flex-row gap-8 lg:mb-0"
      >
      <div className="w-full space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          外観
        </h2>
        <AppearanceForm />
      </div>
    </div>
  )
}