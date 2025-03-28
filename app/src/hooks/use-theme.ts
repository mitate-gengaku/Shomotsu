"use client";

import { darkModeAtom } from "@/stores/darkmode-theme";
import { useSetAtom } from "jotai";
import { useTheme as useNextTheme } from "next-themes";

export const useTheme = () => {
  const setTheme = useSetAtom(darkModeAtom);
  const { setTheme: setNextTheme } = useNextTheme();

  const onChangeTheme = (value: string) => {
    setTheme(value);
    setNextTheme(value)
  };

  return {
    onChangeTheme,
  };
};
