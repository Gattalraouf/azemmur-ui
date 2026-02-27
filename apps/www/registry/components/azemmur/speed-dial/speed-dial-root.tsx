// Copyright (c) 2026 raouf.codes - Azemmur

'use client';

import { cn } from '@workspace/ui/lib/utils';
import { useState, useRef, useMemo, useCallback } from 'react';
import { SpeedDialContext } from '@/registry/components/azemmur/speed-dial/speed-dial-context';
import {
  speedDialVariants,
  type SpeedDialVariantProps,
} from '@/registry/components/azemmur/speed-dial/speed-dial-variants';
import { useKeyActions } from '@/registry/hooks/use-key-actions';

interface SpeedDialRootProps extends SpeedDialVariantProps {
  children: React.ReactNode;
  className?: string;
  defaultOpen?: boolean;
}

function SpeedDialRoot({
  children,
  className,
  defaultOpen = false,
  orientation = 'vertical',
  direction = 'reverse',
  size = 'md',
  intent = 'primary',
  styling = 'solid',
  shape = 'pill',
  elevation = 'raised',
}: SpeedDialRootProps) {
  const [open, setOpen] = useState(defaultOpen);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVertical = orientation === 'vertical';
  const focusableSelector =
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

  const handleBlur = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setOpen(false);
    }
  }, []);

  const handleKeyDown = useKeyActions(
    [
      {
        keys: ['Escape'],
        action: () => setOpen(false),
      },
      {
        keys: [isVertical ? 'ArrowDown' : 'ArrowRight'],
        action: (e) => {
          const focusable =
            containerRef.current?.querySelectorAll<HTMLElement>(
              focusableSelector,
            );
          if (!focusable) return;
          const arr = Array.from(focusable);
          const index = arr.findIndex((el) => el === e.target);
          const next = (index + 1) % arr.length;
          arr[next]?.focus();
        },
      },
      {
        keys: [isVertical ? 'ArrowUp' : 'ArrowLeft'],
        action: (e) => {
          const focusable =
            containerRef.current?.querySelectorAll<HTMLElement>(
              focusableSelector,
            );
          if (!focusable) return;
          const arr = Array.from(focusable);
          const index = arr.findIndex((el) => el === e.target);
          const prev = (index - 1 + arr.length) % arr.length;
          arr[prev]?.focus();
        },
      },
    ],
    containerRef,
  );

  const contextValue = useMemo(
    () => ({
      open,
      setOpen,
      orientation,
      direction,
      isVertical,
      size,
      intent,
      styling,
      shape,
      elevation,
    }),
    [
      open,
      orientation,
      direction,
      isVertical,
      size,
      intent,
      styling,
      shape,
      elevation,
    ],
  );

  return (
    <SpeedDialContext.Provider value={contextValue}>
      <div
        ref={containerRef}
        className={cn(
          speedDialVariants({
            orientation,
            direction,
            size,
            intent,
            styling,
            shape,
            elevation,
          }),
          className,
        )}
        role="navigation"
        aria-label="Speed dial menu"
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        {children}
      </div>
    </SpeedDialContext.Provider>
  );
}

SpeedDialRoot.displayName = 'SpeedDial';

export { SpeedDialRoot, type SpeedDialRootProps };
