'use client';

import React, { useId, useRef, useState } from 'react';
import { cn } from '@workspace/ui/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  TabTrigger,
  tabTriggerVariants,
} from '@/registry/components/azemmur/tabTrigger';

const layoutVariants = cva(
  'relative h-fit overflow-x-auto scrollbar-hide inline-flex whitespace-nowrap overflow-y-hidden',
  {
    variants: {
      intent: {
        primary: 'bg-primary text-primary border-primary',
        secondary: 'bg-secondary text-secondary border-secondary',
        accent: 'bg-accent text-accent border-accent',
      },
      visuals: {
        filled: 'px-0',
        subtle: 'bg-transparent px-8',
        classic: 'bg-transparent border-b px-8 rounded-none',
        outline: 'bg-transparent border-2 px-0',
        levitate: 'p-2',
      },
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
      shape: {
        rounded: 'rounded-md',
        pill: 'rounded-full',
        sharp: 'rounded-none',
      },
    },
    compoundVariants: [
      {
        visuals: 'classic',
        shape: ['rounded', 'pill'],
        className: 'rounded-none',
      },
      {
        intent: 'primary',
        visuals: ['filled', 'levitate'],
        className: 'bg-primary-foreground/40',
      },
      {
        intent: 'secondary',
        visuals: ['filled', 'levitate'],
        className: 'bg-secondary-foreground/40',
      },
      {
        intent: 'accent',
        visuals: ['filled', 'levitate'],
        className: 'bg-accent-foreground/40',
      },
    ],
    defaultVariants: {
      visuals: 'classic',
      size: 'md',
      shape: 'rounded',
    },
  },
);

type TabsVariantProps = VariantProps<typeof layoutVariants> &
  VariantProps<typeof tabTriggerVariants>;

interface TabsProps extends TabsVariantProps {
  tabs: string[];
  activeTabId?: number;
  onTabChange?: (tabIndex: number, tabsId: string) => void;
  className?: string;
  tabClassName?: string;
  ltr?: boolean;
}

function Tabs({
  tabs,
  activeTabId,
  onTabChange,
  className,
  tabClassName,
  ltr = true,
  intent,
  styling,
  visuals,
  size,
  shape,
}: TabsProps) {
  const tabsId = useId();
  const [internalTab, setInternalTab] = useState(0);
  const activeTab = activeTabId ?? internalTab;

  const [focusedIndex, setFocusedIndex] = useState(activeTab);

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleSelect = (index: number) => {
    setInternalTab(index);
    setFocusedIndex(index);
    onTabChange?.(index, tabsId);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const forwardKey = ltr ? 'ArrowRight' : 'ArrowLeft';
    const backwardKey = ltr ? 'ArrowLeft' : 'ArrowRight';

    let nextIndex = index;

    if (e.key === forwardKey) nextIndex = (index + 1) % tabs.length;
    else if (e.key === backwardKey)
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') nextIndex = 0;
    else if (e.key === 'End') nextIndex = tabs.length - 1;
    else return;

    e.preventDefault();
    setFocusedIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label="Navigation Tabs"
      aria-orientation="horizontal"
      dir={ltr ? 'ltr' : 'rtl'}
      className={cn(
        layoutVariants({ intent, visuals, size, shape }),
        className,
      )}
    >
      {tabs.map((tab, idx) => {
        const isActive = idx === activeTab;

        return (
          <TabTrigger
            key={`tab-${tabsId}-${idx}`}
            tabsId={tabsId}
            idx={idx}
            label={tab}
            active={isActive}
            onSelect={handleSelect}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            buttonRef={(el) => {
              tabRefs.current[idx] = el;
            }}
            intent={intent}
            styling={styling}
            shape={shape}
            visuals={visuals}
            tabClassName={tabClassName}
          />
        );
      })}
    </div>
  );
}

export { Tabs, type TabsProps, type TabsVariantProps };
