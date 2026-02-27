// Copyright (c) 2026 raouf.codes - Azemmur

import { cva, type VariantProps } from 'class-variance-authority';

const dockVariants = cva(
  ['mx-auto flex items-center', '[&_svg]:pointer-events-none [&_svg]:shrink-0'],
  {
    variants: {
      orientation: {
        vertical: 'flex-col',
        horizontal: 'flex-row',
      },
      size: {
        sm: 'gap-2 p-2',
        md: 'gap-4 p-4',
        lg: 'gap-6 p-6',
      },
      intent: {
        primary: 'text-primary',
        accent: 'text-accent',
        secondary: 'text-secondary',
        success: 'text-success',
        info: 'text-info',
        warning: 'text-warning',
        error: 'text-error',
      },
      styling: {
        solid: '',
        outline: '',
        ghost: '',
        link: '',
      },
      shape: {
        rounded: '',
        pill: '',
        sharp: '',
      },
      elevation: {
        raised: '',
        floating: '',
      },
    },
    defaultVariants: {
      orientation: 'vertical',
      size: 'md',
      intent: 'primary',
      styling: 'solid',
      shape: 'pill',
      elevation: 'raised',
    },
  },
);

type DockSizeConfig = {
  min: number;
  max: number;
  iconMin: number;
  iconMax: number;
  range: number;
};

const DOCK_SIZE_CONFIG: Record<'sm' | 'md' | 'lg', DockSizeConfig> = {
  sm: { min: 28, max: 56, iconMin: 14, iconMax: 28, range: 100 },
  md: { min: 40, max: 80, iconMin: 20, iconMax: 40, range: 150 },
  lg: { min: 56, max: 112, iconMin: 28, iconMax: 56, range: 200 },
};

type DockVariantProps = VariantProps<typeof dockVariants>;

export { dockVariants, DOCK_SIZE_CONFIG, type DockVariantProps };
