import React, { ReactNode, useEffect, useState } from 'react';
import { Theme, ThemeContaxtType, ThemeContext } from './ThemeContext'

interface ThemeProviderProps {
    children: ReactNode
}
const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem('theme') as Theme
        return saved || 'light'
    })

    useEffect(() => {
        localStorage.setItem('theme', theme)
        console.log({ theme: theme })

        // Меняем только фон body
        document.body.style.backgroundColor = theme === 'light'
            ? '#ffffff'
            : '#111827'

        // Меняем цвет текста для контраста
        document.body.style.color = theme === 'light'
            ? '#111827'
            : '#f9fafb'
    }, [theme])

    const toggleTheme = () => {
        setTheme(prev => prev == 'light' ? 'dark' : 'light')
        document.documentElement.setAttribute('data-theme', theme)
    }

    const contextValue: ThemeContaxtType = {
        theme,
        toggleTheme
    }
    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;