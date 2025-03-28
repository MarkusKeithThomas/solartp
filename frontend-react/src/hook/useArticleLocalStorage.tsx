import { useState, useEffect } from "react";

type StoredValue<T> = {
  value: T;
  expiry: number;
};

type SetValue<T> = (value: T | ((prev: T) => T)) => void;

export function useArticleLocalStorage<T>(
  key: string,
  initialValue: T,
  ttl: number
): [T, SetValue<T>, () => void] {
  const getStoredValue = (): T => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return initialValue;

    try {
      const item: StoredValue<T> = JSON.parse(itemStr);
      const now = Date.now();

      if (now > item.expiry) {
        localStorage.removeItem(key);
        return initialValue;
      }

      return item.value;
    } catch (error) {
      console.warn("parse error:", error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(getStoredValue);

  const setValue: SetValue<T> = (valueOrFn) => {
    const current = getStoredValue();
    const value =
      typeof valueOrFn === "function"
        ? (valueOrFn as (prev: T) => T)(current)
        : valueOrFn;
  
    const item: StoredValue<T> = {
      value,
      expiry: Date.now() + ttl,
    };
  
    localStorage.setItem(key, JSON.stringify(item));
    setStoredValue(value);
  };

  const remove = () => {
    localStorage.removeItem(key);
    setStoredValue(initialValue);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const value = getStoredValue();
      if (value !== storedValue) {
        setStoredValue(value);
      }
    }, 1000 * 1); // kiểm tra mỗi giây (nếu cần kiểm tra gấp hơn)

    return () => clearInterval(interval);
  }, []);

  return [storedValue, setValue, remove];
}