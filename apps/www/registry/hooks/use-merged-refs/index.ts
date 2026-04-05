import { useCallback, type Ref, type RefCallback } from 'react';

/**
 * React 19 compliant hook to merge multiple refs.
 * Replaces the deprecated 'MutableRefObject' with 'RefObject'.
 */
export function useMergeRefs<T>(
  ...refs: (Ref<T> | undefined | null)[]
): RefCallback<T> {
  return useCallback((value: T | null) => {
    const cleanups: Array<void | (() => void)> = [];

    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        const cleanup = ref(value);
        if (typeof cleanup === 'function') {
          cleanups.push(cleanup);
        }
      } else if (ref && typeof ref === 'object') {
        (ref as { current: T | null }).current = value;
      }
    });

    if (cleanups.length > 0) {
      return () => {
        cleanups.forEach((cleanup) => {
          if (typeof cleanup === 'function') cleanup();
        });
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refs);
}
