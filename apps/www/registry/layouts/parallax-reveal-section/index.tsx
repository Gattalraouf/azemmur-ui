// Copyright (c) 2026 raouf.codes - Azemmur

'use client';

import { cn } from '@workspace/ui/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const parallaxRevealSectionVariants = cva('relative w-full sticky top-0 z-10', {
  variants: {
    intent: {
      neutral: 'bg-background text-foreground',
      primary: 'bg-primary text-primary-foreground',
      accent: 'bg-accent text-accent-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
      success: 'bg-success text-success-foreground',
      info: 'bg-info text-info-foreground',
      warning: 'bg-warning text-warning-foreground',
      error: 'bg-error text-error-foreground',
    },
    shape: {
      rounded: 'rounded-t-md',
      sharp: 'rounded-none',
    },
  },
  defaultVariants: {
    intent: 'neutral',
    shape: 'rounded',
  },
});

type ParallaxRevealSectionProps = React.ComponentPropsWithRef<'article'> &
  VariantProps<typeof parallaxRevealSectionVariants> & {
    hero?: React.ReactNode;
  };

function ParallaxRevealSection({
  className,
  hero,
  intent,
  shape,
  children,
  ...props
}: ParallaxRevealSectionProps) {
  return (
    <article
      data-slot="parallax-reveal-section"
      className={cn(
        'relative w-full h-[100svh] overflow-y-auto',
        '[&_[data-slot=parallax-reveal-section]]:h-auto [&_[data-slot=parallax-reveal-section]]:overflow-visible',
        className,
      )}
      {...props}
    >
      <section
        data-slot="parallax-reveal-hero"
        className={cn(
          `relative w-full sticky top-0 bg-background text-foreground`,
          `[&_[data-slot=parallax-reveal-section]]:${parallaxRevealSectionVariants({ shape })}`,
        )}
      >
        {hero}
      </section>
      <section
        data-slot="parallax-reveal-content"
        className={cn(parallaxRevealSectionVariants({ intent, shape }))}
      >
        {children}
      </section>
    </article>
  );
}

export {
  ParallaxRevealSection,
  parallaxRevealSectionVariants,
  type ParallaxRevealSectionProps,
};
