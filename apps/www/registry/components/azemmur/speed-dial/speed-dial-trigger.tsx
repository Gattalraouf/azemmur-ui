// Copyright (c) 2026 raouf.codes - Azemmur

'use client';

import { cn } from '@workspace/ui/lib/utils';
import { Button } from '@/registry/components/azemmur/button';
import { useSpeedDial } from '@/registry/components/azemmur/speed-dial/speed-dial-context';
import { SPEED_DIAL_BUTTON_SIZE } from '@/registry/components/azemmur/speed-dial/speed-dial-variants';

interface SpeedDialTriggerProps {
  children: React.ReactNode;
  className?: string;
}

function SpeedDialTrigger({ children, className }: SpeedDialTriggerProps) {
  const { open, setOpen, size, intent, styling, shape, elevation } =
    useSpeedDial();

  const sizeKey = size ?? 'md';

  return (
    <Button
      onClick={() => setOpen((prev) => !prev)}
      aria-expanded={open}
      aria-controls="speed-dial-menu"
      aria-label={open ? 'Close speed dial menu' : 'Open speed dial menu'}
      size={SPEED_DIAL_BUTTON_SIZE[sizeKey]}
      intent={intent}
      styling={styling}
      shape={shape}
      elevation={elevation}
      className={cn(
        'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/60',
        className,
      )}
    >
      {children}
    </Button>
  );
}

export { SpeedDialTrigger, type SpeedDialTriggerProps };
