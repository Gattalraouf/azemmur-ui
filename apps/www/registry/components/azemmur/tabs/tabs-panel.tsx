// Copyright (c) 2026 raouf.codes - Azemmur

'use client';

import { cn } from '@workspace/ui/lib/utils';
import { motion } from 'motion/react';
import React, { type ComponentProps } from 'react';
import { useTabs } from '@/registry/components/azemmur/tabs/tabs-context';

export interface TabPanelProps extends ComponentProps<typeof motion.div> {
  value: string;
}

export function TabPanel({
  value,
  children,
  className,
  ...props
}: TabPanelProps) {
  const { activeValue, getPanelId, getTriggerId } = useTabs();
  const isActive = activeValue === value;

  if (!isActive) return null;

  return (
    <motion.div
      key={value}
      role="tabpanel"
      id={getPanelId(value)}
      aria-labelledby={getTriggerId(value)}
      tabIndex={0}
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: '0%' }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={cn(
        'mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
