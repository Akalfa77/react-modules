import React, { createContext, useCallback, useMemo, useState } from 'react'

export const ThemeContext = createContext('light')

export default function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(false)

    const themeToggle = useCallback(() => {
        setTheme(prevMode => {
            const newMode = !prevMode;

            if (newMode) {
                document.body.className = "dark"
            } else {
                document.body.className = "light"
            }

            return newMode;
        })
    }, [])

    const value = useMemo(() => {
        return { theme, themeToggle }
    }, [theme, themeToggle])

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}
