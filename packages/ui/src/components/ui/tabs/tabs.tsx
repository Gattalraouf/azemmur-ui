
import {
  Tabs as TabsPrimitive,
  TabsList as TabsListPrimitive,
  TabsTrigger as TabsTriggerPrimitive,
  TabsContent as TabsContentPrimitive,
  TabsContents as TabsContentsPrimitive,
  TabsHighlight as TabsHighlightPrimitive,
  TabsHighlightItem as TabsHighlightItemPrimitive,
  type TabsProps as TabsPrimitiveProps,
  type TabsListProps as TabsListPrimitiveProps,
  type TabsTriggerProps as TabsTriggerPrimitiveProps,
  type TabsContentProps as TabsContentPrimitiveProps,
  type TabsContentsProps as TabsContentsPrimitiveProps,
} from '@workspace/ui/components/primitives/tabs';
import { cn } from '@workspace/ui/lib/utils';
import * as React from 'react';

/* -------------------------------------------------------------------------- */
/*                                  Types                                     */
/* -------------------------------------------------------------------------- */

type TabsProps = TabsPrimitiveProps;
type TabsListProps = TabsListPrimitiveProps;
type TabsTriggerProps = TabsTriggerPrimitiveProps;
type TabsContentsProps = TabsContentsPrimitiveProps;
type TabsContentProps = TabsContentPrimitiveProps;

/* -------------------------------------------------------------------------- */
/*                                  Tabs                                       */
/* -------------------------------------------------------------------------- */

function Tabs({ className, ...props }: TabsProps) {
  return (
    <TabsPrimitive
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                                TabsList                                     */
/* -------------------------------------------------------------------------- */

function TabsList({ className, ...props }: TabsListProps) {
  return (
    <TabsHighlightPrimitive className="absolute z-0 inset-0 border border-transparent rounded-lg bg-accent">
      <TabsListPrimitive
        className={cn(
          'text-muted-foreground inline-flex h-9 w-fit items-center justify-center',
          className,
        )}
        {...props}
      />
    </TabsHighlightPrimitive>
  );
}

/* -------------------------------------------------------------------------- */
/*                               TabsTrigger                                   */
/* -------------------------------------------------------------------------- */

function TabsTrigger({ className, ...props }: TabsTriggerProps) {
  return (
    <TabsHighlightItemPrimitive
      value={props.value}
      className="flex-1 size-full"
    >
      <TabsTriggerPrimitive
        className={cn(
          "data-[state=active]:text-foreground data-[state=inactive]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md w-full px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors duration-500 ease-in-out focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          className,
        )}
        {...props}
      />
    </TabsHighlightItemPrimitive>
  );
}

/* -------------------------------------------------------------------------- */
/*                               TabsContents                                  */
/* -------------------------------------------------------------------------- */

function TabsContents(props: TabsContentsProps) {
  return <TabsContentsPrimitive {...props} />;
}

/* -------------------------------------------------------------------------- */
/*                               TabsContent                                   */
/* -------------------------------------------------------------------------- */

function TabsContent({ className, ...props }: TabsContentProps) {
  return (
    <TabsContentPrimitive
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                                Exports                                      */
/* -------------------------------------------------------------------------- */

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContents,
  TabsContent,
  type TabsProps,
  type TabsListProps,
  type TabsTriggerProps,
  type TabsContentsProps,
  type TabsContentProps,
};
