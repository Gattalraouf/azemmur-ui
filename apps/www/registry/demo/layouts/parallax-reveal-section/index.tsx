import {
  ParallaxRevealSection,
  type ParallaxRevealSectionProps,
} from '@/registry/layouts/parallax-reveal-section';

interface ParallaxRevealSectionDemoProps {
  intent: ParallaxRevealSectionProps['intent'];
  shape: ParallaxRevealSectionProps['shape'];
}

export default function ParallaxRevealSectionDemo({
  intent,
  shape,
}: ParallaxRevealSectionDemoProps) {
  return (
    <div className="relative h-[20rem] border border-border">
      <ParallaxRevealSection
        className="h-full"
        intent={intent}
        shape={shape}
        hero={
          <div className="flex flex-col items-center gap-4 p-8 py-24">
            <h2 className="text-3xl font-bold">Hero Section</h2>
            <p className="max-w-md text-center opacity-75">
              The section fills this fixed-height parent and keeps the hero
              pinned while content scrolls.
            </p>
          </div>
        }
      >
        <ParallaxRevealSection
          intent="success"
          shape={shape}
          hero={
            <div className="flex flex-col items-center gap-4 p-8 py-24 bg-warning">
              <h2 className="text-3xl font-bold">Nested Hero</h2>
              <p className="max-w-md text-center opacity-75">
                Nested sections inherit the same behavior with no refs or
                runtime measurement.
              </p>
            </div>
          }
        >
          <div className="flex flex-col items-center justify-center gap-4 p-8 py-24">
            <h3 className="text-2xl font-bold">Reveal Section</h3>
            <p className="max-w-md text-center opacity-75">
              This panel overlaps the hero as the user scrolls, creating a
              parallax depth effect.
            </p>
          </div>
        </ParallaxRevealSection>
      </ParallaxRevealSection>
    </div>
  );
}
