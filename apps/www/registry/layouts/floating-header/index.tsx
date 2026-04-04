// Copyright (c) 2026 raouf.codes - Azemmur

'use client';

import { cn } from '@workspace/ui/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
  type HTMLMotionProps,
} from 'motion/react';
import * as React from 'react';

const floatingHeaderVariants = cva('sticky z-50 flex items-center mx-auto', {
  variants: {
    intent: {
      primary: 'text-primary-foreground bg-primary border-primary',
      accent: 'text-accent-foreground bg-accent border-accent',
      secondary: 'text-secondary-foreground bg-secondary border-secondary',
      success: 'text-success-foreground bg-success border-success',
      warning: 'text-warning-foreground bg-warning border-warning',
      error: 'text-error-foreground bg-error border-error',
      info: 'text-info-foreground bg-info border-info',
      neutral: 'text-foreground bg-background border-border',
    },
    styling: {
      solid: 'border-none',
      outline: 'border border-2 bg-background',
      glass: 'backdrop-blur-md border-none',
    },
    size: {
      sm: 'px-4 py-2 text-sm gap-2',
      md: 'px-6 py-3 text-sm gap-3',
      lg: 'px-8 py-4 text-base gap-4',
    },
  },
  compoundVariants: [
    { intent: 'primary', styling: 'outline', className: 'text-primary' },
    { intent: 'accent', styling: 'outline', className: 'text-accent' },
    { intent: 'secondary', styling: 'outline', className: 'text-secondary' },
    { intent: 'success', styling: 'outline', className: 'text-success' },
    { intent: 'warning', styling: 'outline', className: 'text-warning' },
    { intent: 'error', styling: 'outline', className: 'text-error' },
    { intent: 'info', styling: 'outline', className: 'text-info' },
    { intent: 'neutral', styling: 'outline', className: 'text-foreground' },
    { styling: 'glass', intent: 'primary', className: 'bg-primary/60' },
    { styling: 'glass', intent: 'accent', className: 'bg-accent/60' },
    { styling: 'glass', intent: 'secondary', className: 'bg-secondary/60' },
    { styling: 'glass', intent: 'success', className: 'bg-success/60' },
    { styling: 'glass', intent: 'warning', className: 'bg-warning/60' },
    { styling: 'glass', intent: 'error', className: 'bg-error/60' },
    { styling: 'glass', intent: 'info', className: 'bg-info/60' },
    { styling: 'glass', intent: 'neutral', className: 'bg-background/60' },
  ],
  defaultVariants: {
    intent: 'neutral',
    styling: 'glass',
    size: 'md',
  },
});

const SHAPE_RADII = {
  rounded: 6,
  pill: 9999,
  sharp: 0,
} as const;

const SHADOW_CONFIG = {
  raised: {
    layerOne: {
      hOffset: [0, 0],
      vOffset: [0, 4],
      blur: [0, 6],
      spread: [0, -1],
      opacity: [0, 0.1],
    },
    layerTwo: {
      hOffset: [0, 0],
      vOffset: [0, 2],
      blur: [0, 4],
      spread: [0, -2],
      opacity: [0, 0.1],
    },
  },
  floating: {
    layerOne: {
      hOffset: [0, 0],
      vOffset: [1, 10],
      blur: [3, 15],
      spread: [0, -3],
      opacity: [0.05, 0.15],
    },
    layerTwo: {
      hOffset: [0, 0],
      vOffset: [1, 4],
      blur: [2, 6],
      spread: [-1, -4],
      opacity: [0.05, 0.15],
    },
  },
};

type FloatingHeaderShape = keyof typeof SHAPE_RADII;
type FloatingHeaderElevation = keyof typeof SHADOW_CONFIG;

type FloatingHeaderProps = Omit<HTMLMotionProps<'header'>, 'style'> &
  VariantProps<typeof floatingHeaderVariants> & {
    shape?: FloatingHeaderShape;
    elevation?: FloatingHeaderElevation;
    targetWidth?: number;
    scrollRef?: React.RefObject<HTMLElement | null>;
  };

function FloatingHeader({
  className,
  children,
  intent,
  styling,
  size,
  shape = 'rounded',
  elevation = 'raised',
  targetWidth = 85,
  scrollRef,
  ...props
}: FloatingHeaderProps) {
  const resolvedElevation: FloatingHeaderElevation = elevation ?? 'raised';

  const { scrollYProgress } = useScroll({
    ...(scrollRef ? { container: scrollRef } : {}),
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 15,
    mass: 0.8,
  });

  const motionWidth = useTransform(
    smoothProgress,
    [0, 0.2],
    ['100%', `${targetWidth}%`],
  );
  const motionRadius = useTransform(
    smoothProgress,
    [0, 0.2],
    [0, SHAPE_RADII[shape]],
  );
  const motionY = useTransform(smoothProgress, [0, 0.2], ['0rem', '1rem']);
  const motionScale = useTransform(smoothProgress, [0, 0.2], [1, 1.05]);

  const config = SHADOW_CONFIG[resolvedElevation];
  const shadowHOffset = useTransform(
    smoothProgress,
    [0, 0.2],
    config.layerOne.hOffset,
  );
  const shadowVOffset = useTransform(
    smoothProgress,
    [0, 0.2],
    config.layerOne.vOffset,
  );
  const shadowBlur = useTransform(
    smoothProgress,
    [0, 0.2],
    config.layerOne.blur,
  );
  const shadowSpread = useTransform(
    smoothProgress,
    [0, 0.2],
    config.layerOne.spread,
  );
  const shadowOpacity = useTransform(
    smoothProgress,
    [0, 0.2],
    config.layerOne.opacity,
  );
  const shadowHOffset2 = useTransform(
    smoothProgress,
    [0, 0.2],
    config.layerTwo.hOffset,
  );
  const shadowVOffset2 = useTransform(
    smoothProgress,
    [0, 0.2],
    config.layerTwo.vOffset,
  );
  const shadowBlur2 = useTransform(
    smoothProgress,
    [0, 0.2],
    config.layerTwo.blur,
  );
  const shadowSpread2 = useTransform(
    smoothProgress,
    [0, 0.2],
    config.layerTwo.spread,
  );
  const shadowOpacity2 = useTransform(
    smoothProgress,
    [0, 0.2],
    config.layerTwo.opacity,
  );
  const motionShadow = useMotionTemplate`${shadowHOffset}px ${shadowVOffset}px ${shadowBlur}px ${shadowSpread}px oklch(from var(--primary) l c h / ${shadowOpacity}), ${shadowHOffset2}px ${shadowVOffset2}px ${shadowBlur2}px ${shadowSpread2}px oklch(from var(--primary) l c h / ${shadowOpacity2})`;

  return (
    <motion.header
      role="banner"
      data-slot="floating-header"
      className={cn(
        floatingHeaderVariants({ intent, styling, size }),
        className,
      )}
      style={{
        width: motionWidth,
        borderRadius: motionRadius,
        boxShadow: motionShadow,
        top: motionY,
        scale: motionScale,
      }}
      {...props}
    >
      {children}
    </motion.header>
  );
}

export { FloatingHeader, floatingHeaderVariants, type FloatingHeaderProps };
