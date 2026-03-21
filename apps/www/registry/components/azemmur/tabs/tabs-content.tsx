// Copyright (c) 2026 raouf.codes - Azemmur
'use client';

import { cn } from '@workspace/ui/lib/utils';
import React, { ComponentProps } from 'react';
import { useTabs } from '@/registry/components/azemmur/tabs/tabs-context';

interface TabsContentProps extends ComponentProps<'div'> {
  className?: string;
}

function TabsContent({ className, children, ...props }: TabsContentProps) {
  const { direction } = useTabs();
  return (
    <div
      dir={direction}
      className={cn('overflow-hidden', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { TabsContent, type TabsContentProps };
