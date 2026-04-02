import React from 'react'

export default function GrandChildCountComponent({ count, setCount }) {
    return (
        <div>
            <div>
                <h2>Grandchild Component</h2>
                <small>Using the count state</small>
            </div>
            <div >
                <h3 >Count is: {count}</h3>
                <button
                    onClick={() => setCount(count + 1)}>
                    Increase Count
                </button>
            </div>
        </div>
    )
}
