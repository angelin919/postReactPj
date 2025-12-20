import React, { createContext } from 'react';
export type Theme = 'light' | 'dark'
export interface ThemeContaxtType {
    theme: Theme
    toggleTheme: () => void
}
export const ThemeContext = createContext<ThemeContaxtType | undefined>(undefined)
console.log('ThemeContext - ', {ThemeContext:ThemeContext})