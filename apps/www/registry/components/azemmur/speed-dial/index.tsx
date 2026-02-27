// Copyright (c) 2026 raouf.codes - Azemmur

import {
  SpeedDialItem,
  type SpeedDialItemData,
} from '@/registry/components/azemmur/speed-dial/speed-dial-item';
import { SpeedDialMenu } from '@/registry/components/azemmur/speed-dial/speed-dial-menu';
import { SpeedDialRoot } from '@/registry/components/azemmur/speed-dial/speed-dial-root';
import { SpeedDialTrigger } from '@/registry/components/azemmur/speed-dial/speed-dial-trigger';

type SpeedDialComponent = typeof SpeedDialRoot & {
  Trigger: typeof SpeedDialTrigger;
  Menu: typeof SpeedDialMenu;
  Item: typeof SpeedDialItem;
};

const SpeedDial = SpeedDialRoot as SpeedDialComponent;

SpeedDial.Trigger = SpeedDialTrigger;
SpeedDial.Menu = SpeedDialMenu;
SpeedDial.Item = SpeedDialItem;

export { SpeedDial, type SpeedDialItemData };
