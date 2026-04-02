import React, { useState, useEffect } from 'react'
import './TimerModule.jsx'

export default function Timer({ title }) {
    const [second, setSecond] = useState(0);
    const [isRunning, setIsRunning] = useState(false);


    useEffect(() => {
        let interval = null;

        if (isRunning) {
            interval = setInterval(() => {
                setSecond(prevSecond => prevSecond + 1);
            }, 1000);
        }
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isRunning]);

    const toggle = () => setIsRunning(prev => !prev);

    const reset = () => {
        setIsRunning(false);
        setSecond(0);
    };

    const hours = Math.floor(second / 3600)
    const minutes = Math.floor((second % 3600) / 60)
    const remainingSeconds = second % 60
    return (
        <div >
            <h3>{title}</h3>
            <h2 >{hours}h {minutes}m {remainingSeconds}s</h2>
            <p>
                {isRunning ? 'Running' : 'Stopped'}
            </p>
            <div>
                <button onClick={toggle}>
                    {isRunning ? 'Stop' : 'Start'}
                </button>
                <button onClick={reset}>
                    Reset
                </button>
            </div>
        </div>
    );
}

