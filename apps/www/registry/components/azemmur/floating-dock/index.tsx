// Copyright (c) 2026 raouf.codes - Azemmur

import {
  DockItem,
  type DockItemData,
} from '@/registry/components/azemmur/floating-dock/dock-item';
import { DockRoot } from '@/registry/components/azemmur/floating-dock/dock-root';
import { DockSeparator } from '@/registry/components/azemmur/floating-dock/dock-separator';

type FloatingDockComponent = typeof DockRoot & {
  Item: typeof DockItem;
  Separator: typeof DockSeparator;
};

const FloatingDock = DockRoot as FloatingDockComponent;

FloatingDock.Item = DockItem;
FloatingDock.Separator = DockSeparator;

export { FloatingDock, type DockItemData };
