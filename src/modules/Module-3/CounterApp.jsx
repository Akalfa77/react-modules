import { useState } from 'react'

function App() {

    const [counter, setCounter] = useState(0)
    const [isDark, setIsDark] = useState(false)

    const removeValue = () => {
        setCounter(prevCounter => prevCounter - 1);
    }
    const addValue = () => {
        // counter = counter + 1
        setCounter(prevCounter => prevCounter + 1);
    }
    const resetCount = () => {
        setCounter(0);
    }

    const changeColor = () => {
        setIsDark(prevMode => {
            const newMode = !prevMode;

            if (newMode) {
                document.body.className = "dark"
            } else {
                document.body.className = "light"
            }

            return newMode;
        });

    }

    console.log(counter)
    return (
        <>
            <div >

                <h1>Counter Project</h1>
                <h2>Current Value: {counter}</h2>
                <button onClick={addValue} className={isDark ? 'btn-light' : 'btn-dark'}>Add Value</button>  <hr />
                <button onClick={removeValue} disabled={counter <= 0} className={isDark ? 'btn-light' : 'btn-dark'}>Remove value</button> <hr />
                <button onClick={resetCount} className={isDark ? 'btn-light' : 'btn-dark'} >Reset</button><hr />
                <input
                    id='mode'
                    type='checkbox'
                    checked={isDark}
                    onChange={changeColor}
                />
                <label htmlFor="mode"><b>Click here to {isDark ? 'light' : 'dark'} mode</b></label>

            </div>
        </>
    )
}

export default App
