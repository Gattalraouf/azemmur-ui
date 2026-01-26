'use client';

import { cn } from '@workspace/ui/lib/utils';
import { Label as LabelPrimitive } from 'radix-ui';
import * as React from 'react';

/* -------------------------------------------------------------------------- */
/*                                  Label                                     */
/* -------------------------------------------------------------------------- */

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className,
      )}
      {...props}
    />
  );
}

export { Label };
