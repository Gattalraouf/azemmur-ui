// Copyright (c) 2026 raouf.codes - Azemmur

'use client';

import { cn } from '@workspace/ui/lib/utils';
import { useScroll, useTransform, motion } from 'motion/react';
import {
  useEffect,
  useRef,
  useState,
  Children,
  isValidElement,
  cloneElement,
  type ReactNode,
  type ReactElement,
  type RefObject,
} from 'react';
import {
  TimelineContext,
  type Direction,
} from '@/registry/components/azemmur/timeline/timeline-context';
import {
  timelineVariants,
  timelineProgressVariants,
  type TimelineVariantProps,
} from '@/registry/components/azemmur/timeline/timeline-variants';
import { useMergeRefs } from '@/registry/hooks/use-merged-refs';

interface VerticalTimelineProps extends TimelineVariantProps {
  children: ReactNode;
  dir?: Direction;
  className?: string;
  progressClassName?: string;
  ref?: RefObject<HTMLDivElement | null>;
  'aria-label'?: string;
}

function VerticalTimeline({
  children,
  dir = 'ltr',
  intent = 'primary',
  size = 'md',
  gradient = 'purple-blue',
  visuals = 'none',
  shape = 'circle',
  className,
  progressClassName,
  ref,
  'aria-label': ariaLabel = 'Timeline',
}: VerticalTimelineProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  const combinedRef = useMergeRefs(scrollContainerRef, ref);

  const [containerHeight, setContainerHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [pinWidth, setPinWidth] = useState(0);
  const [pinMargin, setPinMargin] = useState<[number, number]>([0, 0]);

  const orientation = 'vertical' as const;

  const { header, items } = (() => {
    let headerElement: ReactNode = null;
    const itemElements: ReactElement[] = [];

    Children.forEach(children, (child) => {
      if (isValidElement(child)) {
        const childType = child.type as {
          displayName?: string;
          name?: string;
          __isTimelineHeader?: boolean;
          __isTimelineItem?: boolean;
        };

        if (childType.__isTimelineHeader) {
          headerElement = child;
        } else if (childType.__isTimelineItem) {
          itemElements.push(child);
        }
      }
    });

    return { header: headerElement, items: itemElements };
  })();

  const itemCount = items.length;

  useEffect(() => {
    const updateSizes = () => {
      if (!scrollContainerRef.current) return;

      const rect = scrollContainerRef.current.getBoundingClientRect();
      setContainerHeight(rect.height);
      setContentHeight(scrollContainerRef.current.scrollHeight);

      if (pinRef.current) {
        const pinRect = pinRef.current.getBoundingClientRect();
        setPinWidth(pinRect.width);
        const styles = getComputedStyle(pinRef.current);
        setPinMargin([
          parseFloat(styles.marginLeft || '0'),
          parseFloat(styles.marginRight || '0'),
        ]);
      }
    };

    updateSizes();

    const resizeObserver = new ResizeObserver(updateSizes);
    if (scrollContainerRef.current) {
      resizeObserver.observe(scrollContainerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
  });

  const progressHeight = useTransform(
    scrollYProgress,
    [0, 1],
    [0, Math.max(contentHeight, containerHeight)],
  );

  const progressOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const getTransformRange = (_index: number): number[][] => {
    return [
      [0, 1],
      [0, 0],
    ];
  };

  const contextValue = {
    scrollProgress: scrollYProgress,
    dir,
    itemCount,
    containerWidth: 0,
    containerHeight,
    contentHeight,
    pinWidth,
    pinMargin,
    getTransformRange,
    intent,
    orientation,
    size,
    gradient,
    visuals,
    shape,
  };

  const itemProps = {
    intent,
    orientation,
    size,
    visuals,
    shape,
    dir,
  };

  return (
    <TimelineContext value={contextValue}>
      <section
        ref={combinedRef}
        dir={dir}
        aria-label={ariaLabel}
        aria-orientation="vertical"
        className={cn(
          timelineVariants({ orientation, intent, size }),
          'relative',
          className,
        )}
      >
        <motion.div
          role="progressbar"
          aria-label="Timeline progress"
          aria-valuemin={0}
          aria-valuemax={100}
          className={cn(
            timelineProgressVariants({
              orientation,
              size,
              gradient,
              direction: dir,
              intent,
            }),
            progressClassName,
          )}
          style={{
            height: progressHeight,
            opacity: progressOpacity,
          }}
        />

        <div className="h-full">
          <div role="list" className="flex flex-col">
            {header && (
              <div ref={headerRef} className="mb-4">
                {header}
              </div>
            )}

            {items.map((item, index) =>
              cloneElement(
                item as ReactElement<{
                  index?: number;
                  pinRef?: RefObject<HTMLDivElement | null>;
                  scrollProgress?: typeof scrollYProgress;
                  [key: string]: unknown;
                }>,
                {
                  key: index,
                  index,
                  ...itemProps,
                  pinRef: index === 0 ? pinRef : undefined,
                  scrollProgress: scrollYProgress,
                },
              ),
            )}
          </div>
        </div>
      </section>
    </TimelineContext>
  );
}

export { VerticalTimeline, type VerticalTimelineProps };
