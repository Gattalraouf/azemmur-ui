// Copyright (c) 2026 raouf.codes - Azemmur

'use client';

import { cn } from '@workspace/ui/lib/utils';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

const PLACEHOLDER_BLUR =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjIyIi8+PC9zdmc+';

export const BlurImage = ({
  className,
  height = 210,
  width = 400,
  src,
  alt,
  blurDataURL,
  ...props
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className={cn('relative overflow-hidden rounded-xl', className)}>
      {isLoading && (
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      )}
      <Image
        className={cn(
          'transition duration-300 rounded-xl',
          isLoading ? 'blur-sm scale-105' : 'blur-0 scale-100',
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
