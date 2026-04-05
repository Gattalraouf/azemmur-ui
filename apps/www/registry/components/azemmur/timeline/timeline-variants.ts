// Copyright (c) 2026 raouf.codes - Azemmur

import { cva } from 'class-variance-authority';

const timelineVariants = cva(['relative w-full overflow-y-auto'], {
  variants: {
    orientation: {
      horizontal: 'overflow-x-hidden',
      vertical: 'overflow-x-visible px-4.5',
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
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    intent: 'primary',
    size: 'md',
  },
});

const timelineProgressVariants = cva(['absolute rounded-full'], {
  variants: {
    orientation: {
      horizontal: 'start-0',
      vertical: 'top-0',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
    },
    gradient: {
      'purple-blue': 'from-purple-500 via-blue-500 to-transparent',
      'orange-red': 'from-orange-500 via-red-500 to-transparent',
      'green-teal': 'from-green-500 via-teal-500 to-transparent',
      rainbow:
        'from-red-500 via-yellow-500 via-green-500 via-blue-500 via-purple-500 to-transparent',
      none: '',
    },
    direction: {
      ltr: '',
      rtl: '',
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
  },
  compoundVariants: [
    { orientation: 'horizontal', size: 'sm', className: 'h-[1px] top-6' },
    { orientation: 'horizontal', size: 'md', className: 'h-[2px] top-7' },
    { orientation: 'horizontal', size: 'lg', className: 'h-[3px] top-8' },
    { orientation: 'vertical', size: 'sm', className: 'w-[1px] start-7' },
    { orientation: 'vertical', size: 'md', className: 'w-[2px] start-8' },
    { orientation: 'vertical', size: 'lg', className: 'w-[3px] start-9' },
    {
      orientation: 'horizontal',
      direction: 'ltr',
      gradient: ['purple-blue', 'orange-red', 'green-teal', 'rainbow'],
      className: 'bg-gradient-to-r',
    },
    {
      orientation: 'horizontal',
      direction: 'rtl',
      gradient: ['purple-blue', 'orange-red', 'green-teal', 'rainbow'],
      className: 'bg-gradient-to-l',
    },
    {
      orientation: 'vertical',
      direction: ['ltr', 'rtl'],
      gradient: ['purple-blue', 'orange-red', 'green-teal', 'rainbow'],
      className: 'bg-gradient-to-b',
    },
    { gradient: 'none', intent: 'primary', className: 'bg-primary' },
    { gradient: 'none', intent: 'accent', className: 'bg-accent' },
    { gradient: 'none', intent: 'secondary', className: 'bg-secondary' },
    { gradient: 'none', intent: 'success', className: 'bg-success' },
    { gradient: 'none', intent: 'info', className: 'bg-info' },
    { gradient: 'none', intent: 'warning', className: 'bg-warning' },
    { gradient: 'none', intent: 'error', className: 'bg-error' },
  ],
  defaultVariants: {
    orientation: 'horizontal',
    size: 'md',
    gradient: 'purple-blue',
    direction: 'rtl',
    intent: 'primary',
  },
});

const timelineItemVariants = cva(['flex justify-start'], {
  variants: {
    orientation: {
      horizontal: 'flex-col w-full',
      vertical: 'flex-row pt-4 pb-8',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

const timelineContentVariants = cva(['relative w-full'], {
  variants: {
    orientation: {
      horizontal: 'p-8 h-full content-center',
      vertical: 'ps-6 pe-4 flex-1',
    },
    intent: {
      primary: 'bg-primary border-primary',
      accent: 'bg-accent border-accent',
      secondary: 'bg-secondary border-secondary',
      success: 'bg-success border-success',
      info: 'bg-info border-info',
      warning: 'bg-warning border-warning',
      error: 'bg-error border-error',
    },
    visuals: {
      card: 'bg-card shadow-md rounded-lg border border-border p-8',
      bordered: 'border rounded-md p-8',
      solid: 'rounded-md p-8',
      dashed: 'border-2 border-dashed rounded-md p-8',
      dotted: 'border-2 border-dotted rounded-md p-8',
      none: '',
    },
  },
  compoundVariants: [
    {
      visuals: ['bordered', 'dashed', 'dotted'],
      intent: [
        'primary',
        'accent',
        'secondary',
        'success',
        'info',
        'warning',
        'error',
      ],
      className: 'bg-transparent',
    },
    {
      visuals: 'none',
      intent: [
        'primary',
        'accent',
        'secondary',
        'success',
        'info',
        'warning',
        'error',
      ],
      className: 'bg-transparent border-0 p-0',
    },
    {
      visuals: 'solid',
      intent: 'primary',
      className: 'text-primary-foreground',
    },
    { visuals: 'solid', intent: 'accent', className: 'text-accent-foreground' },
    {
      visuals: 'solid',
      intent: 'secondary',
      className: 'text-secondary-foreground',
    },
    {
      visuals: 'solid',
      intent: 'success',
      className: 'text-success-foreground',
    },
    {
      visuals: 'solid',
      intent: 'info',
      className: 'text-info-foreground',
    },
    {
      visuals: 'solid',
      intent: 'warning',
      className: 'text-warning-foreground',
    },
    {
      visuals: 'solid',
      intent: 'error',
      className: 'text-error-foreground',
    },
  ],
  defaultVariants: {
    orientation: 'horizontal',
    visuals: 'none',
  },
});

const timelinePinVariants = cva(['flex items-center justify-center shrink-0'], {
  variants: {
    size: {
      sm: 'h-6 w-6',
      md: 'h-8 w-8',
      lg: 'h-10 w-10',
    },
    shape: {
      circle: 'rounded-full',
      ring: '',
      dot: '',
      square: 'rounded-sm',
      diamond: 'rotate-45 rounded-sm',
    },
    intent: {
      primary: 'bg-primary',
      accent: 'bg-accent',
      secondary: 'bg-secondary',
      success: 'bg-success',
      info: 'bg-info',
      warning: 'bg-warning',
      error: 'bg-error',
    },
  },
  compoundVariants: [
    {
      shape: ['ring', 'dot'],
      intent: [
        'primary',
        'accent',
        'secondary',
        'success',
        'info',
        'warning',
        'error',
      ],
      className: 'bg-transparent',
    },
  ],
  defaultVariants: {
    size: 'md',
    shape: 'circle',
    intent: 'primary',
  },
});

const timelinePinDotVariants = cva(['border'], {
  variants: {
    size: {
      sm: 'h-3 w-3',
      md: 'h-4 w-4',
      lg: 'h-5 w-5',
    },
    shape: {
      circle: 'rounded-full',
      ring: 'rounded-full',
      dot: 'rounded-full border-0',
      square: 'rounded-sm',
      diamond: 'rounded-sm',
    },
    intent: {
      primary: 'bg-primary-foreground border-primary',
      accent: 'bg-accent-foreground border-accent',
      secondary: 'bg-secondary-foreground border-secondary',
      success: 'bg-success-foreground border-success',
      info: 'bg-info-foreground border-info',
      warning: 'bg-warning-foreground border-warning',
      error: 'bg-error-foreground border-error',
    },
  },
  compoundVariants: [
    { shape: 'dot', intent: 'primary', className: 'bg-primary' },
    { shape: 'dot', intent: 'accent', className: 'bg-accent' },
    { shape: 'dot', intent: 'secondary', className: 'bg-secondary' },
    { shape: 'dot', intent: 'success', className: 'bg-success' },
    { shape: 'dot', intent: 'info', className: 'bg-info' },
    { shape: 'dot', intent: 'warning', className: 'bg-warning' },
    { shape: 'dot', intent: 'error', className: 'bg-error' },
    {
      shape: 'ring',
      intent: [
        'primary',
        'accent',
        'secondary',
        'success',
        'info',
        'warning',
        'error',
      ],
      className: 'bg-transparent ',
    },
    { shape: 'ring', size: 'sm', className: 'h-6 w-6 border-4' },
    { shape: 'ring', size: 'md', className: 'h-7 w-7 border-5' },
    { shape: 'ring', size: 'lg', className: 'h-8 w-8 border-6' },
    { shape: 'diamond', intent: 'primary', className: 'bg-primary-foreground' },
    { shape: 'diamond', intent: 'accent', className: 'bg-accent-foreground' },
    {
      shape: 'diamond',
      intent: 'secondary',
      className: 'bg-secondary-foreground',
    },
    { shape: 'diamond', intent: 'success', className: 'bg-success-foreground' },
    { shape: 'diamond', intent: 'info', className: 'bg-info-foreground' },
    { shape: 'diamond', intent: 'warning', className: 'bg-warning-foreground' },
    { shape: 'diamond', intent: 'error', className: 'bg-error-foreground' },
  ],
  defaultVariants: {
    size: 'md',
    shape: 'circle',
    intent: 'primary',
  },
});

const timelineTitleVariants = cva(['font-bold text-foreground'], {
  variants: {
    orientation: {
      horizontal: 'mt-4',
      vertical: 'mb-2 flex items-center',
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
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  compoundVariants: [
    { orientation: 'horizontal', size: 'sm', className: 'text-2xl' },
    { orientation: 'horizontal', size: 'md', className: 'text-3xl' },
    { orientation: 'horizontal', size: 'lg', className: 'text-4xl' },
    {
      orientation: 'vertical',
      size: 'sm',
      className: 'text-lg min-h-6',
    },
    {
      orientation: 'vertical',
      size: 'md',
      className: 'text-xl min-h-8',
    },
    {
      orientation: 'vertical',
      size: 'lg',
      className: 'text-2xl min-h-10',
    },
  ],
  defaultVariants: {
    orientation: 'horizontal',
    size: 'md',
  },
});

type TimelineVariantProps = {
  orientation?: 'horizontal' | 'vertical';
  intent?:
    | 'primary'
    | 'accent'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | 'error';
  size?: 'sm' | 'md' | 'lg';
  gradient?: 'purple-blue' | 'orange-red' | 'green-teal' | 'rainbow' | 'none';
  direction?: 'ltr' | 'rtl';
  visuals?: 'card' | 'bordered' | 'solid' | 'dashed' | 'dotted' | 'none';
  shape?: 'circle' | 'ring' | 'dot' | 'square' | 'diamond';
};

type TimelineItemVariantProps = Omit<TimelineVariantProps, 'gradient'>;

export {
  timelineVariants,
  timelineProgressVariants,
  timelineItemVariants,
  timelineContentVariants,
  timelinePinVariants,
  timelinePinDotVariants,
  timelineTitleVariants,
  type TimelineVariantProps,
  type TimelineItemVariantProps,
};
