'use client';

import React from 'react';
import {
  Tabs,
  type TabsVariantProps,
} from '@/registry/components/azemmur/tabs';

interface TabsDemoProps {
  intent?: TabsVariantProps['intent'];
  styling?: TabsVariantProps['styling'];
  visuals?: TabsVariantProps['visuals'];
  size?: TabsVariantProps['size'];
  shape?: TabsVariantProps['shape'];
  ltr?: boolean;
}
export default function TabsDemo({
  ltr = true,
  intent,
  styling,
  visuals,
  size,
  shape,
}: TabsDemoProps) {
  const tabs: string[] = ['fetching', 'caching', 'mutations'];

  const [active, setActive] = React.useState<number>(0);

  return (
    <div className="max-w-xl space-y-4">
      <Tabs
        tabs={tabs}
        ltr={ltr}
        intent={intent}
        styling={styling}
        visuals={visuals}
        size={size}
        shape={shape}
        activeTabId={active}
        onTabChange={setActive}
      />

      <div className="text-sm text-muted-foreground">Active tab: {active}</div>
    </div>
  );
}
