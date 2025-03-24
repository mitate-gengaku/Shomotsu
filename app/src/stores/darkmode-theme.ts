import { atomWithStorage } from "jotai/utils";

export const darkModeAtom = atomWithStorage<string>("theme", "system");
