// Copyright (c) 2026 raouf.codes - Azemmur

'use client';

import { type ReactNode, type RefObject } from 'react';
import {
  HorizontalTimeline,
  type HorizontalTimelineProps,
} from '@/registry/components/azemmur/timeline/timeline-horizontal';
import { type TimelineVariantProps } from '@/registry/components/azemmur/timeline/timeline-variants';
import {
  VerticalTimeline,
  type VerticalTimelineProps,
} from '@/registry/components/azemmur/timeline/timeline-vertical';
import { useIsMobile } from '@/registry/hooks/use-is-mobile';

interface TimelineRootProps extends TimelineVariantProps {
  children: ReactNode;
  className?: string;
  progressClassName?: string;
  ref?: RefObject<HTMLDivElement | null>;
  responsive?: boolean;
  mobileBreakpoint?: number;
  'aria-label'?: string;
}

function TimelineRoot({
  children,
  direction,
  orientation = 'horizontal',
  intent = 'primary',
  size = 'md',
  gradient = 'purple-blue',
  visuals = 'none',
  shape = 'circle',
  className,
  progressClassName,
  ref,
  responsive = true,
  mobileBreakpoint = 1024,
  'aria-label': ariaLabel = 'Timeline',
}: TimelineRootProps) {
  const resolvedDirection = direction ?? 'ltr';
  const isMobile = useIsMobile(mobileBreakpoint);
  const resolvedOrientation =
    responsive && orientation === 'horizontal' && isMobile
      ? 'vertical'
      : orientation;

  const sharedProps = {
    children,
    direction: resolvedDirection,
    intent,
    size,
    gradient,
    visuals,
    shape,
    className,
    progressClassName,
    ref,
    'aria-label': ariaLabel,
  };

  if (resolvedOrientation === 'vertical') {
    return <VerticalTimeline {...sharedProps} />;
  }

  return <HorizontalTimeline {...sharedProps} />;
}

export { TimelineRoot, type TimelineRootProps };
export type { HorizontalTimelineProps, VerticalTimelineProps };
