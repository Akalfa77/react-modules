import React from 'react'
import About from './pages/About'
import Home from './pages/Home'
import Details from './pages/Details'
import { Routes, Route, Link, Outlet } from 'react-router'
export default function DemoApp7() {
    return (
        <>
            <nav>
                <Link to="/demoApp7/home">Home</Link> |{" "}
                <Link to="/demoApp7/about">About</Link> |{" "}
                <Link to="/demoApp7/details">Details</Link>
            </nav>
            <Outlet />
        </>
    )
}
