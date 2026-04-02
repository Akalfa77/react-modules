import React from 'react'

export default function Module({ title, children, onClose }) {
    return (
        <div>
            <div>
                <h2>{title}</h2>

                <button onClick={onClose}>
                    Click Here to close!
                </button>
            </div>

            {children}
        </div>
    )
}
