import React from 'react'
import User from './User'
import { useState } from 'react';

function Card({ children }) {

  return (
    <div className='card'>
      {children}
    </div>
  )
}

function Hii(props) {
  return (
    <div style={{ background: 'lightgreen' }}>
      <h2>Hii</h2>
      <div>{props.children}</div>
    </div>
  );
}

function Hello(props) {
  return (
    <div style={{ background: 'lightblue' }}>
      <h2>Hello</h2>
      <div>{props.children}</div>
    </div>
  );
}

//render props
function Toggle({ render }) {
  const [mode, setMode] = useState(true)

  const toggle = () => setMode(!mode)

  return render({ mode, toggle })
}

// Render prop doesn’t have to be called render.
function MouseHover({ children }) {
  const [hover, setHover] = useState(false)

  return (
    <div
      style={{
        background: 'lightblue'
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children(hover)}

    </div >
  )
}

export default function ModulePractice5() {
  return (
    <>
      <Card>
        <User />
      </Card>
      <div>
        <Hii>
          <h3>This is Hii Component</h3>
        </Hii>
        <Hello>
          <h3>This is Hello Component</h3>
        </Hello>
      </div>

      <Toggle
        render={({ mode, toggle }) => (
          <button onClick={toggle}>
            {mode ? 'on' : 'off'}
          </button>
        )}
      />
      <MouseHover
        children={(hover) => (
          <h2>{hover ? 'Mouse On' : 'Mouse Out'}</h2>
        )}
      />
    </>

  )
}

