import { useState, useEffect, useCallback } from "react";

// Old placeholder values that should be silently upgraded to the corrected
// ones below, even if a stale copy was already saved to localStorage before
// the fix. Only exact matches are replaced — any value the user has since
// edited themselves is left alone.
const STALE_VALUE_FIXES = {
  email: {
    "reham.samir@example.com": "reham.samii.abdo@std.pharma.cu.edu.eg",
  },
  linkedin: {
    "https://linkedin.com/in/reham-samir": "https://www.linkedin.com/in/reham-samiir-969a54244",
    "https://linkedin.com/in/reham-samiir-969a54244": "https://www.linkedin.com/in/reham-samiir-969a54244",
  },
};

function applyStaleValueFixes(key, data) {
  // This migration only matters for the "about" object (email/linkedin live there)
  if (key !== "reham_about" || !data || typeof data !== "object") return data;

  let changed = false;
  const fixed = { ...data };

  for (const field of Object.keys(STALE_VALUE_FIXES)) {
    const currentValue = fixed[field];
    const replacement = STALE_VALUE_FIXES[field][currentValue];
    if (replacement && replacement !== currentValue) {
      fixed[field] = replacement;
      changed = true;
    }
  }

  return changed ? fixed : data;
}

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
      const parsed = stored ? JSON.parse(stored) : initialValue;
      return applyStaleValueFixes(key, parsed);
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
