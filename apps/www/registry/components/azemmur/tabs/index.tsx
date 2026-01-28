// Copyright (c) 2026 raouf.codes - Azemmur

import { TabsContent } from '@/registry/components/azemmur/tabs/tabs-content';
import { TabsList } from '@/registry/components/azemmur/tabs/tabs-list';
import { TabPanel } from '@/registry/components/azemmur/tabs/tabs-panel';
import { TabsRoot } from '@/registry/components/azemmur/tabs/tabs-root';
import { TabTrigger } from '@/registry/components/azemmur/tabs/tabs-trigger';

type TabsComponent = typeof TabsRoot & {
  List: typeof TabsList;
  Trigger: typeof TabTrigger;
  Content: typeof TabsContent;
  Panel: typeof TabPanel;
};

const Tabs = TabsRoot as TabsComponent;

Tabs.Trigger = TabTrigger;
Tabs.List = TabsList;
Tabs.Content = TabsContent;
Tabs.Panel = TabPanel;

export { Tabs };
