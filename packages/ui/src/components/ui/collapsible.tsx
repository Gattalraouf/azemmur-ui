'use client';

import {
  useEffect,
  useState,
  useCallback,
  createContext,
  useContext,
} from 'react';
import { Collapsible as CollapsiblePrimitive } from 'radix-ui';
import {
  AnimatePresence,
  motion,
  type HTMLMotionProps,
  type Transition,
} from 'motion/react';

/* -------------------------------------------------------------------------- */
/*                                   Context                                  */
/* -------------------------------------------------------------------------- */

type CollapsibleContextType = {
  /** Whether the collapsible is currently open */
  isOpen: boolean;
};

const CollapsibleContext = createContext<CollapsibleContextType | undefined>(
  undefined,
);

/**
 * Hook to access the `Collapsible` context.
 * Throws if used outside of a `<Collapsible>` root.
 */
function useCollapsible(): CollapsibleContextType {
  const context = useContext(CollapsibleContext);
  if (!context) {
    throw new Error('useCollapsible must be used within a Collapsible');
  }
  return context;
}

/* -------------------------------------------------------------------------- */
/*                                   Root                                     */
/* -------------------------------------------------------------------------- */

type CollapsibleProps = React.ComponentProps<typeof CollapsiblePrimitive.Root>;

/**
 * A wrapper around Radix UI’s Collapsible Root with animated content support.
 * Provides context for internal components.
 */
function Collapsible({ children, ...props }: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(
    props?.open ?? props?.defaultOpen ?? false,
  );

  // Sync with controlled `open` prop
  useEffect(() => {
    if (props?.open !== undefined) setIsOpen(props.open);
  }, [props?.open]);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open);
      props.onOpenChange?.(open);
    },
    [props],
  );

  return (
    <CollapsibleContext.Provider value={{ isOpen }}>
      <CollapsiblePrimitive.Root
        data-slot="collapsible"
        {...props}
        onOpenChange={handleOpenChange}
      >
        {children}
      </CollapsiblePrimitive.Root>
    </CollapsibleContext.Provider>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Trigger                                   */
/* -------------------------------------------------------------------------- */

type CollapsibleTriggerProps = React.ComponentProps<
  typeof CollapsiblePrimitive.Trigger
>;

/**
 * The trigger element that toggles the collapsible’s open state.
 */
function CollapsibleTrigger(props: CollapsibleTriggerProps) {
  return (
    <CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" {...props} />
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Content                                   */
/* -------------------------------------------------------------------------- */

type CollapsibleContentProps = React.ComponentProps<
  typeof CollapsiblePrimitive.Content
> &
  HTMLMotionProps<'div'> & {
    /** Custom Framer Motion transition for open/close animation */
    transition?: Transition;
  };

/**
 * Animated collapsible content area.
 * Uses Framer Motion to smoothly expand/collapse while maintaining accessibility.
 */
function CollapsibleContent({
  className,
  children,
  transition = { type: 'spring', stiffness: 150, damping: 22 },
  ...props
}: CollapsibleContentProps) {
  const { isOpen } = useCollapsible();

  return (
    <AnimatePresence>
      {isOpen && (
        <CollapsiblePrimitive.Content asChild forceMount {...props}>
          <motion.div
            key="collapsible-content"
            data-slot="collapsible-content"
            layout
            initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
            animate={{ opacity: 1, height: 'auto', overflow: 'hidden' }}
            exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
            transition={transition}
            className={className}
            {...props}
          >
            {children}
          </motion.div>
        </CollapsiblePrimitive.Content>
      )}
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Export                                   */
/* -------------------------------------------------------------------------- */

export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  useCollapsible,
  type CollapsibleContextType,
  type CollapsibleProps,
  type CollapsibleTriggerProps,
  type CollapsibleContentProps,
};
