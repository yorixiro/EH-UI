import { createContext, createElement, useContext, type ReactNode } from "react";
import { themes, type ThemeKey, type ThemeTokens } from "../theme/themes";
/**
 * Expo source component atlas can independently show either palette.
 * Outside /original-atlas this always returns eventHorizon, matching the original EH demo.
 */
const AtlasThemeContext = createContext<ThemeKey | null>(null);
export function AtlasThemeProvider({themeKey,children}:{themeKey:ThemeKey;children:ReactNode}){
  return createElement(AtlasThemeContext.Provider,{value:themeKey},children);
}
export function useThemeTokens():ThemeTokens{
  const override=useContext(AtlasThemeContext);
  return themes[override??"eventHorizon"];
}
