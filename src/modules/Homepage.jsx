import React from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router'
import './homepage.css'

export default function Homepage() {
    const navigate = useNavigate();
    const location = useLocation();
    const isFeedRoute = location.pathname === "/memeVerse";

    return (
        <>
            <div className='homepage'>
                <h1>React Practice Modules</h1>

                <div className='module-section'>
                    <button className='module-btn'>Open Modules</button>

                    <nav className='module-list'>
                        <NavLink to="/counterModule" >CounterModule</NavLink>
                        <NavLink to="/productModule" >ProductModule</NavLink>
                        <NavLink to="/timerModule" >TimerModule</NavLink>
                        <NavLink to="/moduleApp" >ModuleApp</NavLink>
                        <NavLink to="/taskManager" >TaskManager</NavLink>
                        <NavLink to="/counterApp" >CounterApp</NavLink>
                        <NavLink to="/practice" >Practice</NavLink>
                        <NavLink to="/modulePractice5" >ModulePractice5</NavLink>
                        <NavLink to="/moduleApp " >ModuleApp</NavLink>
                        <NavLink to="/modalApp" >ModalApp</NavLink>
                        <NavLink to="/moduleApp6" >ModuleApp6</NavLink>
                        <NavLink to="/finalApp6" >FinalApp6</NavLink>
                        <NavLink to="/layout1" >Layout1</NavLink>
                        <NavLink to="/navbar" >Module-task7</NavLink>
                        <NavLink to="/demoApp8">DemoApp8</NavLink>
                        <NavLink to="/moduleTask8">Module-task8</NavLink>
                        <NavLink to="/demoApp9">DemoApp9</NavLink>
                        <NavLink to="/milestoneTask9">MilestoneTask9</NavLink>
                        <NavLink to="/memeVerse">MemeVerse</NavLink>
                    </nav>
                </div>
            </div>

            <div className='page-content'>
                <Outlet />
            </div>

            {!isFeedRoute && (
                <div className='bottom-section'>
                    <button className='backward-btn' onClick={() => { navigate(-1) }}>Go Backward</button>
                    <button className='forward-btn' onClick={() => { navigate(1) }}>Go forward</button>
                    <button className='home-btn' onClick={() => { navigate("..", { replace: true }) }}>Go to Home</button>
                </div>
            )}
        </>
    )
}
