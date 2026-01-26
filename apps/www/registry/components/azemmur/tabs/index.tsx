import { TabTrigger } from '@/registry/components/azemmur/tabs/tabs-trigger';
import { TabsRoot } from '@/registry/components/azemmur/tabs/tabs-root';
import { TabsList } from '@/registry/components/azemmur/tabs/tabs-list';
import { TabPanel } from '@/registry/components/azemmur/tabs/tabs-panel';
import { TabsContent } from '@/registry/components/azemmur/tabs/tabs-content';

type TabsComponent = typeof TabsRoot & {
  List: typeof import('@/registry/components/azemmur/tabs/tabs-list').TabsList;
  Trigger: typeof import('@/registry/components/azemmur/tabs/tabs-trigger').TabTrigger;

  Content: typeof import('@/registry/components/azemmur/tabs/tabs-content').TabsContent;
  Panel: typeof import('@/registry/components/azemmur/tabs/tabs-panel').TabPanel;
};

const Tabs = TabsRoot as TabsComponent;

Tabs.Trigger = TabTrigger;
Tabs.List = TabsList;
Tabs.Content = TabsContent;
Tabs.Panel = TabPanel;

export { Tabs };
