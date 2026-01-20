import { motion } from 'motion/react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@workspace/ui/lib/utils';

const tabIndicatorVariants = cva('absolute', {
  variants: {
    intent: {
      primary: 'bg-primary text-primary border-primary',
      secondary: 'bg-secondary text-secondary border-secondary',
      accent: 'bg-accent text-accent border-accent',
    },
    styling: {
      underline: 'bottom-0 h-1 start-0 end-0 bg-primary',
      minimal: 'bottom-0 h-2 w-2 left-1/2 -translate-x-1/2 bg-current',
      solid: 'inset-0',
    },
    visuals: {
      filled: '',
      subtle: '',
      classic: '',
      outline: '',
      levitate: '',
    },
    shape: {
      rounded: 'rounded-md',
      pill: 'rounded-full',
      sharp: 'rounded-none',
    },
    active: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    {
      styling: 'solid',
      visuals: 'classic',
      className: 'rounded-b-none',
    },
    {
      styling: 'solid',
      visuals: 'classic',
      shape: 'pill',
      className: 'rounded-b-none rounded-t-md',
    },
    {
      styling: 'solid',
      visuals: 'outline',
      className: 'rounded-none',
    },
  ],
  defaultVariants: {
    styling: 'underline',
    shape: 'rounded',
  },
});

type TabIndicatorProps = VariantProps<typeof tabIndicatorVariants>;

function TabIndicator({
  tabsId,
  intent,
  styling,
  shape,
  visuals,
  active,
}: {
  tabsId: string;
  intent?: TabIndicatorProps['intent'];
  styling?: TabIndicatorProps['styling'];
  shape?: TabIndicatorProps['shape'];
  visuals?: TabIndicatorProps['visuals'];
  active?: TabIndicatorProps['active'];
}) {
  return (
    <motion.div
      layoutId={`activeUnderline-${tabsId}`}
      className={cn(
        tabIndicatorVariants({ intent, styling, shape, visuals, active }),
      )}
      transition={{
        type: 'spring',
        stiffness: 380,
        damping: 25,
      }}
    />
  );
}

export { TabIndicator, tabIndicatorVariants, type TabIndicatorProps };
