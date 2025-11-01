'use client';

import { motion, type HTMLMotionProps } from 'motion/react';
import {
  Slot,
  type WithAsChild,
} from '@workspace/ui/components/primitives/slot';

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

/**
 * Animated button props supporting hover/tap scale and optional `asChild` slot rendering.
 */
type ButtonProps = WithAsChild<
  HTMLMotionProps<'button'> & {
    hoverScale?: number;
    tapScale?: number;
  }
>;

/* -------------------------------------------------------------------------- */
/*                                   Button                                   */
/* -------------------------------------------------------------------------- */

/**
 * Motion-enhanced button component that supports composability with `asChild`.
 */
function Button({
  hoverScale = 1.05,
  tapScale = 0.95,
  asChild = false,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : motion.button;

  return (
    <Component
      whileHover={{ scale: hoverScale }}
      whileTap={{ scale: tapScale }}
      {...props}
    />
  );
}
export { Button, type ButtonProps };
