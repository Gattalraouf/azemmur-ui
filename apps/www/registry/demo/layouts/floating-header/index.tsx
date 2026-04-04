import { useRef } from 'react';
import {
  FloatingHeader,
  type FloatingHeaderProps,
} from '@/registry/layouts/floating-header';

interface FloatingHeaderDemoProps {
  intent: FloatingHeaderProps['intent'];
  styling: FloatingHeaderProps['styling'];
  size: FloatingHeaderProps['size'];
  shape: FloatingHeaderProps['shape'];
  elevation: FloatingHeaderProps['elevation'];
  targetWidth: FloatingHeaderProps['targetWidth'];
}

export default function FloatingHeaderDemo({
  intent,
  styling,
  size,
  shape,
  elevation,
  targetWidth,
}: FloatingHeaderDemoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={containerRef}
      className="relative h-[32rem] w-full overflow-y-auto rounded-lg border border-border"
    >
      <FloatingHeader
        intent={intent}
        styling={styling}
        size={size}
        shape={shape}
        elevation={elevation}
        targetWidth={targetWidth}
        scrollRef={containerRef}
      >
        <nav
          aria-label="Demo navigation"
          className="flex w-full items-center justify-between"
        >
          <span className="text-sm font-semibold">Azemmur</span>
          <ul className="flex gap-4 text-sm" role="list">
            <li>
              <a href="#home" className="hover:opacity-70">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:opacity-70">
                About
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:opacity-70">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </FloatingHeader>

      <div className="space-y-8 p-8 pt-24">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className="h-40 rounded-lg bg-muted/50 grid place-content-center text-muted-foreground text-sm"
          >
            Scroll to see the header transform&nbsp;&darr;
          </div>
        ))}
      </div>
    </div>
  );
}
