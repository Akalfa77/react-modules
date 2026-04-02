import React from 'react'

export default function States({ posts, followers, following }) {
    return (
        <div className='States'>
            <p>Posts: {posts}</p>
            <p>Posts: {followers}</p>
            <p>Posts: {following}</p>
        </div>
    )
}
