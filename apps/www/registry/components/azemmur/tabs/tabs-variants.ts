import { cva, type VariantProps } from 'class-variance-authority';

const listVariants = cva(
  'relative inline-flex whitespace-nowrap overflow-visible gap-2',
  {
    variants: {
      intent: {
        primary: 'text-primary border-primary',
        secondary: 'text-secondary border-secondary',
        accent: 'text-accent border-accent',
      },
      visuals: {
        filled: '',
        subtle: 'bg-transparent px-8',
        classic: 'bg-transparent border-b px-8',
        outline: 'bg-transparent border-2 overflow-hidden',
        levitate: 'p-2 border-2',
      },
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
      shape: {
        rounded: 'rounded-md',
        pill: 'rounded-full',
        sharp: 'rounded-none',
      },
    },
    compoundVariants: [
      {
        visuals: 'classic',
        shape: ['rounded', 'pill'],
        className: 'rounded-none',
      },
      {
        intent: ['primary', 'secondary', 'accent'],
        visuals: ['filled', 'levitate'],
        className: 'bg-current/10',
      },
    ],
    defaultVariants: {
      intent: 'primary',
      visuals: 'classic',
      size: 'md',
      shape: 'rounded',
    },
  },
);

const triggerVariants = cva(
  [
    'block px-6 py-2 font-medium transition-colors z-10 relative bg-transparent',
    'focus-visible:outline-none focus-visible:ring-2',
    'after:content-[attr(data-label)] after:block after:h-0 after:invisible',
    '[&[data-state="active"]]:font-bold [&[data-state="active"]]:text-foreground',
  ].join(' '),
  {
    variants: {
      intent: {
        primary: 'text-primary',
        secondary: 'text-secondary',
        accent: 'text-accent',
      },
      visuals: {
        classic: null,
        outline: 'focus-visible:rounded-none',
      },
      styling: {
        underline: null,
        minimal: null,
        solid: null,
      },
      shape: {
        rounded: 'rounded-md',
        pill: 'rounded-full',
        sharp: 'rounded-none',
      },
    },
    compoundVariants: [
      {
        intent: 'primary',
        styling: 'solid',
        className: '[&[data-state="active"]]:text-primary-foreground',
      },
      {
        intent: 'secondary',
        styling: 'solid',
        className: '[&[data-state="active"]]:text-secondary-foreground',
      },
      {
        intent: 'accent',
        styling: 'solid',
        className: '[&[data-state="active"]]:text-accent-foreground',
      },
      {
        visuals: 'classic',
        shape: ['pill', 'rounded'],
        className: 'rounded-b-none rounded-t-md',
      },
    ],
    defaultVariants: {
      intent: 'primary',
      styling: 'underline',
      shape: 'rounded',
    },
  },
);

const indicatorVariants = cva(
  'absolute pointer-events-none transition-colors',
  {
    variants: {
      intent: {
        primary: 'bg-primary',
        secondary: 'bg-secondary',
        accent: 'bg-accent',
      },
      styling: {
        underline: 'bottom-0 h-1 start-0 end-0 bg-primary',
        minimal: 'bottom-0 h-2 w-2 left-1/2 -translate-x-1/2 bg-current',
        solid: 'inset-0',
      },
      visuals: {
        classic: null,
        outline: null,
      },
      shape: {
        rounded: 'rounded-md',
        pill: 'rounded-full',
        sharp: 'rounded-none',
      },
    },
    compoundVariants: [
      {
        styling: 'solid',
        visuals: 'classic',
        shape: ['pill', 'rounded'],
        className: 'rounded-b-none rounded-t-md',
      },
      {
        styling: 'solid',
        visuals: 'outline',
        className: 'rounded-none',
      },
      {
        styling: ['underline', 'minimal'],
        className: '[&[data-state="active"]]:bg-foreground',
      },
    ],
    defaultVariants: {
      styling: 'underline',
      visuals: 'classic',
      shape: 'rounded',
    },
  },
);

type TabsVariantProps = VariantProps<typeof listVariants> &
  VariantProps<typeof triggerVariants>;

export {
  indicatorVariants,
  listVariants,
  triggerVariants,
  type TabsVariantProps,
};
