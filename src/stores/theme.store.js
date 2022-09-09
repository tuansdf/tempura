import { atomWithStorage } from "jotai/utils";
import { LocalStorageKeys } from "/src/constants/local-storage-keys";
import { Themes } from "/src/constants/themes";

export const themeAtom = atomWithStorage(
  LocalStorageKeys.THEME,
  window.matchMedia("(prefers-color-scheme: dark)").matches
    ? Themes.DARK
    : Themes.LIGHT
);
