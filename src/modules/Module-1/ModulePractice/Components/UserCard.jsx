import React from 'react'

export default function UserCard({ name, age }) {
    return (
        <div className='UserCard'>
            <h3>{name}</h3>
            <span>Age: {age}</span>
        </div>
    )
}
