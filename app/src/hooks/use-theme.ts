"use client";

import { useTheme as useNextTheme } from "next-themes";

export const useTheme = () => {
  const { setTheme } = useNextTheme();

  const onChangeTheme = (value: string) => {
    setTheme(value);
  };

  return {
    onChangeTheme,
  };
};
