import { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@workspace/ui/lib/utils';

export const BlurImage = ({
  className,
  height,
  width,
  src,
  alt,
  ...props
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      className={cn(
        'transition duration-300 bg-reverse-custom rounded-xl',
        isLoading ? 'blur-sm' : 'blur-0',
        className,
      )}
      aria-label={alt}
      onLoadingComplete={() => setLoading(false)}
      src={src as string}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      placeholder="blur"
      blurDataURL={typeof src === 'string' ? src : undefined}
      alt={alt}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      {...props}
    />
  );
};
