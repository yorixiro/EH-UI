import {createContext,createElement,useContext,type ReactNode} from "react";
import {themes,type ThemeKey,type ThemeTokens} from "../theme/themes";
const Scope=createContext<ThemeKey|null>(null);
export function AtlasThemeProvider({themeKey,children}:{themeKey:ThemeKey;children:ReactNode}) {
  return createElement(Scope.Provider,{value:themeKey},children);
}
export function useThemeTokens():ThemeTokens {
  const key=useContext(Scope);
  return themes[key??"eventHorizon"];
}
