// Copyright (c) 2026 raouf.codes - Azemmur

'use client';

import { cn } from '@workspace/ui/lib/utils';
import type { Direction } from '@/registry/components/azemmur/timeline/timeline-context';

interface TimelineHeaderProps {
  children: React.ReactNode;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  dir?: Direction;
  __isTimelineHeader?: boolean;
}

function TimelineHeader({
  children,
  className,
  orientation = 'horizontal',
  dir,
}: TimelineHeaderProps) {
  const isHorizontal = orientation === 'horizontal';

  return (
    <div
      dir={dir}
      className={cn(
        'flex items-center justify-center',
        isHorizontal ? 'h-full' : 'mb-6',
        className,
      )}
    >
      {children}
    </div>
  );
}

TimelineHeader.__isTimelineHeader = true;

export { TimelineHeader, type TimelineHeaderProps };
