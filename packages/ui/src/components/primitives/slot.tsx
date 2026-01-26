'use client';

import { cn } from '@workspace/ui/lib/utils';
import { motion, isMotionComponent, type HTMLMotionProps } from 'motion/react';
import { useMemo, isValidElement } from 'react';

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

type AnyProps = Record<string, unknown>;

/**
 * Motion-compatible DOM props for a given HTML element.
 */
type DOMMotionProps<T extends HTMLElement = HTMLElement> = Omit<
  HTMLMotionProps<keyof HTMLElementTagNameMap>,
  'ref'
> & {
  ref?: React.Ref<T>;
};

/**
 * Utility type that enables a component to render as a child element (`asChild`),
 * similar to Radix UI’s Slot pattern.
 */
type WithAsChild<Base extends object> =
  | (Base & { asChild: true; children: React.ReactElement })
  | (Base & { asChild?: false | undefined });

/**
 * SlotProps extends motion props and allows for animated composition.
 */
type SlotProps<T extends HTMLElement = HTMLElement> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
} & DOMMotionProps<T>;

/* -------------------------------------------------------------------------- */
/*                                  Utilities                                 */
/* -------------------------------------------------------------------------- */

/**
 * Merges multiple refs (React ref objects or callback refs) into one ref callback.
 */
function mergeRefs<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  return (node) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === 'function') {
        ref(node);
      } else {
        (ref as React.RefObject<T | null>).current = node;
      }
    });
  };
}

/**
 * Merges props from the slot and its child element, combining className and style.
 */
function mergeProps<T extends HTMLElement>(
  childProps: AnyProps,
  slotProps: DOMMotionProps<T>,
): AnyProps {
  const merged: AnyProps = { ...childProps, ...slotProps };

  if (childProps.className || slotProps.className) {
    merged.className = cn(
      childProps.className as string,
      slotProps.className as string,
    );
  }

  if (childProps.style || slotProps.style) {
    merged.style = {
      ...(childProps.style as React.CSSProperties),
      ...(slotProps.style as React.CSSProperties),
    };
  }

  return merged;
}

/* -------------------------------------------------------------------------- */
/*                                   Slot                                     */
/* -------------------------------------------------------------------------- */

/**
 * `Slot` is a motion-enhanced wrapper that allows you to render any child component
 * (e.g., `<a>`, `<div>`, `<motion.button>`) with merged props and animations.
 *
 * - If the child is already a motion component, it uses it directly.
 * - Otherwise, it wraps the child type with `motion.create()`.
 * - Useful for building composable UI primitives with animation support.
 */
function Slot<T extends HTMLElement = HTMLElement>({
  children,
  ref,
  ...props
}: SlotProps<T>) {
  const isAlreadyMotion =
    typeof children.type === 'object' &&
    children.type !== null &&
    isMotionComponent(children.type);

  const Base = useMemo(
    () =>
      isAlreadyMotion
        ? (children.type as React.ElementType)
        : motion.create(children.type as React.ElementType),
    [isAlreadyMotion, children.type],
  );

  if (!isValidElement(children)) return null;

  const { ref: childRef, ...childProps } = children.props as AnyProps;
  const mergedProps = mergeProps(childProps, props);

  return (
    <Base {...mergedProps} ref={mergeRefs(childRef as React.Ref<T>, ref)} />
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Exports                                   */
/* -------------------------------------------------------------------------- */

export {
  Slot,
  type SlotProps,
  type WithAsChild,
  type DOMMotionProps,
  type AnyProps,
};
