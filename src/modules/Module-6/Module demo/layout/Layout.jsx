import React from 'react'
import Sidebar from '../component/Sidebar'
import { CounterProvider } from '../context/CounterContext'
import { GrandChildCountComponent2 } from '../component/GreandChildCountComponent2'

export default function Layout() {
    return (
        <div>
            <Sidebar /><hr />

            <CounterProvider>
                <GrandChildCountComponent2 />
            </CounterProvider>

        </div>
    )
}
