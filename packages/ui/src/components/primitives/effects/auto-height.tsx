'use client';

import {
  Slot,
  type WithAsChild,
} from '@workspace/ui/components/primitives/slot';
import { useAutoHeight } from '@workspace/ui/hooks/use-auto-height';
import {
  motion,
  type HTMLMotionProps,
  type LegacyAnimationControls,
  type TargetAndTransition,
  type Transition,
} from 'motion/react';
import * as React from 'react';


/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

/**
 * Props for the AutoHeight component.
 *
 * - Automatically measures and animates container height when content changes.
 * - Supports Framer Motion transitions and controlled animation targets.
 * - Compatible with `asChild` for composition with external elements.
 */
type AutoHeightProps = WithAsChild<
  {
    /** Content whose height changes will trigger animation. */
    children: React.ReactNode;

    /** Dependencies that trigger height re-measurement. */
    deps?: React.DependencyList;

    /** Optional motion animation overrides. */
    animate?: TargetAndTransition | LegacyAnimationControls;

    /** Custom transition configuration (defaults to spring). */
    transition?: Transition;
  } & Omit<HTMLMotionProps<'div'>, 'animate'>
>;

/* -------------------------------------------------------------------------- */
/*                                AutoHeight                                  */
/* -------------------------------------------------------------------------- */

/**
 * `AutoHeight` smoothly animates its container’s height whenever its children’s size changes.
 *
 * Useful for accordions, tab contents, or any dynamic layout where height changes frequently.
 */
function AutoHeight({
  children,
  deps = [],
  transition = {
    type: 'spring',
    stiffness: 300,
    damping: 30,
    bounce: 0,
    restDelta: 0.01,
  },
  style,
  animate,
  asChild = false,
  ...props
}: AutoHeightProps) {
  // Measure and animate to the latest height when dependencies change
  const { ref, height } = useAutoHeight<HTMLDivElement>(deps);

  // Allow composition with external elements using Slot
  const Component = asChild ? Slot : motion.div;

  return (
    <Component
      style={{ overflow: 'hidden', ...style }}
      animate={{ height, ...animate }}
      transition={transition}
      {...props}
    >
      <div ref={ref}>{children}</div>
    </Component>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Exports                                  */
/* -------------------------------------------------------------------------- */

export { AutoHeight, type AutoHeightProps };
