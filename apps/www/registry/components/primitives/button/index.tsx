//Copyright (c) 2025 Elliot Sutton
// Copyright (c) 2026 raouf.codes - Azemmur

'use client';

import {
  Slot,
  type WithAsChild,
} from '@workspace/ui/components/primitives/slot';
import { cn } from '@workspace/ui/lib/utils';
import { motion, type HTMLMotionProps } from 'motion/react';
import * as React from 'react';

type ButtonProps = WithAsChild<
  HTMLMotionProps<'button'> & {
    hoverScale?: number;
    tapScale?: number;
  }
>;

function Button({
  hoverScale = 1.05,
  tapScale = 0.95,
  asChild = false,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : motion.button;

  return (
    <Component
      {...props}
      className={cn('cursor-pointer', props.className)}
      whileHover={{ scale: hoverScale }}
      whileTap={{ scale: tapScale }}
    />
  );
}

export { Button, type ButtonProps };
