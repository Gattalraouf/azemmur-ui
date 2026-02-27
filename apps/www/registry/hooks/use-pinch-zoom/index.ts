// Copyright (c) 2026 raouf.codes - Azemmur

'use client';
import { useEffect, useRef } from 'react';

export type UsePinchZoomOptions = {
  elementRef: React.RefObject<HTMLElement | null>;
  onZoom: (zoom: number) => void;
  minZoom?: number;
  maxZoom?: number;
  initialZoom?: number;
};

function getDistance(touches: TouchList): number {
  if (touches.length < 2) return 0;
  const touch1 = touches[0];
  const touch2 = touches[1];
  if (!touch1 || !touch2) return 0;
  return Math.hypot(
    touch2.clientX - touch1.clientX,
    touch2.clientY - touch1.clientY,
  );
}

/**
 * Hook to handle pinch-to-zoom gestures on touch devices.
 *
 * @example
 * ```tsx
 * const elementRef = useRef<HTMLDivElement>(null);
 * const [zoom, setZoom] = useState(1);
 *
 * usePinchZoom({
 *   elementRef,
 *   onZoom: setZoom,
 *   minZoom: 0.5,
 *   maxZoom: 3,
 * });
 *
 * return <div ref={elementRef} style={{ transform: `scale(${zoom})` }}>...</div>;
 * ```
 */
export function usePinchZoom({
  elementRef,
  onZoom,
  minZoom = 0.5,
  maxZoom = 3,
  initialZoom = 1,
}: UsePinchZoomOptions) {
  const currentZoom = useRef(initialZoom);
  const pinchStartDistance = useRef<number | null>(null);
  const pinchStartZoom = useRef(initialZoom);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        pinchStartDistance.current = getDistance(e.touches);
        pinchStartZoom.current = currentZoom.current;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && pinchStartDistance.current !== null) {
        e.preventDefault();

        const currentDistance = getDistance(e.touches);
        if (currentDistance === 0) return;

        const scale = currentDistance / pinchStartDistance.current;
        const newZoom = Math.min(
          maxZoom,
          Math.max(minZoom, pinchStartZoom.current * scale),
        );

        currentZoom.current = newZoom;
        onZoom(newZoom);
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) {
        pinchStartDistance.current = null;
      }
    };

    el.addEventListener('touchstart', onTouchStart, { passive: false });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd);
    el.addEventListener('touchcancel', onTouchEnd);

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [elementRef, onZoom, minZoom, maxZoom]);

  useEffect(() => {
    currentZoom.current = initialZoom;
  }, [initialZoom]);
}
