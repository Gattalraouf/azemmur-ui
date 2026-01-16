// Copyright (c) 2025 raouf.codes - Azemmur

'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
} from '@/registry/components/primitives/button';
import { cn } from '@workspace/ui/lib/utils';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap',
    'select-none touch-manipulation text-sm font-medium shrink-0',
    'transition-[box-shadow,_color,_background-color,_border-color,_outline-color,_text-decoration-color,_fill,_stroke]',
    'outline-none',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    "[&_svg:not([class*='size-'])]:size-4",
    'focus-visible:ring-ring/40 focus-visible:ring-[3px] focus-visible:opacity-95',
    'aria-invalid:ring-error/20 dark:aria-invalid:ring-error/40 aria-invalid:border-error',
  ].join(' '),
  {
    variants: {
      intent: {
        primary:
          'bg-primary text-primary border-primary focus-visible:ring-primary/20 dark:focus-visible:ring-primary/40',
        accent:
          'bg-accent text-accent border-accent focus-visible:ring-accent/20 dark:focus-visible:ring-accent/40',
        secondary:
          'bg-secondary text-secondary border-secondary focus-visible:ring-secondary/20 dark:focus-visible:ring-secondary/40',
        success:
          'bg-success text-success border-success focus-visible:ring-success/20 dark:focus-visible:ring-success/40',
        info: 'bg-info text-info border-info focus-visible:ring-info/20 dark:focus-visible:ring-info/40',
        warning:
          'bg-warning text-warning border-warning focus-visible:ring-warning/20 dark:focus-visible:ring-warning/40',
        error:
          'bg-error text-error border-error focus-visible:ring-error/20 dark:focus-visible:ring-error/40',
      },
      styling: {
        solid: 'border-none',
        outline: 'border border-2 bg-transparent hover:bg-current/20',
        ghost: 'bg-transparent',
        link: 'bg-transparent underline-offset-4 hover:underline focus-visible:underline focus-visible:ring-0 focus-visible:ring-offset-0',
      },
      size: {
        sm: 'h-8 px-3 gap-1.5 has-[>svg]:px-2.5',
        md: 'h-9 px-4 py-2 has-[>svg]:px-3',
        lg: 'h-10 px-6 has-[>svg]:px-4',
        'icon-sm': 'size-8 p-0',
        'icon-md': 'size-9 p-0',
        'icon-lg': 'size-10 p-0',
      },
      shape: {
        rounded: 'rounded-md',
        pill: 'rounded-full',
        sharp: 'rounded-none',
      },
      elevation: {
        raised:
          'shadow-sm hover:shadow-md active:shadow-none hover:opacity-95 active:opacity-90',
        floating:
          'shadow-md hover:shadow-lg active:shadow-sm hover:opacity-95 active:opacity-90',
      },
    },
    compoundVariants: [
      {
        intent: 'primary',
        styling: 'solid',
        className: 'text-primary-foreground',
      },
      {
        intent: 'accent',
        styling: 'solid',
        className: 'text-accent-foreground',
      },
      {
        intent: 'secondary',
        styling: 'solid',
        className: 'text-secondary-foreground',
      },
      {
        intent: 'success',
        styling: 'solid',
        className: 'text-success-foreground',
      },
      {
        intent: 'info',
        styling: 'solid',
        className: 'text-info-foreground',
      },
      {
        intent: 'warning',
        styling: 'solid',
        className: 'text-warning-foreground',
      },
      {
        intent: 'error',
        styling: 'solid',
        className: 'text-error-foreground',
      },
      {
        styling: 'ghost',
        elevation: 'raised',
        className: 'shadow-none hover:shadow-none active:shadow-none',
      },
      {
        styling: 'ghost',
        elevation: 'floating',
        className: 'shadow-none hover:shadow-none active:shadow-none',
      },
      {
        styling: 'link',
        elevation: 'raised',
        className: 'shadow-none hover:shadow-none active:shadow-none',
      },
      {
        styling: 'link',
        elevation: 'floating',
        className: 'shadow-none hover:shadow-none active:shadow-none',
      },
    ],
    defaultVariants: {
      intent: 'primary',
      styling: 'solid',
      size: 'md',
      shape: 'rounded',
      elevation: 'raised',
    },
  },
);

type ButtonProps = ButtonPrimitiveProps & VariantProps<typeof buttonVariants>;

function Button({
  className,
  intent,
  styling,
  size,
  shape,
  elevation,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      className={cn(
        buttonVariants({
          intent,
          styling,
          size,
          shape,
          elevation,
        }),
        className,
      )}
      {...props}
    />
  );
}

export { Button, buttonVariants, type ButtonProps };
