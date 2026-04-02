import React from 'react'
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router'
import './about.css'

export default function Navbar() {
    const navigate = useNavigate()
    const location = useLocation()

    return (

        <nav className='nav-bar'>
            <div>
                <h1 className='app-heading'>User App</h1>
                <nav className='nav-links'>
                    <NavLink to="/navbar/home" >Home</NavLink>
                    <NavLink to="/navbar/about" >About</NavLink>
                </nav>
                <div>
                    <Outlet />
                </div>

                {location.pathname !== "/navbar/home" &&
                    <div className='bottom-App-btn'>

                        <button
                            onClick={() => navigate('/navbar/home')}
                        >
                            Back to Home
                        </button>

                        <button
                            onClick={() => navigate(-1)}
                        >
                            Back
                        </button>
                    </div>
                }

            </div>
        </nav>
    )
}
