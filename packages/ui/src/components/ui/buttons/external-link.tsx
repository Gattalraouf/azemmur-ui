'use client';

import { cn } from '@workspace/ui/lib/utils';
import { IconExternalLink as ExternalLinkIcon } from '@tabler/icons-react';
import { motion } from 'motion/react';

/* -------------------------------------------------------------------------- */
/*                                  Types                                     */
/* -------------------------------------------------------------------------- */

type ExternalLinkProps = {
  href: string;
  text?: string;
  className?: string;
};

/* -------------------------------------------------------------------------- */
/*                          External Link                                     */
/* -------------------------------------------------------------------------- */

/**
 * Renders a styled external link with hover/tap animations.
 * Opens the link in a new tab safely.
 */
export const ExternalLink = ({ href, text, className }: ExternalLinkProps) => {
  return (
    <motion.a
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        `not-prose w-fit flex flex-row items-center rounded-md bg-muted hover:bg-muted/70 transition pl-3 pr-2.5 py-1 text-sm font-medium text-muted-foreground`,
        `focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:border-ring focus-visible:outline-none`,
        className,
      )}
    >
      {text && <span>{text}</span>}
      <ExternalLinkIcon className={`${text && 'ml-1.5'} h-4 w-4`} />
    </motion.a>
  );
};
