// Copyright (c) 2026 raouf.codes - Azemmur

'use client';

import { cn } from '@workspace/ui/lib/utils';
import { AnimatePresence, motion } from 'motion/react';
import { useSpeedDial } from '@/registry/components/azemmur/speed-dial/speed-dial-context';
import { speedDialMenuVariants } from '@/registry/components/azemmur/speed-dial/speed-dial-variants';

interface SpeedDialMenuProps {
  children: React.ReactNode;
  className?: string;
}

function SpeedDialMenu({ children, className }: SpeedDialMenuProps) {
  const { open, orientation, direction, size } = useSpeedDial();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="speed-dial-menu"
          role="menu"
          aria-label="Speed dial actions"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className={cn(
            speedDialMenuVariants({ orientation, direction, size }),
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { SpeedDialMenu, type SpeedDialMenuProps };
