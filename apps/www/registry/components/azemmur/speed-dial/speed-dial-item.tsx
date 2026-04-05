// Copyright (c) 2026 raouf.codes - Azemmur

'use client';

import { cn } from '@workspace/ui/lib/utils';
import { motion } from 'motion/react';
import { type ComponentProps } from 'react';
import { Button } from '@/registry/components/azemmur/button';
import { useSpeedDial } from '@/registry/components/azemmur/speed-dial/speed-dial-context';
import {
  SPEED_DIAL_BUTTON_SIZE,
  SPEED_DIAL_ITEM_OFFSET,
} from '@/registry/components/azemmur/speed-dial/speed-dial-variants';

type SpeedDialItemData = {
  title: string;
  icon: React.ReactNode;
  href: string;
  obfuscated?: boolean;
};

interface SpeedDialItemProps extends ComponentProps<'a'> {
  item: SpeedDialItemData;
  index?: number;
}

function SpeedDialItem({
  item,
  index = 0,
  className,
  ...props
}: SpeedDialItemProps) {
  const {
    size,
    intent,
    styling,
    shape,
    elevation,
    setOpen,
    orientation,
    expansion,
  } = useSpeedDial();

  const sizeKey = size ?? 'md';
  const orientationKey = orientation ?? 'vertical';
  const expansionKey = expansion ?? 'reverse';
  const href = item.obfuscated ? undefined : item.href;

  const handleClick = item.obfuscated
    ? () => {
        window.open(atob(item.href), '_blank', 'noopener,noreferrer');
        setOpen(false);
      }
    : () => setOpen(false);

  const initialOffset = SPEED_DIAL_ITEM_OFFSET[orientationKey][expansionKey];
  const animateOffset = { x: 0, y: 0 };

  return (
    <motion.div
      initial={{ opacity: 0, ...initialOffset, scale: 0.8 }}
      animate={{ opacity: 1, ...animateOffset, scale: 1 }}
      exit={{ opacity: 0, ...initialOffset, scale: 0.8 }}
      transition={{
        delay: index * 0.05,
        duration: 0.15,
        ease: 'easeOut',
      }}
    >
      <Button
        asChild
        size={SPEED_DIAL_BUTTON_SIZE[sizeKey]}
        intent={intent}
        styling={styling}
        shape={shape}
        elevation={elevation}
        className="p-2"
      >
        <a
          href={href}
          role="menuitem"
          aria-label={item.title}
          title={item.title}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className={cn(
            'flex items-center justify-center focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/60',
            className,
          )}
          {...props}
        >
          {item.icon}
        </a>
      </Button>
    </motion.div>
  );
}

export { SpeedDialItem, type SpeedDialItemProps, type SpeedDialItemData };
