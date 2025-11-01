'use client';

import { cn } from '@workspace/ui/lib/utils';
import { useEffect, useState } from 'react';

/* -------------------------------------------------------------------------- */
/*                                  Types                                     */
/* -------------------------------------------------------------------------- */

type IframeProps = {
  name: string;
  bigScreen?: boolean;
};

/* -------------------------------------------------------------------------- */
/*                                  Iframe                                    */
/* -------------------------------------------------------------------------- */

/**
 * Renders an iframe pointing to a local example page.
 * The URL is computed on the client side to avoid SSR issues.
 */
export default function Iframe({ name, bigScreen = false }: IframeProps) {
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);

  useEffect(() => {
    const origin = window.location.origin;
    setIframeUrl(`${origin}/examples/${name}`);
  }, [name]);

  if (!iframeUrl) return null;

  return (
    <iframe
      src={iframeUrl}
      className={cn('h-[500px] rounded-md', bigScreen && 'w-[1600px]')}
    />
  );
}
