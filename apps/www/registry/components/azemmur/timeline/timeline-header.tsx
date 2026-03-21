// Copyright (c) 2026 raouf.codes - Azemmur

'use client';

import { cn } from '@workspace/ui/lib/utils';

interface TimelineHeaderProps {
  children: React.ReactNode;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  direction?: 'ltr' | 'rtl';
  __isTimelineHeader?: boolean;
}

function TimelineHeader({
  children,
  className,
  orientation = 'horizontal',
  direction,
}: TimelineHeaderProps) {
  const isHorizontal = orientation === 'horizontal';
  const resolvedDirection = direction ?? 'ltr';

  return (
    <div
      dir={resolvedDirection}
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
