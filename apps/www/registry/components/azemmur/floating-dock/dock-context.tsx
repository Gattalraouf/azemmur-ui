// Copyright (c) 2026 raouf.codes - Azemmur

'use client';

import { MotionValue } from 'motion/react';
import { createContext, useContext } from 'react';
import { DockVariantProps } from '@/registry/components/azemmur/floating-dock/dock-variants';

interface DockContextValue extends DockVariantProps {
  mousePosition: MotionValue<number>;
}

const DockContext = createContext<DockContextValue | null>(null);

function useDock() {
  const context = useContext(DockContext);
  if (!context) {
    throw new Error('Dock components must be used within <FloatingDock />');
  }
  return context;
}

export { DockContext, useDock, type DockContextValue };
