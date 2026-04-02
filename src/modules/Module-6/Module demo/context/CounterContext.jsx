import React, { useState, createContext, useMemo, useCallback } from 'react'

export const CounterContext = createContext({
    count: 0,
    setCount: () => { },
});


export const CounterProvider = ({ children }) => {
    const [count, setCount] = useState(0);

    const increment = useCallback(() => {
        setCount(c => c + 1);
    }, []);

    const value = useMemo(() => {
        return { count, increment };
    }, [count, increment]);

    return (
        <CounterContext.Provider value={value} >
            {children}
        </CounterContext.Provider>
    );
};


