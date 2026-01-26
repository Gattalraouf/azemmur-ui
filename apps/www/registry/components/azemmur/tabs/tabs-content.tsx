'use client';

import React, { ComponentProps } from 'react';
import { cn } from '@workspace/ui/lib/utils';
import { useTabs } from '@/registry/components/azemmur/tabs/tabs-context';

interface TabsContentProps extends ComponentProps<'div'> {
  className?: string;
}

function TabsContent({ className, children, ...props }: TabsContentProps) {
  const { ltr } = useTabs();
  return (
    <div
      dir={ltr ? 'ltr' : 'rtl'}
      className={cn('overflow-hidden', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { TabsContent, type TabsContentProps };
