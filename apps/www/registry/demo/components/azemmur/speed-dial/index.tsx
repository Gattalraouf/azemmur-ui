'use client';

import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconMail,
  IconPlus,
} from '@tabler/icons-react';
import {
  SpeedDial,
  type SpeedDialItemData,
} from '@/registry/components/azemmur/speed-dial';
import type { SpeedDialVariantProps } from '@/registry/components/azemmur/speed-dial/speed-dial-variants';

const items: SpeedDialItemData[] = [
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

export default function SpeedDialDemo({
  orientation,
  expansion,
  size,
  intent,
  styling,
  shape,
  elevation,
}: SpeedDialVariantProps) {
  return (
    <div className="flex items-center justify-center h-[400px] w-full">
      <SpeedDial
        orientation={orientation}
        expansion={expansion}
        size={size}
        intent={intent}
        styling={styling}
        shape={shape}
        elevation={elevation}
      >
        <SpeedDial.Trigger>
          <IconPlus className="size-5" />
        </SpeedDial.Trigger>
        <SpeedDial.Menu>
          {items.map((item, index) => (
            <SpeedDial.Item key={item.title} item={item} index={index} />
          ))}
        </SpeedDial.Menu>
      </SpeedDial>
    </div>
  );
}
