import { useEffect, useState } from "react"


export const useDebounce = (value: string, delay: number = 1000) => {
 const [debounceValue, setDebounceValue] = useState(value);

 useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceValue(value);
    }, delay)

    return() => {
        clearTimeout(timeoutId);
    }
 }, [value, delay])

 return debounceValue;

}