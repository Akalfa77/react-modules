import React from 'react'
import ThemeProvider from './context/ThemeContext'
import Layout from './layout/Layout'

export default function ModuleApp6() {
    return (
        <ThemeProvider>
            <Layout />
        </ThemeProvider>
    )
}
