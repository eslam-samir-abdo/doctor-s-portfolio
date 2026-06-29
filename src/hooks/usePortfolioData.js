import { useState, useEffect, useCallback } from "react";

/**
 * Generic localStorage-backed state hook for editable portfolio content.
 * Works for arrays (experience, certificates) and objects (about, skills).
 *
 * @param {string} key - localStorage key
 * @param {*} initialValue - seed data used the first time the site loads
 */
export function usePortfolioData(key, initialValue) {
  const [data, setData] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch (e) {
      console.error(`Failed to read ${key} from localStorage`, e);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error(`Failed to save ${key} to localStorage`, e);
    }
  }, [key, data]);

  const update = useCallback((newData) => {
    setData(newData);
  }, []);

  const resetToDefault = useCallback(() => {
    setData(initialValue);
  }, [initialValue]);

  return [data, update, resetToDefault];
}
