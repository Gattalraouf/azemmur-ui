import { useState, useEffect } from 'react';

/**
 * Converts any valid CSS color string to HEX using a temporary element
 */
function colorToHex(color: string) {
  const el = document.createElement('div');
  el.style.color = color;
  document.body.appendChild(el);

  const rgb = getComputedStyle(el).color; // normalized to rgb(...)
  document.body.removeChild(el);

  const match = rgb.match(/\d+/g);
  if (!match) return '';
  const [r, g, b] = match.map(Number);
  return (
    '#' +
    [r, g, b]
      .map((x) => x.toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase()
  );
}

/**
 * useCssVarHexReactive
 * Returns the computed value of a CSS variable in HEX.
 * Updates automatically when the variable changes (theme switch).
 */
export function useCssVarHexReactive(varName: string) {
  const [hex, setHex] = useState<string>('');

  const computeHex = () => {
    const root = document.documentElement;
    const computed = getComputedStyle(root).getPropertyValue(varName).trim();
    if (computed) {
      setHex(colorToHex(computed));
    }
  };

  useEffect(() => {
    computeHex();

    // Watch for changes in the style attribute (theme changes)
    const observer = new MutationObserver(computeHex);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style', 'class'], // watch inline style & class changes
    });

    return () => observer.disconnect();
  }, [varName]);

  return hex;
}
