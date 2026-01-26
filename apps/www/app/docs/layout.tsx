import { MotionConfig } from 'motion/react';
import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { ThemeSwitch } from '@/registry/components/azemmur/theme-switch';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <MotionConfig reducedMotion="user">
      <DocsLayout
        tree={source.pageTree}
        {...baseOptions}
        themeSwitch={{
          component: (
            <div className="flex w-full justify-end">
              <ThemeSwitch styling="solid" intent="secondary" />
            </div>
          ),
        }}
      >
        {children}
      </DocsLayout>
    </MotionConfig>
  );
}
