
import { useContext } from 'react';
import { CounterContext } from '../context/CounterContext';


export const GrandChildCountComponent2 = () => {
    const { count, increment } = useContext(CounterContext);

    return (
        <div>
            <div>
                <h2>Grandchild Component</h2>
                <small>Using the count state</small>
            </div>
            <div>
                <h3>Count is: {count}</h3>
                <button
                    onClick={increment}>
                    Increase Count
                </button>
            </div>
        </div>
    );
};

