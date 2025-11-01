'use client';

import * as React from 'react';

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export type AutoHeightOptions = {
  /** Include the element's parent box (padding/border) in computed height */
  includeParentBox?: boolean;
  /** Include the element's own padding/border in computed height */
  includeSelfBox?: boolean;
};

/* -------------------------------------------------------------------------- */
/*                                    Hook                                    */
/* -------------------------------------------------------------------------- */

/**
 * Measures and observes the height of an element (and optionally its parent)
 * to enable fluid auto-height animations.
 *
 * Designed to pair with Framer Motion components like:
 * ```tsx
 * <motion.div animate={{ height }} transition={{ type: 'spring' }}>
 *   <div ref={ref}>{children}</div>
 * </motion.div>
 * ```
 *
 * @param deps Dependencies that will re-trigger measurement (similar to `useEffect`).
 * @param options Measurement configuration for box sizing behavior.
 */
export function useAutoHeight<T extends HTMLElement = HTMLDivElement>(
  deps: React.DependencyList = [],
  options: AutoHeightOptions = {
    includeParentBox: true,
    includeSelfBox: false,
  },
) {
  const ref = React.useRef<T | null>(null);
  const roRef = React.useRef<ResizeObserver | null>(null);
  const [height, setHeight] = React.useState(0);

  /**
   * Compute total height (element height + optional padding/border)
   */
  const measure = React.useCallback((): number => {
    const el = ref.current;
    if (!el) return 0;

    // Base content height
    const base = el.getBoundingClientRect().height || 0;
    let extra = 0;

    // Include parent padding/border if requested
    if (options.includeParentBox && el.parentElement) {
      const cs = getComputedStyle(el.parentElement);
      const paddingY =
        (parseFloat(cs.paddingTop || '0') || 0) +
        (parseFloat(cs.paddingBottom || '0') || 0);
      const borderY =
        (parseFloat(cs.borderTopWidth || '0') || 0) +
        (parseFloat(cs.borderBottomWidth || '0') || 0);
      const isBorderBox = cs.boxSizing === 'border-box';
      if (isBorderBox) {
        extra += paddingY + borderY;
      }
    }

    // Include self padding/border if requested
    if (options.includeSelfBox) {
      const cs = getComputedStyle(el);
      const paddingY =
        (parseFloat(cs.paddingTop || '0') || 0) +
        (parseFloat(cs.paddingBottom || '0') || 0);
      const borderY =
        (parseFloat(cs.borderTopWidth || '0') || 0) +
        (parseFloat(cs.borderBottomWidth || '0') || 0);
      const isBorderBox = cs.boxSizing === 'border-box';
      if (isBorderBox) {
        extra += paddingY + borderY;
      }
    }

    // Account for subpixel precision and high DPI scaling
    const dpr =
      typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    const total = Math.ceil((base + extra) * dpr) / dpr;

    return total;
  }, [options.includeParentBox, options.includeSelfBox]);

  /**
   * Attach ResizeObserver to element and optionally parent.
   * Recalculate on resize or dependency updates.
   */
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Initial measurement
    setHeight(measure());

    // Reset observer
    if (roRef.current) {
      roRef.current.disconnect();
      roRef.current = null;
    }

    const ro = new ResizeObserver(() => {
      const next = measure();
      requestAnimationFrame(() => setHeight(next));
    });

    ro.observe(el);
    if (options.includeParentBox && el.parentElement) {
      ro.observe(el.parentElement);
    }

    roRef.current = ro;

    return () => {
      ro.disconnect();
      roRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  /**
   * Fallback measurement in case initial render had zero height
   * (e.g., due to layout jank or async children)
   */
  React.useLayoutEffect(() => {
    if (height === 0) {
      const next = measure();
      if (next !== 0) setHeight(next);
    }
  }, [height, measure]);

  return { ref, height } as const;
}
