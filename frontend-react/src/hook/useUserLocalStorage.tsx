import { useEffect, useState } from "react";

export function useUserLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    try {
      const jsonValue = localStorage.getItem(key);
      if (!jsonValue || jsonValue === "undefined") {
        return typeof initialValue === "function" ? (initialValue as () => T)() : initialValue;
      }
      return JSON.parse(jsonValue);
    } catch (e) {
      console.warn(`Lỗi khi parse localStorage key "${key}":`, e);
      return typeof initialValue === "function" ? (initialValue as () => T)() : initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Lỗi khi set localStorage key "${key}":`, e);
    }
  }, [key, value]);

  return [value, setValue] as [typeof value, typeof setValue];
}