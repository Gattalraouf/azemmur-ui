// Copyright (c) 2026 raouf.codes - Azemmur

import { cva, type VariantProps } from 'class-variance-authority';

const speedDialVariants = cva(['relative inline-flex items-center'], {
  variants: {
    orientation: {
      vertical: 'flex-col',
      horizontal: 'flex-row',
    },
    direction: {
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
      direction: 'reverse',
      className: 'flex-col-reverse',
    },
    {
      orientation: 'horizontal',
      direction: 'reverse',
      className: 'flex-row-reverse',
    },
  ],
  defaultVariants: {
    orientation: 'vertical',
    direction: 'reverse',
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
    direction: {
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
      direction: 'reverse',
      className: 'flex-col-reverse',
    },
    {
      orientation: 'horizontal',
      direction: 'reverse',
      className: 'flex-row-reverse',
    },
  ],
  defaultVariants: {
    orientation: 'vertical',
    direction: 'reverse',
    size: 'md',
  },
});

type SpeedDialVariantProps = VariantProps<typeof speedDialVariants>;

const SPEED_DIAL_BUTTON_SIZE = {
  sm: 'icon-sm',
  md: 'icon-md',
  lg: 'icon-lg',
} as const;

export {
  speedDialVariants,
  speedDialMenuVariants,
  SPEED_DIAL_BUTTON_SIZE,
  type SpeedDialVariantProps,
};
