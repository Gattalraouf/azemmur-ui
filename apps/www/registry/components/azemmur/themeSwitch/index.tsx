// Copyright (c) 2025 raouf.codes - Azemmur

'use client';
import { forwardRef, useCallback } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'motion/react';
import { IconSunLow, IconMoon } from '@tabler/icons-react';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@workspace/ui/lib/utils';

import { Button as ButtonPrimitive } from '@/registry/components/primitives/button';

const themeSwitchVariants = cva(
  [
    'inline-flex items-center justify-center',
    'select-none outline-none cursor-pointer',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    "[&_svg:not([class*='size-'])]:size-4",
    'transition-transform rounded-full',
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
      size: {
        sm: "h-6 w-6 [&_svg:not([class*='size-'])]:size-4",
        md: "h-8 w-8 [&_svg:not([class*='size-'])]:size-5",
        lg: "h-10 w-10 [&_svg:not([class*='size-'])]:size-6",
      },
      styling: {
        ghost: 'bg-transparent',
        solid: '',
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
    ],
    defaultVariants: {
      intent: 'primary',
      size: 'md',
      styling: 'ghost',
    },
  },
);

type ThemeSwitchVariants = VariantProps<typeof themeSwitchVariants>;

type ThemeSwitchProps = ThemeSwitchVariants & {
  className?: string;
};

const ThemeSwitch = forwardRef<HTMLButtonElement, ThemeSwitchProps>(
  ({ className, size, styling, intent, ...props }, ref) => {
    const { theme, setTheme } = useTheme();

    const handleToggle = useCallback(() => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }, [setTheme, theme]);

    const iconVariants = {
      initial: { scale: 0, rotate: -360 },
      animate: { scale: 1, rotate: 0 },
      exit: { scale: 0, rotate: 360 },
      hover: {
        rotate: [0, 30, -30, 0],
        transition: { duration: 0.4 },
      },
    };

    return (
      <ButtonPrimitive
        ref={ref as any}
        type="button"
        hoverScale={1.3}
        tapScale={0.9}
        aria-label={
          theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'
        }
        aria-pressed={theme === 'dark'}
        className={cn(
          themeSwitchVariants({ intent, size, styling }),
          className,
        )}
        onClick={handleToggle}
        {...props}
      >
        <AnimatePresence mode="wait">
          <motion.div
            className="w-fit"
            key={theme === 'dark' ? 'sun-icon' : 'moon-icon'}
            initial="initial"
            animate="animate"
            exit="exit"
            whileHover="hover"
            variants={iconVariants}
            transition={{
              duration: 0.4,
              rotate: { duration: 0.6, delay: 0.12 },
            }}
          >
            {theme === 'dark' ? <IconSunLow /> : <IconMoon />}
          </motion.div>
        </AnimatePresence>
      </ButtonPrimitive>
    );
  },
);

export { ThemeSwitch, themeSwitchVariants, type ThemeSwitchProps };
