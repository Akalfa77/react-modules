import React from 'react'
import { useEffect, useState } from 'react';
export default function Practice() {
    const [count, setCount] = useState(0);
    const [calculation, setCalculation] = useState(0);
    const [data, setData] = useState([]);

    useEffect(() => {

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCalculation(() => count * 2);

    }, [count]);

    const fetchData = () => {
        setData(["Apple", "Banana", "Mango", "Orange"]);
    };

    useEffect(() => {
        console.log(fetchData);
    }, [data]);



    return (
        <>
            <p>Count: {count}</p>
            <button onClick={() => setCount((c) => c + 1)}>+</button>
            <p>Calculation: {calculation}</p>

            <button onClick={fetchData}>
                Click the Button
            </button>

        </>
    );
}
