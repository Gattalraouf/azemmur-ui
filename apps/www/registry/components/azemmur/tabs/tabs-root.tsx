'use client';

import React, {
  useId,
  useState,
  useLayoutEffect,
  useRef,
  useMemo,
  useCallback,
  ComponentProps,
} from 'react';
import { cn } from '@workspace/ui/lib/utils';
import { TabsContext } from '@/registry/components/azemmur/tabs/tabs-context';
import { TabsVariantProps } from '@/registry/components/azemmur/tabs/tabs-variants';

interface TabsRootProps extends ComponentProps<'div'>, TabsVariantProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  ltr?: boolean;
  activation?: 'auto' | 'manual';
  className?: string;
  children: React.ReactNode;
}

function TabsRoot({
  value,
  defaultValue,
  onValueChange,
  ltr = true,
  activation = 'manual',
  className,
  intent,
  styling,
  visuals,
  size,
  shape,
  children,
  ...props
}: TabsRootProps) {
  const tabsId = useId();
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');

  const activeValue = value ?? internalValue;

  const isControlled = value !== undefined;

  const triggerRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const registerTrigger = useCallback(
    (val: string, node: HTMLButtonElement | null) => {
      if (node) {
        const prevSize = triggerRefs.current.size;
        triggerRefs.current.set(val, node);
        if (!isControlled && !activeValue && prevSize === 0) {
          setInternalValue(val);
        }
      } else {
        triggerRefs.current.delete(val);
      }
    },
    [isControlled, activeValue],
  );

  const handleValueChange = useCallback(
    (next: string) => {
      if (!isControlled) setInternalValue(next);
      onValueChange?.(next);
    },
    [onValueChange, isControlled],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, val: string) => {
      const values = Array.from(triggerRefs.current.keys());
      const index = values.indexOf(val);
      if (index === -1) return;

      const forward = ltr ? 'ArrowRight' : 'ArrowLeft';
      const backward = ltr ? 'ArrowLeft' : 'ArrowRight';

      let next = index;

      if (e.key === forward) next = (index + 1) % values.length;
      else if (e.key === backward)
        next = (index - 1 + values.length) % values.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = values.length - 1;
      else return;

      e.preventDefault();
      const nextValue = values[next] ?? '';
      triggerRefs.current.get(nextValue)?.focus();
      if (activation === 'auto') handleValueChange(nextValue);
    },
    [ltr, activation, handleValueChange],
  );

  useLayoutEffect(() => {
    if (isControlled) return;
    if (!activeValue && triggerRefs.current.size > 0) {
      const first = triggerRefs.current.keys().next().value;
      if (first) setInternalValue(first);
    }
  }, [activeValue, isControlled]);

  const memoizedValue = useMemo(
    () => ({
      tabsId,
      activeValue,
      onValueChange: handleValueChange,
      registerTrigger,
      handleKeyDown,
      ltr,
      activation,
      getTriggerId: (val: string) => `${tabsId}-trigger-${val}`,
      getPanelId: (val: string) => `${tabsId}-panel-${val}`,
      intent,
      styling,
      visuals,
      size,
      shape,
    }),
    [
      tabsId,
      activeValue,
      handleValueChange,
      registerTrigger,
      handleKeyDown,
      ltr,
      activation,
      intent,
      styling,
      visuals,
      size,
      shape,
    ],
  );

  return (
    <TabsContext.Provider value={memoizedValue}>
      <div className={cn(className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export { TabsRoot, type TabsRootProps };
