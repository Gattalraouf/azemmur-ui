import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <HomeLayout className="!h-dvh flex flex-col" {...baseOptions}>
      <div className="flex-1 flex flex-col">{children}</div>
    </HomeLayout>
  );
}
