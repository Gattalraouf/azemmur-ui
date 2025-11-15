import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Logo from '@/components/logo';

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: <Logo className='h-4'/>,
  },
  links: [],
};
