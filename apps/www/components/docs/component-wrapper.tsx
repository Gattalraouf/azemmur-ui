'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '@workspace/ui/components/ui/buttons/button';
import { cn } from '@workspace/ui/lib/utils';
import {
  IconMaximize as Fullscreen,
  IconRotateClockwise as RotateCcw,
  IconAdjustmentsHorizontal as SlidersHorizontal,
} from '@tabler/icons-react';
import Iframe from '@/components/docs/iframe';
import { useIsMobile } from '@workspace/ui/hooks/use-mobile';

/* -------------------------------------------------------------------------- */
/*                                  Types                                     */
/* -------------------------------------------------------------------------- */

interface ComponentWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  iframe?: boolean;
  bigScreen?: boolean;
  tweakpane?: React.ReactNode;
}

/* -------------------------------------------------------------------------- */
/*                          Component Wrapper                                 */
/* -------------------------------------------------------------------------- */

export const ComponentWrapper = ({
  className,
  children,
  name,
  iframe = false,
  bigScreen = false,
  tweakpane,
}: ComponentWrapperProps) => {
  const [tweakMode, setTweakMode] = useState(false);
  const [key, setKey] = useState(0);
  const isMobile = useIsMobile();

  return (
    <div className="bg-accent rounded-md p-1.5">
      <motion.div
        id="component-wrapper"
        className={cn(
          'max-w-screen relative rounded-md bg-[var(--codeblock)] flex flex-col md:flex-row',
          bigScreen && 'overflow-hidden',
          className,
        )}
      >
        {/* Main component area */}
        <motion.div className="relative size-full flex-1">
          {/* Control buttons */}
          {!iframe && (
            <div className="absolute top-3 right-3 z-[9] bg-background flex items-center justify-end gap-2 p-1 rounded-md">
              {/* Restart button */}
              <Button
                onClick={() => setKey((prev) => prev + 1)}
                className="flex items-center rounded-md"
                variant="secondary"
                size="icon-sm"
                asChild
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RotateCcw aria-label="restart-btn" size={14} />
                </motion.button>
              </Button>

              {/* Fullscreen button for iframe mode */}
              {iframe && (
                <Button
                  onClick={() => window.open(`/examples/${name}`, '_blank')}
                  className="flex items-center rounded-md"
                  variant="secondary"
                  size="icon-sm"
                  asChild
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Fullscreen aria-label="fullscreen-btn" size={14} />
                  </motion.button>
                </Button>
              )}

              {/* Tweak pane toggle */}
              {tweakpane && (
                <Button
                  onClick={() => setTweakMode((prev) => !prev)}
                  className="flex items-center rounded-md"
                  variant="secondary"
                  size="icon-sm"
                  asChild
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <SlidersHorizontal aria-label="tweak-btn" size={14} />
                  </motion.button>
                </Button>
              )}
            </div>
          )}

          {/* Component display: either iframe or children */}
          {iframe ? (
            <Iframe key={key} name={name} bigScreen={bigScreen} />
          ) : (
            <div
              key={key}
              className="flex min-h-[400px] w-full items-center justify-center px-10 py-16"
            >
              {children}
            </div>
          )}
        </motion.div>

        {/* Tweak pane area */}
        <motion.div
          initial={false}
          animate={{
            width: isMobile ? '100%' : tweakMode ? '250px' : '0px',
            height: isMobile ? (tweakMode ? '250px' : '0px') : 'auto',
            opacity: tweakMode ? 1 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
            restDelta: 0.01,
          }}
          className="relative"
        >
          <div className="absolute inset-0 overflow-y-auto">{tweakpane}</div>
        </motion.div>
      </motion.div>
    </div>
  );
};
