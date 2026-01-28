// Copyright (c) 2026 raouf.codes - Azemmur
'use client';

import { cn } from '@workspace/ui/lib/utils';
import React, { ComponentProps } from 'react';
import { useTabs } from '@/registry/components/azemmur/tabs/tabs-context';
import { listVariants } from '@/registry/components/azemmur/tabs/tabs-variants';

interface TabsListProps extends ComponentProps<'div'> {
  className?: string;
}

function TabsList({ className, children, ...props }: TabsListProps) {
  const { ltr, intent, visuals, size, shape } = useTabs();
  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      dir={ltr ? 'ltr' : 'rtl'}
      className={cn(listVariants({ intent, visuals, size, shape }), className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { TabsList, type TabsListProps };
