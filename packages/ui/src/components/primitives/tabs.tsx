'use client';

import {
  AutoHeight,
  type AutoHeightProps,
} from '@workspace/ui/components/primitives/effects/auto-height';
import {
  Highlight,
  HighlightItem,
  type HighlightProps,
  type HighlightItemProps,
} from '@workspace/ui/components/primitives/effects/highlight';
import { useControlledState } from '@workspace/ui/hooks/use-controlled-state';
import { getStrictContext } from '@workspace/ui/lib/get-strict-context';
import {
  motion,
  AnimatePresence,
  type HTMLMotionProps,
  type Transition,
} from 'motion/react';
import { Tabs as TabsPrimitive } from 'radix-ui';
import * as React from 'react';


/* -------------------------------------------------------------------------- */
/*                                   Context                                  */
/* -------------------------------------------------------------------------- */

/**
 * Tabs context for synchronizing the active tab and providing access
 * to `value` and `setValue` within nested tab components.
 */
type TabsContextType = {
  value: string | undefined;
  setValue: TabsProps['onValueChange'];
};

const [TabsProvider, useTabs] =
  getStrictContext<TabsContextType>('TabsContext');

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type TabsProps = React.ComponentProps<typeof TabsPrimitive.Root>;

type TabsHighlightProps = Omit<HighlightProps, 'controlledItems' | 'value'>;
type TabsListProps = React.ComponentProps<typeof TabsPrimitive.List>;
type TabsTriggerProps = React.ComponentProps<typeof TabsPrimitive.Trigger>;
type TabsContentProps = React.ComponentProps<typeof TabsPrimitive.Content> &
  HTMLMotionProps<'div'>;

type TabsHighlightItemProps = HighlightItemProps & {
  value: string;
};

/**
 * Auto-height mode props for dynamic container resizing between tab content transitions.
 */
type TabsContentsAutoProps = AutoHeightProps & {
  mode?: 'auto-height';
  children: React.ReactNode;
  transition?: Transition;
};

/**
 * Layout mode props for animating content size changes using layout transitions.
 */
type TabsContentsLayoutProps = Omit<HTMLMotionProps<'div'>, 'transition'> & {
  mode: 'layout';
  children: React.ReactNode;
  transition?: Transition;
};

type TabsContentsProps = TabsContentsAutoProps | TabsContentsLayoutProps;

/* -------------------------------------------------------------------------- */
/*                                  Defaults                                  */
/* -------------------------------------------------------------------------- */

const defaultTransition: Transition = {
  type: 'spring',
  stiffness: 200,
  damping: 30,
};

/* -------------------------------------------------------------------------- */
/*                                   Tabs Root                                */
/* -------------------------------------------------------------------------- */

/**
 * `Tabs` is a motion-enhanced wrapper around Radix UI's Tabs,
 * supporting controlled and uncontrolled modes via `useControlledState`.
 */
function Tabs(props: TabsProps) {
  const [value, setValue] = useControlledState({
    value: props.value,
    defaultValue: props.defaultValue,
    onChange: props.onValueChange,
  });

  return (
    <TabsProvider value={{ value, setValue }}>
      <TabsPrimitive.Root
        data-slot="tabs"
        {...props}
        onValueChange={setValue}
      />
    </TabsProvider>
  );
}

/* -------------------------------------------------------------------------- */
/*                               Tabs Highlight                               */
/* -------------------------------------------------------------------------- */

/**
 * `TabsHighlight` visually indicates the active tab using an animated highlight.
 * It integrates with the Tabs context and supports custom transitions.
 */
function TabsHighlight({
  transition = { type: 'spring', stiffness: 200, damping: 25 },
  ...props
}: TabsHighlightProps) {
  const { value } = useTabs();

  return (
    <Highlight
      data-slot="tabs-highlight"
      controlledItems
      value={value}
      transition={transition}
      click={false}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                                Tabs HighlightItem                          */
/* -------------------------------------------------------------------------- */

/**
 * `TabsHighlightItem` defines the interactive region of each tab trigger
 * that the highlight system uses to track active state.
 */
function TabsHighlightItem(props: TabsHighlightItemProps) {
  return <HighlightItem data-slot="tabs-highlight-item" {...props} />;
}

/* -------------------------------------------------------------------------- */
/*                                  Tabs List                                 */
/* -------------------------------------------------------------------------- */

/**
 * `TabsList` is the container for tab triggers, providing layout and grouping.
 */
function TabsList(props: TabsListProps) {
  return <TabsPrimitive.List data-slot="tabs-list" {...props} />;
}

/* -------------------------------------------------------------------------- */
/*                                 Tabs Trigger                               */
/* -------------------------------------------------------------------------- */

/**
 * `TabsTrigger` represents an interactive button that switches the active tab.
 */
function TabsTrigger(props: TabsTriggerProps) {
  return <TabsPrimitive.Trigger data-slot="tabs-trigger" {...props} />;
}

/* -------------------------------------------------------------------------- */
/*                                 Tabs Content                               */
/* -------------------------------------------------------------------------- */

/**
 * `TabsContent` animates the appearance and disappearance of tab content using Framer Motion.
 */
function TabsContent({
  value,
  forceMount,
  transition = { duration: 0.5, ease: 'easeInOut' },
  ...props
}: TabsContentProps) {
  return (
    <AnimatePresence mode="wait">
      <TabsPrimitive.Content asChild forceMount={forceMount} value={value}>
        <motion.div
          data-slot="tabs-content"
          layout
          layoutDependency={value}
          initial={{ opacity: 0, filter: 'blur(4px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(4px)' }}
          transition={transition}
          {...props}
        />
      </TabsPrimitive.Content>
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 Tabs Contents                              */
/* -------------------------------------------------------------------------- */

/**
 * `TabsContents` wraps multiple tab contents and animates between them.
 * It supports two modes:
 * - `"auto-height"` (default): smooth height transitions between content.
 * - `"layout"`: animates layout size using Framer Motion’s layout transitions.
 */
function TabsContents(props: TabsContentsProps) {
  const { value } = useTabs();

  if (isAutoMode(props)) {
    const { transition = defaultTransition, ...autoProps } = props;

    return (
      <AutoHeight
        data-slot="tabs-contents"
        deps={[value]}
        transition={transition}
        {...autoProps}
      />
    );
  }

  const { transition = defaultTransition, style, ...layoutProps } = props;

  return (
    <motion.div
      data-slot="tabs-contents"
      layout="size"
      layoutDependency={value}
      style={{ overflow: 'hidden', ...style }}
      transition={{ layout: transition }}
      {...layoutProps}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

function isAutoMode(props: TabsContentsProps): props is TabsContentsAutoProps {
  return !('mode' in props) || props.mode === 'auto-height';
}

/* -------------------------------------------------------------------------- */
/*                                   Exports                                  */
/* -------------------------------------------------------------------------- */

export {
  Tabs,
  TabsHighlight,
  TabsHighlightItem,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsContents,
  type TabsProps,
  type TabsHighlightProps,
  type TabsHighlightItemProps,
  type TabsListProps,
  type TabsTriggerProps,
  type TabsContentProps,
  type TabsContentsProps,
};
