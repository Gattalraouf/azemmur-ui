'use client';

import { createContext, useContext } from 'react';
import { TabsVariantProps } from '@/registry/components/azemmur/tabs/tabs-variants';

interface TabsContextValue extends TabsVariantProps {
  tabsId: string;
  ltr: boolean;
  activeValue?: string;
  onValueChange: (value: string) => void;
  registerTrigger: (value: string, node: HTMLButtonElement | null) => void;
  handleKeyDown: (e: React.KeyboardEvent, value: string) => void;
  getPanelId: (value: string) => string;
  getTriggerId: (value: string) => string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tab components must be used within <Tabs />');
  }
  return context;
};

export { TabsContext, useTabs };
