// Copyright (c) 2026 raouf.codes - Azemmur

'use client';

import { useCallback } from 'react';

/**
 * Modifier keys that can be required for a key action.
 */
export type Modifiers = {
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  meta?: boolean;
};

/**
 * Configuration for a single key action.
 */
export type KeyAction = {
  keys: string[];
  action: (e: React.KeyboardEvent<HTMLElement>) => void;
  modifiers?: Modifiers;
  clickOnMatch?: boolean;
};

/**
 * Check if the pressed modifier keys match the expected modifiers.
 */
export function modifiersMatch(
  event: React.KeyboardEvent<HTMLElement>,
  modifiers?: Modifiers,
): boolean {
  if (!modifiers) return true;

  return (
    (modifiers.ctrl === undefined || modifiers.ctrl === event.ctrlKey) &&
    (modifiers.alt === undefined || modifiers.alt === event.altKey) &&
    (modifiers.shift === undefined || modifiers.shift === event.shiftKey) &&
    (modifiers.meta === undefined || modifiers.meta === event.metaKey)
  );
}

/**
 * Hook for handling keyboard actions with customizable key bindings and modifiers.
 *
 * @example
 * ```tsx
 * const handleKeyDown = useKeyActions([
 *   {
 *     keys: ['Escape'],
 *     action: () => close(),
 *   },
 *   {
 *     keys: ['s'],
 *     modifiers: { meta: true },
 *     action: () => save(),
 *   },
 * ]);
 *
 * return <input onKeyDown={handleKeyDown} />;
 * ```
 *
 * @param keyActions - Array of key action configurations
 * @param activeRef - Optional ref to scope key handling to a container
 * @param enabled - Whether the hook is active (default: true)
 * @returns Event handler function for onKeyDown
 */
export function useKeyActions(
  keyActions: KeyAction[],
  activeRef?: React.RefObject<HTMLElement | null>,
  enabled: boolean = true,
) {
  return useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      if (!enabled) return;

      if (
        activeRef?.current &&
        !activeRef.current.contains(document.activeElement)
      ) {
        return;
      }

      for (const { keys, action, modifiers, clickOnMatch } of keyActions) {
        if (keys.includes(e.key) && modifiersMatch(e, modifiers)) {
          e.preventDefault();
          action(e);

          if (clickOnMatch && e.target instanceof HTMLElement) {
            e.target.click();
          }

          break;
        }
      }
    },
    [keyActions, activeRef, enabled],
  );
}
