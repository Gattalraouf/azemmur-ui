import { useState, useEffect } from 'react';

type ColorItem = {
  value: string;
};

function colorToHex(color: string) {
  const el = document.createElement('div');
  el.style.color = color;
  document.body.appendChild(el);
  const rgb = getComputedStyle(el).color;
  document.body.removeChild(el);
  const match = rgb.match(/\d+/g);
  if (!match) return '';
  const [r, g, b] = match.map(Number);
  return (
    '#' +
    [r, g, b]
      .map((x) => x?.toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase()
  );
}

/**
 * Reactive HEX values for an array of CSS variables
 * Updates when the CSS variables change (theme switch)
 */
export function useCssVarsHexReactiveArray(vars: ColorItem[]) {
  const [hexValues, setHexValues] = useState<string[]>(vars.map(() => ''));

  useEffect(() => {
    const computeHexValues = () => {
      const values = vars.map((varName) => {
        const computed = getComputedStyle(document.documentElement)
          .getPropertyValue(varName.value)
          .trim();
        return computed ? colorToHex(computed) : '';
      });

      // Only update state if changed
      setHexValues((prev) =>
        prev.join(',') !== values.join(',') ? values : prev,
      );
    };

    computeHexValues();

    // Watch for theme changes via class/style mutation
    const observer = new MutationObserver(computeHexValues);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'style'],
    });

    return () => observer.disconnect();
  }, [vars]);

  return hexValues;
}
