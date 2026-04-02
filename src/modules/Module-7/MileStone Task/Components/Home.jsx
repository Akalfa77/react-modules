import React from 'react'
import { useNavigate } from 'react-router'
import { userData } from '../../../../data/userData'
import './home.css'

export default function Home() {

    const navigate = useNavigate()
    return (
        <div>
            <h2>User</h2>
            <div className="user-grid">
                {userData.map((user) => (
                    <div
                        key={user.id}
                        onClick={() => { navigate(`../user/${user.id}`) }}
                    >
                        <h4>{user.name}</h4>
                        {/* <p>{user.email}</p> */}
                    </div>
                ))}
            </div>
        </div>
    )
}
