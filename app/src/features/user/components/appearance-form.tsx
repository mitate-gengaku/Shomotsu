"use client"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { isSyncSystem } from "@/stores/darkmode-theme"
import { useAtom, useAtomValue } from "jotai"

export const AppearanceForm = () => {
  const [checked, setChecked] = useAtom(isSyncSystem)

  return (
    <div className="flex flex-col gap-1">
      <Label className="text-sm text-muted-foreground">テーマをシステムと同期</Label>
      <Switch 
        className="data-[state=checked]:bg-teal-500"
        checked={checked}
        onCheckedChange={setChecked}
        />
    </div>
  )
}