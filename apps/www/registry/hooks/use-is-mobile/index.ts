// Copyright (c) 2026 raouf.codes - Azemmur

'use client';

import { useState, useEffect } from 'react';

const DEFAULT_BREAKPOINT = 1024;

/**
 * Hook to detect whether the current viewport is considered "mobile".
 *
 * Uses a resize listener to determine if the viewport width is below the breakpoint.
 * Returns `undefined` during SSR, then `true` or `false` after hydration.
 *
 * @example
 * ```tsx
 * const isMobile = useIsMobile();
 * if (isMobile) {
 *   // Render mobile layout
 * }
 * ```
 *
 * @param breakpoint - The width threshold in pixels (default: 1024)
 * @returns `undefined` during SSR, `true` if mobile, `false` otherwise
 */
export function useIsMobile(breakpoint = DEFAULT_BREAKPOINT) {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, [breakpoint]);

  return isMobile;
}
