import { cva, type VariantProps } from 'class-variance-authority';
import { Button as ButtonPrimitive } from '@/registry/components/primitives/button';
import { cn } from '@workspace/ui/lib/utils';
import {
  TabIndicator as Indicator,
  tabIndicatorVariants,
} from '@/registry/components/azemmur/tabIndicator';

const tabTriggerVariants = cva(
  'relative px-6 py-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-0 focus-visible:bg-ring/40 focus-visible:rounded-b-none',
  {
    variants: {
      intent: {
        primary: 'bg-primary text-primary border-primary',
        secondary: 'bg-secondary text-secondary border-secondary',
        accent: 'bg-accent text-accent border-accent',
      },
      styling: {
        underline: 'bg-transparent',
        minimal: 'bg-transparent',
        solid: 'bg-transparent',
      },
      active: {
        true: 'font-bold',
        false: 'text-foreground',
      },
    },
    compoundVariants: [
      {
        intent: 'primary',
        styling: 'solid',
        active: true,
        className: 'text-primary-foreground',
      },
      {
        intent: 'secondary',
        styling: 'solid',
        active: true,
        className: 'text-secondary-foreground',
      },
      {
        intent: 'accent',
        styling: 'solid',
        active: true,
        className: 'text-accent-foreground',
      },
    ],
    defaultVariants: {
      intent: 'primary',
      styling: 'underline',
    },
  },
);

type TabTriggerProps = VariantProps<typeof tabTriggerVariants> &
  VariantProps<typeof tabIndicatorVariants>;

function TabTrigger({
  tabsId,
  idx,
  label,
  onSelect,
  onKeyDown,
  buttonRef,
  intent,
  styling,
  shape,
  active,
  visuals,
  tabClassName,
}: {
  tabsId: string;
  idx: number;
  label: string;
  onSelect: (i: number) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  buttonRef: (el: HTMLButtonElement | null) => void;
  intent?: TabTriggerProps['intent'];
  styling?: TabTriggerProps['styling'];
  shape?: TabTriggerProps['shape'];
  active?: TabTriggerProps['active'];
  visuals?: TabTriggerProps['visuals'];
  tabClassName?: string;
}) {
  return (
    <ButtonPrimitive
      key={`tab-${tabsId}-${idx}`}
      ref={buttonRef}
      role="tab"
      aria-selected={active?.valueOf()}
      aria-controls={`panel-${tabsId}-${idx}`}
      id={`tab-${tabsId}-${idx}`}
      tabIndex={active?.valueOf() ? 0 : -1}
      onClick={() => onSelect(idx)}
      onKeyDown={onKeyDown}
      data-label={label}
      className={cn(
        'after:content-[attr(data-label)] after:block after:h-0 after:invisible',
        tabTriggerVariants({ intent, styling, active }),
        tabClassName,
      )}
    >
      <span className="relative z-10">{label}</span>

      {active?.valueOf() && (
        <Indicator
          tabsId={tabsId}
          intent={intent}
          styling={styling}
          active={active}
          shape={shape}
          visuals={visuals}
        />
      )}
    </ButtonPrimitive>
  );
}

export { TabTrigger, tabTriggerVariants, type TabTriggerProps };
