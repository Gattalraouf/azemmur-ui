// Copyright (c) 2026 raouf.codes - Azemmur

'use client';

import { cn } from '@workspace/ui/lib/utils';
import { type VariantProps } from 'class-variance-authority';
import { motion } from 'motion/react';
import type { ComponentProps } from 'react';
import { indicatorVariants } from '@/registry/components/azemmur/tabs/tabs-variants';

type TabsIndicatorProps = VariantProps<typeof indicatorVariants> &
  ComponentProps<typeof motion.div>;

function TabsIndicator({
  intent,
  styling,
  shape,
  visuals,
  className,
  ...props
}: TabsIndicatorProps) {
  return (
    <motion.div
      aria-hidden="true"
      layout
      {...props}
      className={cn(
        indicatorVariants({
          intent,
          styling,
          shape,
          visuals,
        }),
        className,
      )}
      transition={{ type: 'spring', stiffness: 400, damping: 30, mass: 1 }}
    />
  );
}

export { TabsIndicator, type TabsIndicatorProps };
