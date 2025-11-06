'use client';

import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@workspace/ui/lib/utils';

/**
 * InteractiveGridPattern is a component that renders a grid pattern with interactive squares.
 *
 * @param width - The width of each square.
 * @param height - The height of each square.
 * @param squares - The number of squares in the grid. The first element is the number of horizontal squares, and the second element is the number of vertical squares.
 * @param className - The class name of the grid.
 * @param squaresClassName - The class name of the squares.
 */
export interface HeroBackgroundProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  squares?: [number, number]; // [horizontal, vertical]
  dynamicSquares?: boolean;
  className?: string;
  squaresClassName?: string;
}

/**
 * The InteractiveGridPattern component.
 *
 * @see InteractiveGridPatternProps for the props interface.
 * @returns A React component.
 */
export function HeroBackground({
  width = 40,
  height = 40,
  squares = [37, 17],
  dynamicSquares = true,
  className,
  squaresClassName,
  ...props
}: HeroBackgroundProps) {
  const containerRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const calculatedHorizontal = dynamicSquares
    ? Math.ceil(dimensions.width / width)
    : squares[0];
  const calculatedVertical = dynamicSquares
    ? Math.ceil(dimensions.height / height)
    : squares[1];

  const totalSquares = calculatedHorizontal * calculatedVertical;

  return (
    <svg
      ref={containerRef}
      width={dynamicSquares ? dimensions.width : width * calculatedHorizontal}
      height={dynamicSquares ? dimensions.height : height * calculatedVertical}
      className={cn(
        'absolute inset-0 h-full w-full border border-border',
        className,
      )}
      {...props}
    >
      {Array.from({ length: totalSquares }).map((_, index) => {
        const x = (index % calculatedHorizontal) * width;
        const y = Math.floor(index / calculatedHorizontal) * height;
        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={width}
            height={height}
            className={cn(
              'stroke-border transition-all duration-100 ease-in-out [&:not(:hover)]:duration-1000',
              hoveredSquare === index ? 'fill-foreground' : 'fill-transparent',
              squaresClassName,
            )}
            onMouseEnter={() => setHoveredSquare(index)}
            onMouseLeave={() => setHoveredSquare(null)}
          />
        );
      })}
    </svg>
  );
}
