import React from 'react'
import Modal from './Modal'
import Timer from "../../Module-2/Timer";
import { useState } from 'react'

export default function ModuleApp() {

    const [showModal, setShowModal] = useState(false)
    return (
        <div>
            <button
                onClick={() => setShowModal(true)}
            >
                click here to open
            </button>

            {showModal && (<Modal
                title="Timer Modal"
                onClose={() => setShowModal(false)}
            >
                <Timer />
            </Modal>)}
        </div>
    )
}
