// Copyright (c) 2026 raouf.codes - Azemmur

import { cva, type VariantProps } from 'class-variance-authority';

const speedDialVariants = cva(['relative inline-flex items-center'], {
  variants: {
    orientation: {
      vertical: 'flex-col',
      horizontal: 'flex-row',
    },
    expansion: {
      normal: '',
      reverse: '',
    },
    size: {
      sm: 'gap-2',
      md: 'gap-3',
      lg: 'gap-4',
    },
    intent: {
      primary: '',
      accent: '',
      secondary: '',
      success: '',
      info: '',
      warning: '',
      error: '',
    },
    styling: {
      solid: '',
      outline: '',
      ghost: '',
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
  compoundVariants: [
    {
      orientation: 'vertical',
      expansion: 'reverse',
      className: 'flex-col-reverse',
    },
    {
      orientation: 'horizontal',
      expansion: 'reverse',
      className: 'flex-row-reverse',
    },
  ],
  defaultVariants: {
    orientation: 'vertical',
    expansion: 'reverse',
    size: 'md',
    intent: 'primary',
    styling: 'solid',
    shape: 'pill',
    elevation: 'raised',
  },
});

const speedDialMenuVariants = cva(['flex'], {
  variants: {
    orientation: {
      vertical: 'flex-col',
      horizontal: 'flex-row',
    },
    expansion: {
      normal: '',
      reverse: '',
    },
    size: {
      sm: 'gap-2',
      md: 'gap-3',
      lg: 'gap-4',
    },
  },
  compoundVariants: [
    {
      orientation: 'vertical',
      expansion: 'reverse',
      className: 'flex-col-reverse',
    },
    {
      orientation: 'horizontal',
      expansion: 'reverse',
      className: 'flex-row-reverse',
    },
  ],
  defaultVariants: {
    orientation: 'vertical',
    expansion: 'reverse',
    size: 'md',
  },
});

type SpeedDialVariantProps = VariantProps<typeof speedDialVariants>;

type SpeedDialOrientation = NonNullable<SpeedDialVariantProps['orientation']>;
type SpeedDialExpansion = NonNullable<SpeedDialVariantProps['expansion']>;

const SPEED_DIAL_NAVIGATION_KEYS: Record<
  SpeedDialOrientation,
  { next: 'ArrowDown' | 'ArrowRight'; prev: 'ArrowUp' | 'ArrowLeft' }
> = {
  vertical: {
    next: 'ArrowDown',
    prev: 'ArrowUp',
  },
  horizontal: {
    next: 'ArrowRight',
    prev: 'ArrowLeft',
  },
};

const SPEED_DIAL_ITEM_OFFSET: Record<
  SpeedDialOrientation,
  Record<SpeedDialExpansion, { x: number; y: number }>
> = {
  vertical: {
    normal: { x: 0, y: -10 },
    reverse: { x: 0, y: 10 },
  },
  horizontal: {
    normal: { x: -10, y: 0 },
    reverse: { x: 10, y: 0 },
  },
};

const SPEED_DIAL_BUTTON_SIZE = {
  sm: 'icon-sm',
  md: 'icon-md',
  lg: 'icon-lg',
} as const;

export {
  speedDialVariants,
  speedDialMenuVariants,
  SPEED_DIAL_NAVIGATION_KEYS,
  SPEED_DIAL_ITEM_OFFSET,
  SPEED_DIAL_BUTTON_SIZE,
  type SpeedDialVariantProps,
  type SpeedDialOrientation,
  type SpeedDialExpansion,
};
