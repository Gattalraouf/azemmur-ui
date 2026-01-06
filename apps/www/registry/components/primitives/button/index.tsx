//Copyright (c) 2025 Elliot Sutton

'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';

import {
  Slot,
  type WithAsChild,
} from '@workspace/ui/components/primitives/slot';

type ButtonProps = WithAsChild<
  HTMLMotionProps<'button'> & {
    hoverScale?: number;
    tapScale?: number;
    isFlat?: boolean;
  }
>;

function Button({
  hoverScale = 1.05,
  tapScale = 0.95,
  asChild = false,
  isFlat = false,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : motion.button;

  return (
    <Component
      {...(!isFlat && {
        whileHover: { scale: hoverScale },
        whileTap: { scale: tapScale },
      })}
      {...props}
    />
  );
}

export { Button, type ButtonProps };
