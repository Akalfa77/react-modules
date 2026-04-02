import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router';
import './navbar8.css';


export default function Navbar8() {
    return (
        <div className="navbar8-wrapper">
            <nav className="navbar8">
                <NavLink
                    to="home"
                    className={({ isActive }) =>
                        isActive ? "nav-link8 active-link8" : "nav-link8"
                    }
                >
                    Home
                </NavLink>

                <NavLink
                    to="about"
                    className={({ isActive }) =>
                        isActive ? "nav-link8 active-link8" : "nav-link8"
                    }
                >
                    About
                </NavLink>
            </nav>

            <Suspense fallback={
                <div className="loading-spinner8">
                    <div className="spinner8"></div>
                    <p className="loading-text8">Loading data...</p>
                </div>
            }>
                <Outlet />
            </Suspense>
        </div>
    );
}