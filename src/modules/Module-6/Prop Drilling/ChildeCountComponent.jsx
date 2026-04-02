import React from 'react'
import GrandChildCountComponent from './GrandChildCountComponent'

export default function ChildeCountComponent({ count, setCount }) {
    return (
        <>
            <div className="text-center mt-3">
                <h2 className="text-3xl">Child Component</h2>
                <small>Not Using the count state too</small>
            </div>
            <GrandChildCountComponent count={count} setCount={setCount} />
        </>
    )
}
