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

interface HorizontalTimelineProps extends TimelineVariantProps {
  children: ReactNode;
  className?: string;
  progressClassName?: string;
  ref?: RefObject<HTMLDivElement | null>;
  containerScrollRef?: RefObject<HTMLElement | null>;
  'aria-label'?: string;
}

function HorizontalTimeline({
  children,
  direction,
  intent = 'primary',
  size = 'md',
  gradient = 'purple-blue',
  visuals = 'none',
  shape = 'circle',
  className,
  progressClassName,
  ref,
  containerScrollRef,
  'aria-label': ariaLabel = 'Timeline',
}: HorizontalTimelineProps) {
  const resolvedDirection = direction ?? 'ltr';
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const timelineRowRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  const combinedRef = useMergeRefs(scrollContainerRef, ref);
  const scrollSourceRef = containerScrollRef ?? scrollContainerRef;

  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [headerWidth, setHeaderWidth] = useState(0);
  const [fullWidth, setFullWidth] = useState(0);
  const [pinWidth, setPinWidth] = useState(0);
  const [pinMargin, setPinMargin] = useState<[number, number]>([0, 0]);

  const isRTL = resolvedDirection === 'rtl';
  const orientation = 'horizontal' as const;

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
      setContainerWidth(rect.width);
      setContainerHeight(rect.height);

      if (timelineRowRef.current) {
        setFullWidth(timelineRowRef.current.getBoundingClientRect().width);
      }

      if (headerRef.current) {
        setHeaderWidth(headerRef.current.getBoundingClientRect().width);
      }

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
    container: scrollSourceRef,
  });

  const progressWidth = useTransform(
    scrollYProgress,
    [0, 1],
    [headerWidth + pinWidth + 2 * pinMargin[1], containerWidth],
  );

  const progressOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const limit = isRTL
    ? fullWidth - containerWidth
    : -(fullWidth - containerWidth);

  const scrollX = useTransform(scrollYProgress, [0, 1], [0, limit]);

  const itemStops = Array.from(
    { length: itemCount },
    (_, i) => (containerWidth / itemCount) * i,
  );

  const getTransformRange = (index: number): number[][] => {
    if (containerWidth === 0 || itemCount === 0) {
      return [
        [0, 1],
        [0, 0],
      ];
    }

    const startStop = itemStops[index] ?? 0;
    const endStop =
      index === itemCount - 1
        ? containerWidth
        : (itemStops[index + 1] ?? containerWidth);

    const outputRange = isRTL
      ? [-pinMargin[1], -(containerWidth - pinWidth - 3 * pinMargin[0])]
      : [pinMargin[0], containerWidth - pinWidth - 3 * pinMargin[1]];

    const inputRange = [startStop / containerWidth, endStop / containerWidth];

    return [inputRange, outputRange];
  };

  const contextValue = {
    scrollProgress: scrollYProgress,
    direction: resolvedDirection,
    itemCount,
    containerWidth,
    containerHeight,
    contentHeight: 0,
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

  const scrollHeight = containerWidth * itemCount;

  const itemProps = {
    intent,
    orientation,
    size,
    visuals,
    shape,
    direction: resolvedDirection,
  };

  return (
    <TimelineContext value={contextValue}>
      <section
        ref={combinedRef}
        dir={resolvedDirection}
        aria-label={ariaLabel}
        className={cn(
          timelineVariants({ orientation, intent, size }),
          className,
        )}
      >
        <div style={{ height: scrollHeight }}>
          <div
            className="sticky top-0 h-full"
            style={{ height: containerHeight }}
          >
            <div className="w-full bg-transparent">
              <div className="relative w-full">
                <motion.div
                  aria-hidden="true"
                  className={cn(
                    timelineProgressVariants({
                      orientation,
                      size,
                      gradient,
                      direction: resolvedDirection,
                      intent,
                    }),
                    progressClassName,
                  )}
                  style={{
                    width: progressWidth,
                    opacity: progressOpacity,
                  }}
                />
              </div>
            </div>

            <div className="h-full w-max flex flex-row">
              <motion.div
                ref={timelineRowRef}
                className="mx-auto py-3 flex flex-row h-full"
                style={{ x: scrollX }}
              >
                {header && (
                  <div ref={headerRef}>
                    {cloneElement(
                      header as ReactElement<{
                        orientation?: 'horizontal' | 'vertical';
                        direction?: Direction;
                      }>,
                      {
                        orientation:
                          (
                            header as ReactElement<{
                              orientation?: 'horizontal' | 'vertical';
                            }>
                          ).props.orientation ?? orientation,
                        direction:
                          (
                            header as ReactElement<{
                              direction?: Direction;
                            }>
                          ).props.direction ?? resolvedDirection,
                      },
                    )}
                  </div>
                )}

                <div role="list" className="flex flex-row h-full">
                  {items.map((item, index) =>
                    cloneElement(
                      item as ReactElement<{
                        index?: number;
                        pinRef?: RefObject<HTMLDivElement | null>;
                        scrollProgress?: typeof scrollYProgress;
                        transformsRange?: number[][];
                        [key: string]: unknown;
                      }>,
                      {
                        key: index,
                        index,
                        ...itemProps,
                        pinRef: index === 0 ? pinRef : undefined,
                        scrollProgress: scrollYProgress,
                        transformsRange: getTransformRange(index),
                      },
                    ),
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </TimelineContext>
  );
}

export { HorizontalTimeline, type HorizontalTimelineProps };
