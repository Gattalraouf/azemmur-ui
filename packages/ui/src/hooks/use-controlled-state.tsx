'use client';

import * as React from 'react';

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

/**
 * Common props interface for components that can be either controlled or uncontrolled.
 */
export interface CommonControlledStateProps<T> {
  /** Controlled value (if provided, this overrides internal state) */
  value?: T;
  /** Default value for uncontrolled mode */
  defaultValue?: T;
}

/* -------------------------------------------------------------------------- */
/*                                    Hook                                    */
/* -------------------------------------------------------------------------- */

/**
 * A React hook that abstracts the controlled/uncontrolled component pattern.
 *
 * - If `value` is provided, the hook acts as **controlled**.
 * - If `value` is not provided, it manages its own **uncontrolled** internal state.
 *
 * It also ensures the local state stays in sync when the controlled `value` changes.
 *
 * @example
 * ```tsx
 * const [value, setValue] = useControlledState({
 *   value: props.value,
 *   defaultValue: props.defaultValue,
 *   onChange: props.onChange,
 * });
 * ```
 *
 * @returns A tuple `[state, setState]` where:
 * - `state` is the current value.
 * - `setState` updates both internal state and triggers `onChange`.
 */
export function useControlledState<T, Rest extends unknown[] = []>(
  props: CommonControlledStateProps<T> & {
    /** Optional change handler triggered on state updates */
    onChange?: (value: T, ...args: Rest) => void;
  },
): readonly [T, (next: T, ...args: Rest) => void] {
  const { value, defaultValue, onChange } = props;

  // Internal state for uncontrolled usage
  const [internal, setInternal] = React.useState<T>(
    value !== undefined ? value : (defaultValue as T),
  );

  // Keep internal state in sync when controlled `value` changes externally
  React.useEffect(() => {
    if (value !== undefined) setInternal(value);
  }, [value]);

  // Unified setter — updates internal state and fires `onChange`
  const setState = React.useCallback(
    (next: T, ...args: Rest) => {
      setInternal(next);
      onChange?.(next, ...args);
    },
    [onChange],
  );

  return [internal, setState] as const;
}
