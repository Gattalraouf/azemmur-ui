import { useCallback } from 'react';

export type KeyAction = {
  keys: string[];
  action: (e: React.KeyboardEvent<HTMLElement>) => void | void;
  modifiers?: Modifiers;
  clickOnMatch?: boolean;
};

export type Modifiers = {
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  meta?: boolean;
};

export function modifiersMatch(
  event: React.KeyboardEvent<HTMLElement>,
  modifiers?: Modifiers,
) {
  if (!modifiers) return true;

  return (
    (modifiers.ctrl === undefined || modifiers.ctrl === event.ctrlKey) &&
    (modifiers.alt === undefined || modifiers.alt === event.altKey) &&
    (modifiers.shift === undefined || modifiers.shift === event.shiftKey) &&
    (modifiers.meta === undefined || modifiers.meta === event.metaKey)
  );
}

export function useKeyActions(
  keyActions: KeyAction[],
  activeRef?: React.RefObject<HTMLElement | null>,
  enabled: boolean = true, // Only handle key events if enabled (e.g. isTopModal)
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
