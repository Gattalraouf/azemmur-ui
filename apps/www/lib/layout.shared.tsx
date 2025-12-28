import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Logo from '@/components/logos/logo';

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: <Logo className="w-40 p-2" />,
  },
  links: [],
};
