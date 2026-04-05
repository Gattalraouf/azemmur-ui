'use client';

import {
  Timeline,
  type Direction,
} from '@/registry/components/azemmur/timeline';
import type { TimelineVariantProps } from '@/registry/components/azemmur/timeline/timeline-variants';

interface TimelineDemoProps extends TimelineVariantProps {
  direction?: Direction;
}

export default function TimelineDemo({
  orientation = 'horizontal',
  intent = 'primary',
  size = 'md',
  gradient = 'purple-blue',
  visuals = 'none',
  shape = 'circle',
  direction = 'ltr',
}: TimelineDemoProps) {
  const isVertical = orientation === 'vertical';

  return (
    <div className={isVertical ? 'w-full h-[500px]' : 'w-[400px] h-[400px]'}>
      <Timeline
        orientation={orientation}
        intent={intent}
        size={size}
        gradient={gradient}
        visuals={visuals}
        shape={shape}
        direction={direction}
        className="h-full"
      >
        <Timeline.Header>
          <div className="w-full h-full flex items-center justify-center">
            <h2
              className={
                isVertical ? 'text-2xl font-bold' : 'text-4xl font-bold'
              }
            >
              My Journey
            </h2>
          </div>
        </Timeline.Header>

        <Timeline.Item title="2020">
          <div className="flex flex-col gap-4 h-full justify-center">
            <h4 className="text-xl font-semibold">Started Learning</h4>
            <p className="max-w-md">
              Began the journey into web development, learning HTML, CSS, and
              JavaScript fundamentals.
            </p>
          </div>
        </Timeline.Item>

        <Timeline.Item title="2021">
          <div className="flex flex-col gap-4 h-full justify-center">
            <h4 className="text-xl font-semibold">First Projects</h4>
            <p className="max-w-md">
              Built first real-world projects using React and Node.js, exploring
              modern frameworks.
            </p>
          </div>
        </Timeline.Item>

        <Timeline.Item title="2022">
          <div className="flex flex-col gap-4 h-full justify-center">
            <h4 className="text-xl font-semibold">Professional Growth</h4>
            <p className="max-w-md">
              Joined a development team and started working on production
              applications with TypeScript.
            </p>
          </div>
        </Timeline.Item>

        <Timeline.Item title="2023">
          <div className="flex flex-col gap-4 h-full justify-center">
            <h4 className="text-xl font-semibold">Open Source</h4>
            <p className="max-w-md">
              Started contributing to open source projects and building reusable
              component libraries.
            </p>
          </div>
        </Timeline.Item>
      </Timeline>
    </div>
  );
}
