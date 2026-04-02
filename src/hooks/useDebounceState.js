// import React, { useState } from "react";
import useDebounce from "./useDebounce";
import useLocalStorage from "./useLocalStorage";

export default function useDebounceState(key, initialValue, delay) {
  const [value, setValue] = useLocalStorage(key, initialValue);
  const debouncedValue = useDebounce(value, delay);

  return [value, setValue, debouncedValue];
}
