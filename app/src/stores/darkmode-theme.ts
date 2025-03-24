import { atomWithStorage } from "jotai/utils";

export const isSyncSystem = atomWithStorage("sync-system", false)