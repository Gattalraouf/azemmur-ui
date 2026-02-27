'use client';

import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconMail,
} from '@tabler/icons-react';
import {
  FloatingDock,
  type DockItemData,
} from '@/registry/components/azemmur/floating-dock';
import type { DockVariantProps } from '@/registry/components/azemmur/floating-dock/dock-variants';

const firstSet: DockItemData[] = [
  {
    title: 'GitHub',
    icon: <IconBrandGithub className="size-full" />,
    href: 'https://github.com',
  },
  {
    title: 'LinkedIn',
    icon: <IconBrandLinkedin className="size-full" />,
    href: 'https://linkedin.com',
  },
];
const secondSet: DockItemData[] = [
  {
    title: 'X (Twitter)',
    icon: <IconBrandX className="size-full" />,
    href: 'https://x.com',
  },
  {
    title: 'Email',
    icon: <IconMail className="size-full" />,
    href: 'bWFpbHRvOmhlbGxvQGV4YW1wbGUuY29t',
    obfuscated: true,
  },
];

export default function FloatingDockDemo({
  orientation,
  size,
  intent,
  styling,
  shape,
  elevation,
}: DockVariantProps) {
  return (
    <div className="flex items-center justify-center h-[400px] w-full">
      <FloatingDock
        orientation={orientation}
        size={size}
        intent={intent}
        styling={styling}
        shape={shape}
        elevation={elevation}
      >
        {firstSet.map((item, i) => (
          <FloatingDock.Item
            key={item.title}
            item={item}
            tabIndex={i === 0 ? 0 : -1}
          />
        ))}
        <FloatingDock.Separator />
        {secondSet.map((item, i) => (
          <FloatingDock.Item
            key={item.title}
            item={item}
            tabIndex={i === 0 ? 0 : -1}
          />
        ))}
      </FloatingDock>
    </div>
  );
}
