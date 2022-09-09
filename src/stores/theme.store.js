import { atomWithStorage } from "jotai/utils";
import { LocalStorageKeys } from "/src/constants/local-storage-keys";

export const themeAtom = atomWithStorage(
  LocalStorageKeys.THEME,
  window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dracula"
    : "garden"
);
