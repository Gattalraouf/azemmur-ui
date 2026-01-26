import { IconArrowRight } from '@tabler/icons-react';
import { AnimateIcon } from '@workspace/ui/components/ui/icons/icon';
import MotionIcon from '@workspace/ui/components/ui/icons/motion-icon';
import ReactIcon from '@workspace/ui/components/ui/icons/react-icon';
import ShadcnIcon from '@workspace/ui/components/ui/icons/shadcn-icon';
import TailwindIcon from '@workspace/ui/components/ui/icons/tailwind-icon';
import TSIcon from '@workspace/ui/components/ui/icons/ts-icon';
import Link from 'next/link';
import { MotionEffect } from '@/components/effects/motion-effect';
import { Button } from '@/registry/components/azemmur/button';

const ICONS = [ReactIcon, TSIcon, TailwindIcon, MotionIcon, ShadcnIcon];
const TITLE = 'Craft beautiful, accessible interfaces, your way.';

export const Hero = () => {
  return (
    <div className="relative overflow-x-hidden flex flex-col items-center px-5">
      <div className="relative z-10 flex flex-col items-center justify-center">
        <MotionEffect
          slide={{
            direction: 'down',
          }}
          fade
          zoom
          inView
          delay={0.15}
        >
          <h1 className="md:text-4xl text-2xl text-center font-bold pointer-events-auto">
            {TITLE}
          </h1>
        </MotionEffect>

        <MotionEffect
          slide={{
            direction: 'down',
          }}
          fade
          zoom
          inView
          delay={0.3}
        >
          <p className="block font-normal md:text-xl text-base text-center mt-3 text-muted-foreground text-balance pointer-events-auto">
            Azemmur is an open-source collection of React components, crafted to
            be beautiful, flexible, and customizable, so you can design your own
            UI with motion, style, and purpose.
          </p>
        </MotionEffect>

        <div className="flex sm:flex-row flex-col sm:gap-4 gap-3 mt-5 mb-8 max-sm:w-full">
          <MotionEffect
            slide={{
              direction: 'down',
            }}
            fade
            zoom
            delay={0.45}
          >
            <AnimateIcon animateOnHover="out" completeOnStop asChild>
              <Button size="lg" className="w-full !pr-5 pointer-events-auto">
                <Link
                  href="/docs/installation"
                  className="flex gap-2"
                  tabIndex={-1}
                >
                  Get Started <IconArrowRight className="!size-5" />
                </Link>
              </Button>
            </AnimateIcon>
          </MotionEffect>

          <MotionEffect
            slide={{
              direction: 'down',
            }}
            fade
            zoom
            delay={0.6}
          >
            <Button
              size="lg"
              className="w-full pointer-events-auto"
              styling="outline"
            >
              <Link href="/docs/components" tabIndex={-1}>
                Browse Components
              </Link>
            </Button>
          </MotionEffect>
        </div>

        <div className="flex items-center gap-4 justify-center sm:justify-start">
          {ICONS.map((Icon, index) => (
            <MotionEffect
              key={index}
              slide={{
                direction: 'down',
              }}
              fade
              zoom
              delay={0.75 + index * 0.1}
            >
              <Icon className="size-8 pointer-events-auto" />
            </MotionEffect>
          ))}
        </div>
      </div>
    </div>
  );
};
