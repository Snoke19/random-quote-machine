import {useEffect, useState} from "react";

export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
      setDebouncedValue(null)
    };
  }, [value, delay]);

  return debouncedValue;
}