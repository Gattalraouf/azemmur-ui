'use client';

import { cn } from '@workspace/ui/lib/utils';
import { Switch as SwitchPrimitive } from 'radix-ui';
import * as React from 'react';


/* -------------------------------------------------------------------------- */
/*                                  Types                                     */
/* -------------------------------------------------------------------------- */

type SwitchProps = React.ComponentProps<typeof SwitchPrimitive.Root>;

/* -------------------------------------------------------------------------- */
/*                                  Switch                                    */
/* -------------------------------------------------------------------------- */

/**
 * Switch component wraps Radix UI's SwitchPrimitive and renders a toggle switch.
 * Supports controlled and uncontrolled usage via `value` or `defaultValue`.
 */
function Switch({ className, ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        'peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      {/* Switch thumb (the draggable circle) */}
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0',
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
