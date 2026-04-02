import React from 'react'
import './Timer.css'
import Timer from './Timer.jsx'
import { useState } from 'react';

function TimerModule() {
  const [showTimer, setShowTimer] = useState(true);

  return (
    <div>
      <h1>Timer</h1>

      <button
        onClick={() => setShowTimer(prev => !prev)}
      >
        {showTimer ? 'Unmount' : 'Mount'}
      </button>
      {showTimer && <Timer
        title="My Timer">
      </Timer>}
    </div>

  );
}

export default TimerModule;
