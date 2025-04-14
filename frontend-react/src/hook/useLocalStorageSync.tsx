import { useState, useEffect } from "react";

type Options = {
  ttlMinutes?: number; // ⏳ Thời gian sống tính theo phút
};

export function useLocalStorageRedisSync<T>(
  key: string,
  initialValue: T,
  options?: Options
) {
  const { ttlMinutes } = options || {};

  const readValue = (): T => {
    try {
      const item = localStorage.getItem(key);
      if (!item || item === "undefined") return initialValue;

      const parsed = JSON.parse(item);

      if (ttlMinutes && parsed._timestamp) {
        const now = Date.now();
        const age = (now - parsed._timestamp) / 1000 / 60; // phút

        if (age > ttlMinutes) {
          localStorage.removeItem(key);
          return initialValue;
        }

        return parsed._value;
      }

      return parsed._value ?? parsed;
    } catch (error) {
      console.warn(`❌ [useLocalStorageSync] Lỗi đọc key "${key}":`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(readValue);

  // ✅ Lưu vào localStorage + ghi timestamp nếu có TTL
  useEffect(() => {
    try {
      const toStore = ttlMinutes
        ? JSON.stringify({ _value: storedValue, _timestamp: Date.now() })
        : JSON.stringify({ _value: storedValue });

      localStorage.setItem(key, toStore);
    } catch (error) {
      console.error(`❌ [useLocalStorageSync] Lỗi ghi key "${key}":`, error);
    }
  }, [key, storedValue, ttlMinutes]);

  // 🔄 Sync giữa các tab
  useEffect(() => {
    const onStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        setStoredValue(readValue());
      }
    };
    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, [key]);

  return [storedValue, setStoredValue] as [T, React.Dispatch<React.SetStateAction<T>>];
}