import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import ThemeSwitch from '@/registry/demo/components/azemmur/theme-switch';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <HomeLayout
      className="!h-dvh flex flex-col"
      {...baseOptions}
      themeSwitch={{
        component: <ThemeSwitch styling="solid" intent="secondary" />,
      }}
    >
      <div className="flex-1 flex flex-col">{children}</div>
    </HomeLayout>
  );
}
