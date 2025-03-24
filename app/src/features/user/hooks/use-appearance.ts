import { useAtom, useAtomValue } from "jotai";

import { useTheme } from "@/hooks/use-theme";
import { darkModeAtom } from "@/stores/darkmode-theme";
import { syncSystemAtom } from "@/stores/sync-system";

export const useAppearance = () => {
  const theme = useAtomValue(darkModeAtom);
  const { onChangeTheme } = useTheme();
  const [checked, setChecked] = useAtom(syncSystemAtom);

  const onCheckSyncSetting = () => {
    setChecked((check) => !check);

    if (checked) {
      onChangeTheme("light");
    } else {
      onChangeTheme("system");
    }
  };

  const onCheckCard = (value: string) => {
    if (checked) return;
    onChangeTheme(value);
  };

  return {
    theme,
    checked,
    onCheckSyncSetting,
    onCheckCard,
  };
};
