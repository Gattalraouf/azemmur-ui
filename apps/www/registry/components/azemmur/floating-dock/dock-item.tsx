// Copyright (c) 2026 raouf.codes - Azemmur

'use client';

import { cn } from '@workspace/ui/lib/utils';
import { useSpring, useTransform } from 'motion/react';
import { useRef, ComponentProps } from 'react';
import { Button } from '@/registry/components/azemmur/button';
import { useDock } from '@/registry/components/azemmur/floating-dock/dock-context';
import { DOCK_SIZE_CONFIG } from '@/registry/components/azemmur/floating-dock/dock-variants';

type DockItemData = {
  title: string;
  icon: React.ReactNode;
  href: string;
  obfuscated?: boolean;
};

interface DockItemProps extends ComponentProps<'a'> {
  item: DockItemData;
}

const SPRING_CONFIG = {
  mass: 0.1,
  stiffness: 150,
  damping: 12,
};

const DOCK_BUTTON_SIZE = {
  sm: 'icon-sm',
  md: 'icon-md',
  lg: 'icon-lg',
} as const;

function DockItem({ item, className, ...props }: DockItemProps) {
  const { mousePosition, isVertical, size, intent, styling, shape, elevation } =
    useDock();
  const internalRef = useRef<HTMLAnchorElement | null>(null);

  const sizeKey = size ?? 'md';
  const sizeConfig = DOCK_SIZE_CONFIG[sizeKey];

  const distance = useTransform(mousePosition, (val) => {
    const bounds = internalRef.current?.getBoundingClientRect() ?? {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    const scrollX = typeof window !== 'undefined' ? window.scrollX : 0;
    return isVertical
      ? val - (bounds.y + scrollY) - bounds.height / 2
      : val - (bounds.x + scrollX) - bounds.width / 2;
  });

  const animatedSize = useSpring(
    useTransform(
      distance,
      [-sizeConfig.range, 0, sizeConfig.range],
      [sizeConfig.min, sizeConfig.max, sizeConfig.min],
    ),
    SPRING_CONFIG,
  );

  const href = item.obfuscated ? undefined : item.href;

  const handleClick = item.obfuscated
    ? () => window.open(atob(item.href), '_blank', 'noopener,noreferrer')
    : undefined;

  return (
    <Button
      asChild
      size={DOCK_BUTTON_SIZE[sizeKey]}
      intent={intent}
      styling={styling}
      shape={shape}
      elevation={elevation}
      style={{ width: animatedSize, height: animatedSize }}
      className={cn('p-2', className)}
    >
      <a
        ref={internalRef}
        href={href}
        aria-label={item.title}
        title={item.title}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="flex items-center justify-center focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:opacity-95 "
        {...props}
      >
        {item.icon}
      </a>
    </Button>
  );
}

export { DockItem, type DockItemData, type DockItemProps };
