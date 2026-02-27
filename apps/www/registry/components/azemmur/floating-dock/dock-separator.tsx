// Copyright (c) 2026 raouf.codes - Azemmur

'use client';

import { cn } from '@workspace/ui/lib/utils';
import { ComponentProps } from 'react';
import { useDock } from '@/registry/components/azemmur/floating-dock/dock-context';

type DockSeparatorProps = ComponentProps<'div'>;

function DockSeparator({ className, ...props }: DockSeparatorProps) {
  const { isVertical } = useDock();

  return (
    <div
      className={cn(
        'bg-current opacity-30',
        isVertical ? 'w-0.5 h-8' : 'h-0.5 w-8',
        className,
      )}
      aria-hidden="true"
      {...props}
    />
  );
}

export { DockSeparator, type DockSeparatorProps };
