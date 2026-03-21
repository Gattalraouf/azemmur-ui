// Copyright (c) 2026 raouf.codes - Azemmur

'use client';

import type { Direction } from '@/registry/components/azemmur/timeline/timeline-context';
import { TimelineHeader } from '@/registry/components/azemmur/timeline/timeline-header';
import {
  HorizontalTimeline,
  type HorizontalTimelineProps,
} from '@/registry/components/azemmur/timeline/timeline-horizontal';
import { TimelineItem } from '@/registry/components/azemmur/timeline/timeline-item';
import {
  TimelineRoot,
  type TimelineRootProps,
} from '@/registry/components/azemmur/timeline/timeline-root';
import type {
  TimelineVariantProps,
  TimelineItemVariantProps,
} from '@/registry/components/azemmur/timeline/timeline-variants';
import {
  VerticalTimeline,
  type VerticalTimelineProps,
} from '@/registry/components/azemmur/timeline/timeline-vertical';

const Timeline = Object.assign(TimelineRoot, {
  Header: TimelineHeader,
  Item: TimelineItem,
  Horizontal: HorizontalTimeline,
  Vertical: VerticalTimeline,
});

export {
  Timeline,
  TimelineRoot,
  TimelineHeader,
  TimelineItem,
  HorizontalTimeline,
  VerticalTimeline,
};
export type {
  Direction,
  TimelineRootProps,
  TimelineVariantProps,
  TimelineItemVariantProps,
  HorizontalTimelineProps,
  VerticalTimelineProps,
};
