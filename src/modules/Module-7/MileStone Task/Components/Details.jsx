import React from 'react'
import { useParams } from 'react-router'
import { userData } from '../../../../data/userData'

export default function Details() {
    const { id } = useParams()
    const user = userData.find((u) => u.id === Number(id))

    if (!user) {
        return (
            <h1>User not Found</h1>
        )
    }
    return (
        <div>
            <h2>User Details</h2>

            <div>
                <h4>{user.name}</h4>
                <div>
                    <p><strong>Email: </strong><span>{user.email}</span></p>
                    <p><strong>Phone: </strong><span>{user.phone}</span></p>
                    <p><strong>Role: </strong><span>{user.role}</span></p>
                </div>

            </div>
        </div>
    )
}
