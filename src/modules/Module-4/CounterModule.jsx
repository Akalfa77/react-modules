import { useEffect } from 'react'
// import useLocalStorage from './hooks/useLocalStorage';
import './counter.css'
// import useDebounce from './hooks/useDebounce';
import useFetch from '../../hooks/useFetch';
import useDebounceState from '../../hooks/useDebounceState';
function App() {

  // let [counter, setCounter] = useLocalStorage('counter', 0);
  // const [isDark, setIsDark] = useLocalStorage('mode', false);
  // const debouncedCounter = useDebounce(counter, 1000);
  // const debouncedIsDark = useDebounce(isDark, 1000);
  let [counter, setCounter, debouncedCounter] = useDebounceState('counter', 0, 1000)
  const [isDark, setIsDark, debouncedIsDark] = useDebounceState('mode', false, 1000)
  const { data, loading, error } = useFetch("mockData.json")

  const waiting = counter !== debouncedCounter || isDark !== debouncedIsDark

  // let counter = 0;

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

  useEffect(() => {
    document.body.className = debouncedIsDark ? "dark" : "light";
  }, [debouncedIsDark, isDark]);

  const changeColor = () => {
    setIsDark(prevMode => !prevMode)
  }

  // const changeColor = () => {
  //   setIsDark(prevMode => {
  //     const newMode = !prevMode;

  //     if (newMode) {
  //       document.body.className = "dark"
  //     } else {
  //       document.body.className = "light"
  //     }

  //     return newMode;
  //   });

  // }

  console.log(counter)
  return (
    <>
      <div >
        <h3>Fetched Data</h3>

        {loading && <p>Loading...</p>}

        {error && <p>Error: {error}</p>}

        {data && (
          <div>
            <p>{data.message}</p>
            <p>{data.info}</p>
            <p>Version: {data.version}</p>
          </div>
        )}
        {waiting && <p><b>Wait...</b></p>}
        <h1>Counter Project</h1>
        <h2>Current Value: {debouncedCounter}</h2>
        <button onClick={addValue} className={debouncedIsDark ? 'btn-light' : 'btn-dark'}>Add Value</button>  <hr />
        <button onClick={removeValue} disabled={counter <= 0} className={debouncedIsDark ? 'btn-light' : 'btn-dark'}>Remove value</button> <hr />
        <button onClick={resetCount} className={debouncedIsDark ? 'btn-light' : 'btn-dark'} >Reset</button><hr />
        <input
          id='mode'
          type='checkbox'
          checked={isDark}
          onChange={changeColor}
        />
        <label htmlFor="mode"><b>Click here to {debouncedIsDark ? 'light' : 'dark'} mode</b></label>

      </div>
    </>
  )
}

export default App
