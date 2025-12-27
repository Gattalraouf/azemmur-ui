'use client';

import { motion } from 'motion/react';
import { useState } from 'react';
import { useCssVarHexReactive } from '@/hooks/useCssVarHexReactive';

type ColorItem = {
  title: string;
  value: string;
  description?: string;
  className?: string;
};

export const ColorPalette = ({
  colors,
  primaryIndex = 0,
  className,
}: {
  colors: ColorItem[];
  primaryIndex?: number;
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number>(primaryIndex);

  return (
    <div className={`w-full h-32 flex gap-2 ${className || ''}`}>
      {colors.map((color, index) => {
        const isHovered = hoveredIndex === index;
        const flexGrow = isHovered ? 6 : 1;
        const value = useCssVarHexReactive(color.value);

        return (
          <motion.div
            key={color.title}
            className={`relative rounded-md overflow-hidden shadow-md cursor-pointer flex items-center justify-center ${color.className}`}
            style={{ flexGrow }}
            animate={{ flexGrow }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(primaryIndex)}
          >
            <div
              //style={{ backgroundColor: color.value }}
              className="absolute inset-0 z-0"
            ></div>

            <motion.div
              className="absolute top-0 h-full flex items-center justify-center z-10 pointer-events-none"
              animate={{
                left: isHovered ? 0 : '50%',
                translateX: isHovered ? 0 : '-50%',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <div
                className="text-sm font-bold p-4"
                style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
              >
                {color.title}
              </div>
            </motion.div>

            {isHovered && (
              <motion.div
                key="info"
                className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-2"
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-lg font-bold">{value}</div>
                {color.description && (
                  <div className="text-md">{color.description}</div>
                )}
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};
