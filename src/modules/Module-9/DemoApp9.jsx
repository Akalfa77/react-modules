import React from 'react'
import { NavLink, Outlet } from 'react-router'
import './DemoApp9.css'

export default function DemoApp9() {
    return (
        <div>
            <div>
                <h2>Module-9 Performance Optimization</h2>

                <div>
                    <NavLink to='unoptimized' className={({ isActive }) =>
                        isActive ? "demo9-link active" : "demo9-link"
                    }>Unoptimized version</NavLink>

                    <NavLink to='optimized' className={({ isActive }) =>
                        isActive ? "demo9-link active" : "demo9-link"
                    }>Optimized version</NavLink>
                    <NavLink to='virtualized' className={({ isActive }) =>
                        isActive ? "demo9-link active" : "demo9-link"
                    }>virtualized version</NavLink>

                </div>
            </div>
            <Outlet />
        </div>
    )
}
