import React from 'react'
import Header from './Components/Header.jsx'
import UserCard from './Components/UserCard.jsx'
import States from './Components/States.jsx'
import Footer from './Components/Footer.jsx'

export default function ModuleApp() {
    return (
        <div className='container'>
            <Header title='Profile' />

            <UserCard
                name='Akshar Prajapati'
                age={21}
            />

            <States
                posts={20}
                followers={350}
                following={325}
            />

            <Footer />


        </div>
    )
}
