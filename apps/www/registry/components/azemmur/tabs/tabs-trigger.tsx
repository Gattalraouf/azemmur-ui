// Copyright (c) 2025 raouf.codes - Azemmur

import React, {
  useEffect,
  useRef,
  ComponentPropsWithoutRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { Button as ButtonPrimitive } from '@/registry/components/primitives/button';
import { cn } from '@workspace/ui/lib/utils';
import { TabsIndicator as Indicator } from '@/registry/components/azemmur/tabs/tabs-indicator';
import { useTabs } from '@/registry/components/azemmur/tabs/tabs-context';
import { triggerVariants } from '@/registry/components/azemmur/tabs/tabs-variants';

interface TabTriggerProps extends Omit<
  ComponentPropsWithoutRef<typeof ButtonPrimitive>,
  'asChild'
> {
  value: string;
  triggerClassName?: string;
  indicatorClassName?: string;
}

const TabTrigger = forwardRef<HTMLButtonElement, TabTriggerProps>(
  (
    {
      value,
      children,
      className,
      triggerClassName,
      indicatorClassName,
      ...props
    },
    forwardedRef,
  ) => {
    const {
      tabsId,
      activeValue,
      onValueChange,
      registerTrigger,
      handleKeyDown,
      getTriggerId,
      getPanelId,
      intent,
      styling,
      visuals,
      shape,
    } = useTabs();
    const isActive = value === activeValue;
    const internalRef = useRef<HTMLButtonElement>(null);

    useImperativeHandle(forwardedRef, () => internalRef.current!);

    useEffect(() => {
      registerTrigger(value, internalRef.current);
      return () => registerTrigger(value, null);
    }, [value, registerTrigger]);

    return (
      <div
        role="tab"
        aria-selected={isActive}
        aria-controls={getPanelId(value)}
        className={cn('relative inline-block', className)}
      >
        {isActive && (
          <Indicator
            layoutId={`active-tab-${tabsId}`}
            className={indicatorClassName}
            aria-selected={isActive}
            data-state={isActive ? 'active' : 'inactive'}
            intent={intent}
            styling={styling}
            visuals={visuals}
            shape={shape}
          />
        )}

        <ButtonPrimitive
          id={getTriggerId(value)}
          ref={internalRef}
          data-state={isActive ? 'active' : 'inactive'}
          tabIndex={isActive ? 0 : -1}
          onClick={(e) => {
            onValueChange(value);
            props.onClick?.(e);
          }}
          onKeyDown={(e) => {
            handleKeyDown(e, value);
            props.onKeyDown?.(e);
          }}
          className={cn(
            triggerVariants({
              intent,
              visuals,
              styling,
              shape,
            }),
            triggerClassName,
          )}
          {...props}
        >
          {children}
        </ButtonPrimitive>
      </div>
    );
  },
);

TabTrigger.displayName = 'TabTrigger';

export { TabTrigger, type TabTriggerProps };
