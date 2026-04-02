import React, { useEffect, useState } from "react";
// import useLocalStorage from "./useLocalStorage";

export default function useDebounce(value, delay) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => clearTimeout(timer);
  });

  return debounceValue;
}
