// Copyright (c) 2026 raouf.codes - Azemmur

'use client';

import { cn } from '@workspace/ui/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

const PLACEHOLDER_BLUR =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjIyIi8+PC9zdmc+';

const blurImageVariants = cva('relative overflow-hidden border-2', {
  variants: {
    intent: {
      primary: 'border-primary',
      accent: 'border-accent',
      secondary: 'border-secondary',
      success: 'border-success',
      info: 'border-info',
      warning: 'border-warning',
      error: 'border-error',
      neutral: 'border-border',
    },
    visuals: {
      solid: '',
      dashed: 'border-dashed',
      dotted: 'border-dotted',
      none: 'border-none bg-transparent',
    },
    shape: {
      rounded: 'rounded-xl',
      pill: 'rounded-full',
      sharp: 'rounded-none',
    },
    elevation: {
      none: '',
      raised: 'shadow-md',
      floating: 'shadow-lg',
    },
  },
  defaultVariants: {
    shape: 'rounded',
    visuals: 'none',
    intent: 'neutral',
    elevation: 'none',
  },
});

type BlurImageProps = Omit<ImageProps, 'size'> &
  VariantProps<typeof blurImageVariants>;

const BlurImage = ({
  className,
  height = 210,
  width = 400,
  src,
  alt,
  blurDataURL,
  shape,
  visuals,
  intent,
  elevation,
  ...props
}: BlurImageProps) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <div
      className={cn(blurImageVariants({ shape, visuals, intent, elevation }))}
    >
      {isLoading && (
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      )}
      <Image
        className={cn(
          'transition duration-300',
          shape === 'pill'
            ? 'rounded-full'
            : shape === 'sharp'
              ? 'rounded-none'
              : 'rounded-xl',
          isLoading ? 'blur-sm scale-105' : 'blur-0 scale-100',
          className,
        )}
        aria-label={alt}
        onLoad={() => setLoading(false)}
        src={src as string}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        placeholder="blur"
        blurDataURL={blurDataURL ?? PLACEHOLDER_BLUR}
        alt={alt}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        {...props}
      />
    </div>
  );
};

export { BlurImage, blurImageVariants, type BlurImageProps };
