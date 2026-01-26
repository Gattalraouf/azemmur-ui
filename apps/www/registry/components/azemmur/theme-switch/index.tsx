// Copyright (c) 2025 raouf.codes - Azemmur

'use client';
import { IconSunLow, IconMoon } from '@tabler/icons-react';
import { cn } from '@workspace/ui/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from 'next-themes';
import { useCallback } from 'react';
import { Button as ButtonPrimitive } from '@/registry/components/primitives/button';

const themeSwitchVariants = cva(
  [
    'inline-flex items-center justify-center',
    'select-none touch-manipulation',
    'transition-colors',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    'disabled:pointer-events-none disabled:opacity-50',
  ].join(' '),
  {
    variants: {
      intent: {
        primary: 'bg-primary text-primary border-primary',
        accent: 'bg-accent text-accent border-accent',
        secondary: 'bg-secondary text-secondary border-secondary',
      },
      size: {
        sm: 'h-6 w-6 [&_svg]:size-4',
        md: 'h-8 w-8 [&_svg]:size-5',
        lg: 'h-10 w-10 [&_svg]:size-6',
      },
      styling: {
        ghost: 'bg-transparent',
        solid: 'border-none',
        outline: 'border border-2 bg-transparent hover:bg-current/20',
      },
      shape: {
        rounded: 'rounded-md',
        pill: 'rounded-full',
        sharp: 'rounded-none',
      },
      elevation: {
        raised: 'shadow-sm hover:shadow-md active:shadow-none',
        floating: 'shadow-md hover:shadow-lg active:shadow-sm',
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
        styling: 'ghost',
        className: 'shadow-none hover:shadow-none active:shadow-none',
      },
    ],
    defaultVariants: {
      intent: 'primary',
      size: 'md',
      styling: 'ghost',
      shape: 'pill',
      elevation: 'raised',
    },
  },
);

type ThemeSwitchProps = VariantProps<typeof themeSwitchVariants> & {
  className?: string;
};

function ThemeSwitch({
  className,
  size,
  styling,
  intent,
  shape,
  elevation,
  ...props
}: ThemeSwitchProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const currentTheme = resolvedTheme ?? theme;
  const isDark = currentTheme === 'dark';

  const handleToggle = useCallback(() => {
    setTheme(isDark ? 'light' : 'dark');
  }, [setTheme, isDark]);

  const iconVariants = {
    initial: { scale: 0, rotate: -360 },
    animate: { scale: 1, rotate: 0 },
    exit: { scale: 0, rotate: 360 },
    hover: { rotate: [0, 30, -30, 0], transition: { duration: 0.4 } },
  };

  return (
    <ButtonPrimitive
      suppressHydrationWarning
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-pressed={isDark}
      className={cn(
        themeSwitchVariants({ intent, size, styling, shape, elevation }),
        className,
      )}
      onClick={handleToggle}
      {...props}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? 'sun-icon' : 'moon-icon'}
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
          {isDark ? <IconSunLow /> : <IconMoon />}
        </motion.div>
      </AnimatePresence>
    </ButtonPrimitive>
  );
}

export { ThemeSwitch, themeSwitchVariants, type ThemeSwitchProps };
