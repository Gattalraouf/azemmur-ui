// Copyright (c) 2026 raouf.codes - Azemmur

'use client';

import { createContext, useContext } from 'react';
import type { SpeedDialVariantProps } from '@/registry/components/azemmur/speed-dial/speed-dial-variants';

type SpeedDialContextValue = SpeedDialVariantProps & {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SpeedDialContext = createContext<SpeedDialContextValue | null>(null);

function useSpeedDial() {
  const context = useContext(SpeedDialContext);
  if (!context) {
    throw new Error('useSpeedDial must be used within a SpeedDial component');
  }
  return context;
}

export { SpeedDialContext, useSpeedDial, type SpeedDialContextValue };
