import * as React from 'react';

/* -------------------------------------------------------------------------- */
/*                                Utility Hook                                */
/* -------------------------------------------------------------------------- */

/**
 * Creates a context with a strict usage pattern.
 *
 * This ensures that the context is always used within a corresponding provider,
 * throwing an error if accessed outside of one.
 *
 * @template T The type of the context value
 * @param name Optional name for the context (used in error messages)
 * @returns A tuple `[Provider, useContext]`:
 * - `Provider`: React component to wrap children and provide context value
 * - `useContext`: Hook to safely consume the context
 *
 * @example
 * ```ts
 * const [ThemeProvider, useTheme] = getStrictContext<Theme>('ThemeContext');
 *
 * function App() {
 *   return (
 *     <ThemeProvider value={theme}>
 *       <Component />
 *     </ThemeProvider>
 *   );
 * }
 *
 * function Component() {
 *   const theme = useTheme(); // Safe to use
 * }
 * ```
 */
function getStrictContext<T>(
  name?: string,
): readonly [
  ({
    value,
    children,
  }: {
    value: T;
    children?: React.ReactNode;
  }) => React.JSX.Element,
  () => T,
] {
  // Create the React context with undefined default
  const Context = React.createContext<T | undefined>(undefined);

  /**
   * Provider component to supply the context value
   */
  const Provider = ({
    value,
    children,
  }: {
    value: T;
    children?: React.ReactNode;
  }) => <Context.Provider value={value}>{children}</Context.Provider>;

  /**
   * Hook to safely consume the context
   * Throws an error if used outside the corresponding provider
   */
  const useSafeContext = () => {
    const ctx = React.useContext(Context);
    if (ctx === undefined) {
      throw new Error(`useContext must be used within ${name ?? 'a Provider'}`);
    }
    return ctx;
  };

  return [Provider, useSafeContext] as const;
}

export { getStrictContext };
