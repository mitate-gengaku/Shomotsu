"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { themeOptions } from "@/config/theme";
import { useAppearance } from "@/features/user/hooks/use-appearance";
import { cn } from "@/utils/cn";

export const AppearanceForm = () => {
  const { theme, checked, onCheckSyncSetting, onCheckCard } = useAppearance();

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1">
        <Label className="text-sm text-muted-foreground">テーマをシステムと同期</Label>
        <Switch
          className="data-[state=checked]:bg-teal-500"
          checked={checked}
          onCheckedChange={() => onCheckSyncSetting()}
        />
      </div>
      <div>
        <div className="flex flex-col gap-1">
          <Label className="text-sm text-muted-foreground">テーマ</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {themeOptions.map((option) => {
              return (
                <button
                  key={option.id}
                  onClick={() => onCheckCard(option.id)}
                  className={cn("disabled:pointer-events-none disabled:opacity-50 focus:ring-transparent")}
                  data-testid="theme-card"
                  disabled={checked}
                >
                  <Card
                    key={option.id}
                    className={cn(
                      "pb-0 relative cursor-pointer transition-all duration-200 overflow-hidden ring-1 ring-gray-200 gap-0 hover:ring-teal-500 hover:ring-2",
                      option.id === "light" && "bg-white",
                      option.id === "dark" && "bg-gray-900 border-gray-700",
                      option.id === theme && "ring-teal-500 ring-2",
                    )}
                  >
                    <div className={cn("p-4 border-b border-gray-200", option.id === "dark" && "border-gray-800")}>
                      <div className={cn("flex items-center justify-between mb-2")}>
                        <div className={cn("h-2 w-20 rounded-full bg-gray-300")}></div>
                        <div className="flex space-x-1">
                          <div className={cn("h-2 w-2 rounded-full bg-gray-300")}></div>
                          <div className={cn("h-2 w-2 rounded-full bg-gray-300")}></div>
                          <div className={cn("h-2 w-2 rounded-full bg-gray-300")}></div>
                        </div>
                      </div>

                      <div className={`flex flex-col space-y-1 ${""}`}>
                        <div className="h-2 w-full rounded-full bg-gray-200"></div>
                        <div className="h-2 w-3/4 rounded-full bg-gray-200"></div>
                        <div className="h-2 w-5/6 rounded-full bg-gray-200"></div>
                      </div>
                    </div>

                    <div
                      className={cn(
                        "p-4 bg-gradient-to-r from-white to-gray-800",
                        option.id === "light" && "bg-white text-gray-900",
                        option.id === "dark" && "bg-gray-800 text-white",
                      )}
                    >
                      <div className={`flex items-center justify-between`}>
                        <div className="flex items-center space-x-2">
                          {<option.icon className="h-5 w-5" />}
                          <span className="font-medium" data-testid="card-title">
                            {option.title}
                          </span>
                        </div>
                      </div>
                      <p className={`text-xs mt-1 text-left`} data-testid="card-description">
                        {option.description}
                      </p>
                    </div>
                  </Card>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
