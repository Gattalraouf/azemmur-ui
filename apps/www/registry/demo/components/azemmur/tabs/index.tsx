'use client';

import React from 'react';
import { Tabs } from '@/registry/components/azemmur/tabs';
import { TabsVariantProps } from '@/registry/components/azemmur/tabs/tabs-variants';

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
  return (
    <Tabs
      defaultValue="profile"
      intent={intent}
      visuals={visuals}
      styling={styling}
      shape={shape}
      size={size}
      ltr={ltr}
      className="bg-card border rounded-xl p-4"
    >
      <Tabs.List>
        <Tabs.Trigger
          value="profile"
          className="flex-1"
          triggerClassName="gap-2"
        >
          Profile
        </Tabs.Trigger>

        <Tabs.Trigger
          value="notifications"
          className="flex-1"
          triggerClassName="gap-2"
        >
          Notifications
        </Tabs.Trigger>

        <Tabs.Trigger
          value="security"
          className="flex-1"
          triggerClassName="gap-2"
        >
          Security
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content>
        <Tabs.Panel value="profile">
          <h2 className="text-lg font-semibold">Public Profile</h2>
          <p className="text-muted-foreground text-sm">
            Update your bio and avatar.
          </p>
          {/* Form components here */}
        </Tabs.Panel>

        <Tabs.Panel value="notifications">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <p className="text-muted-foreground text-sm">
            Manage how you receive alerts.
          </p>
        </Tabs.Panel>

        <Tabs.Panel value="security">
          <h2 className="text-lg font-semibold">Security Settings</h2>
          <p className="text-muted-foreground text-sm">
            Two-factor authentication and passwords.
          </p>
        </Tabs.Panel>
      </Tabs.Content>
    </Tabs>
  );
}
