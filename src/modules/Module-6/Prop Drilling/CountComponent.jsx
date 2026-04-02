import React, { useState } from 'react'
import ChildeCountComponent from './ChildeCountComponent'

export default function CountComponent() {

    const [count, setCount] = useState(0)


    return (
        <>
            <div className="text-center mt-3">
                <h2 className="text-3xl">Parent Component</h2>
                <small>Not using the count state</small>
            </div>

            <ChildeCountComponent count={count} setCount={setCount} />
        </>
    )
}
