// Copyright (c) 2026 raouf.codes - Azemmur

'use client';

import { cn } from '@workspace/ui/lib/utils';
import { motion, MotionValue, useTransform } from 'motion/react';
import type { ReactNode, RefObject } from 'react';
import {
  useTimeline,
  type Direction,
} from '@/registry/components/azemmur/timeline/timeline-context';
import {
  timelineItemVariants,
  timelineContentVariants,
  timelinePinVariants,
  timelinePinDotVariants,
  timelineTitleVariants,
  type TimelineItemVariantProps,
} from '@/registry/components/azemmur/timeline/timeline-variants';

interface TimelineItemProps extends TimelineItemVariantProps {
  title: string;
  children: ReactNode;
  index?: number;
  transformsRange?: number[][];
  scrollProgress?: MotionValue<number>;
  pinRef?: RefObject<HTMLDivElement | null>;
  className?: string;
  contentClassName?: string;
  pinClassName?: string;
  dir?: Direction;
  intent?:
    | 'primary'
    | 'accent'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | 'error';
  size?: 'sm' | 'md' | 'lg';
  visuals?: 'card' | 'bordered' | 'solid' | 'dashed' | 'dotted' | 'none';
  shape?: 'circle' | 'ring' | 'dot' | 'square' | 'diamond';
  'aria-current'?: boolean | 'step' | 'true' | 'false';
  __isTimelineItem?: boolean;
}

function TimelineItem({
  title,
  children,
  index = 0,
  transformsRange,
  scrollProgress,
  pinRef,
  className,
  contentClassName,
  pinClassName,
  dir: dirProp,
  orientation: orientationProp,
  intent: intentProp,
  size: sizeProp,
  visuals: visualsProp,
  shape: shapeProp,
  'aria-current': ariaCurrent,
}: TimelineItemProps) {
  const context = useTimeline();

  const dir = dirProp ?? context.dir ?? 'ltr';
  const orientation = orientationProp ?? context.orientation ?? 'horizontal';
  const intent = intentProp ?? context.intent ?? 'primary';
  const size = sizeProp ?? context.size ?? 'md';
  const visuals = visualsProp ?? context.visuals ?? 'none';
  const shape = shapeProp ?? context.shape ?? 'circle';

  const isHorizontal = orientation === 'horizontal';
  const { containerWidth } = context;

  const x = useTransform(
    scrollProgress || new MotionValue(0),
    transformsRange?.[0] || [0, 1],
    transformsRange?.[1] || [0, 0],
  );

  const titleId = `timeline-item-title-${index}`;

  return (
    <div
      className={cn(timelineItemVariants({ orientation }), className)}
      style={isHorizontal ? { width: containerWidth } : undefined}
      role="listitem"
      aria-labelledby={titleId}
      aria-current={ariaCurrent}
      dir={dir}
    >
      <motion.div
        ref={pinRef}
        style={isHorizontal && scrollProgress ? { x } : undefined}
        className={cn(
          'flex z-10',
          isHorizontal
            ? 'flex-col self-start items-center w-fit mx-4'
            : 'flex-col items-center shrink-0 self-start sticky top-0',
          pinClassName,
        )}
      >
        <div
          aria-hidden="true"
          className={cn(timelinePinVariants({ size, shape, intent }))}
        >
          <div
            className={cn(timelinePinDotVariants({ size, shape, intent }))}
          />
        </div>

        {isHorizontal && (
          <h3
            id={titleId}
            className={cn(timelineTitleVariants({ orientation, size, intent }))}
          >
            {title}
          </h3>
        )}
      </motion.div>

      <div
        className={cn(
          timelineContentVariants({ orientation }),
          contentClassName,
        )}
      >
        {!isHorizontal && (
          <h3
            id={titleId}
            className={cn(timelineTitleVariants({ orientation, size, intent }))}
          >
            {title}
          </h3>
        )}
        <div
          className={cn(
            timelineContentVariants({ orientation, visuals, intent }),
            isHorizontal ? 'h-full' : '',
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

TimelineItem.__isTimelineItem = true;

export { TimelineItem, type TimelineItemProps };
