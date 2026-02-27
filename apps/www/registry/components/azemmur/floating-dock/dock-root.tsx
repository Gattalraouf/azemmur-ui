// Copyright (c) 2026 raouf.codes - Azemmur

'use client';

import { cn } from '@workspace/ui/lib/utils';
import { motion, useMotionValue } from 'motion/react';
import { useRef, useMemo } from 'react';
import { DockContext } from '@/registry/components/azemmur/floating-dock/dock-context';
import {
  dockVariants,
  type DockVariantProps,
} from '@/registry/components/azemmur/floating-dock/dock-variants';
import { useKeyActions } from '@/registry/hooks/use-key-actions';

interface DockRootProps extends DockVariantProps {
  children: React.ReactNode;
  className?: string;
}

function DockRoot({
  children,
  className,
  orientation = 'vertical',
  size = 'md',
  intent = 'primary',
  styling = 'solid',
  shape = 'pill',
  elevation = 'raised',
}: DockRootProps) {
  const mousePosition = useMotionValue(Infinity);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVertical = orientation !== 'horizontal';

  const handleKeyDown = useKeyActions(
    [
      {
        keys: [isVertical ? 'ArrowDown' : 'ArrowRight'],
        action: (e) => {
          const focusable = containerRef.current?.querySelectorAll<HTMLElement>(
            'a[tabindex], button[tabindex]',
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
          const focusable = containerRef.current?.querySelectorAll<HTMLElement>(
            'a[tabindex], button[tabindex]',
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

  const handleMouseMove = (e: React.MouseEvent) => {
    mousePosition.set(isVertical ? e.pageY : e.pageX);
  };

  const contextValue = useMemo(
    () => ({
      mousePosition,
      isVertical,
      orientation,
      size,
      intent,
      styling,
      shape,
      elevation,
    }),
    [
      mousePosition,
      isVertical,
      orientation,
      size,
      intent,
      styling,
      shape,
      elevation,
    ],
  );

  return (
    <DockContext.Provider value={contextValue}>
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => mousePosition.set(Infinity)}
        onKeyDown={handleKeyDown}
        className={cn(
          dockVariants({
            orientation,
            size,
            intent,
            styling,
            shape,
            elevation,
          }),
          className,
        )}
        role="navigation"
        aria-label="Dock navigation"
      >
        {children}
      </motion.div>
    </DockContext.Provider>
  );
}

export { DockRoot, type DockRootProps };
