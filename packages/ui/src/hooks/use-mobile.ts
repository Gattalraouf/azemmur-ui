'use client';

import * as React from 'react';

/* -------------------------------------------------------------------------- */
/*                                   Constants                                 */
/* -------------------------------------------------------------------------- */

const MOBILE_BREAKPOINT = 768;

/* -------------------------------------------------------------------------- */
/*                                    Hook                                     */
/* -------------------------------------------------------------------------- */

/**
 * Hook to detect whether the current viewport is considered "mobile".
 *
 * Uses a media query to determine if the viewport width is below `MOBILE_BREAKPOINT`.
 * Returns a boolean (`true` if mobile, `false` otherwise).
 *
 * @example
 * ```tsx
 * const isMobile = useIsMobile();
 * if (isMobile) {
 *   // Render mobile layout
 * }
 * ```
 *
 * @returns `true` if viewport width is less than `MOBILE_BREAKPOINT`
 */
export function useIsMobile() {
  // State to track mobile status
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener('change', onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  // Always return a boolean
  return !!isMobile;
}
