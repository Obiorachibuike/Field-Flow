'use client';

import React, { useEffect, useCallback, useState } from 'react';

const FONT_SCALING_KEY = 'font-scaling-enabled';

function FontProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);

  const applySetting = useCallback((value: string | null) => {
    const isEnabled = value === 'true';
    document.documentElement.classList.toggle('font-scaling', isEnabled);
  }, []);

  useEffect(() => {
    // Apply on initial load
    const storedValue = localStorage.getItem(FONT_SCALING_KEY);
    applySetting(storedValue);
    setIsInitialized(true);

    // Listen for changes from other tabs
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === FONT_SCALING_KEY) {
        applySetting(event.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [applySetting]);

  if (!isInitialized) {
    // Avoid flash of unstyled content by not rendering until the setting is applied.
    return null;
  }

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return <FontProvider>{children}</FontProvider>;
}
