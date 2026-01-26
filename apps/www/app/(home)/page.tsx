'use client';

import { cn } from '@workspace/ui/lib/utils';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import SquareLogo from '@/components/logos/sqr-logo';
import { Footer } from '@/components/ui/footer';
import { Hero } from '@/components/ui/hero';
import MaskedBackgroundGrid from '@/components/ui/maskedBackgroundGrid';

const CONTENT_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 30 },
  },
} as const;

export default function HomePage() {
  const [transition, setTransition] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTransition(true), 1250);
    const timer2 = setTimeout(() => setIsLoaded(true), 2500);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <main
      className={cn(
        'relative flex flex-col flex-1 h-full',
        !isLoaded && 'overflow-y-hidden',
      )}
    >
      <div className="w-full flex flex-col justify-between flex-1 pointer-events-none">
        {transition ? (
          <>
            <div className="w-full z-21 flex-1 content-center">
              <motion.div
                layoutId="sqr-logo"
                className="z-21 m-auto w-1/2 md:w-1/5"
              >
                <SquareLogo className="w-full" animate={false} />
              </motion.div>
              <motion.div
                variants={CONTENT_VARIANTS}
                initial="hidden"
                animate={transition ? 'visible' : 'hidden'}
              >
                <Hero key={String(transition)} />
              </motion.div>
            </div>

            <Footer />
          </>
        ) : (
          <motion.div layoutId="sqr-logo" className="z-21 m-auto w-1/4">
            <SquareLogo className="w-full" />
          </motion.div>
        )}
      </div>

      <MaskedBackgroundGrid />
    </main>
  );
}
