// Copyright (c) 2026 raouf.codes - Azemmur

'use client';

import { MotionValue } from 'motion/react';
import { createContext, use } from 'react';
import type { TimelineVariantProps } from '@/registry/components/azemmur/timeline/timeline-variants';

type Direction = 'ltr' | 'rtl';

interface TimelineContextValue extends TimelineVariantProps {
  scrollProgress: MotionValue<number>;
  dir: Direction;
  itemCount: number;
  containerWidth: number;
  containerHeight: number;
  contentHeight: number;
  pinWidth: number;
  pinMargin: [number, number];
  getTransformRange: (index: number) => number[][];
}

const TimelineContext = createContext<TimelineContextValue | null>(null);

function useTimeline() {
  const context = use(TimelineContext);
  if (!context) {
    throw new Error('Timeline components must be used within <Timeline />');
  }
  return context;
}

export {
  TimelineContext,
  useTimeline,
  type TimelineContextValue,
  type Direction,
};
