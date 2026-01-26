'use client';

import { useIsMobile } from '@workspace/ui/hooks/use-mobile';
import React from 'react';
import { HeroBackground } from '@/components/ui/hero-background';
const MaskedBackgroundGrid = () => {
  const isMobile = useIsMobile();

  return (
    !isMobile && (
      <>
        <div
          className="fixed inset-0 w-full h-full bg-background z-20 pointer-events-none"
          style={{
            maskImage: 'radial-gradient(transparent -70%, white 60%)',
          }}
        />
        <HeroBackground className="fixed h-screen w-screen top-0 skew-x-[-20deg] skew-y-[14deg]" />
      </>
    )
  );
};

export default MaskedBackgroundGrid;
