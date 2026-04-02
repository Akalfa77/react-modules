import React from 'react'
import Home from './Home'
import About from './About'
import Details from './Details'
import Navbar from './Navbar'
import { Route, Routes } from 'react-router'


export default function Layout7() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/user/:id' element={<Details />} />
            </Routes>

        </div>
    )
}
