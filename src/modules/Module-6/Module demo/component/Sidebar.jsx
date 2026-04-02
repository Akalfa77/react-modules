import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

export default function Sidebar() {
    const { theme, themeToggle } = useContext(ThemeContext)
    return (
        <div>
            <h2>Click here to change Theme</h2>
            <button onClick={themeToggle}>{theme ? 'light' : 'dark'}</button>
        </div>
    )
}
