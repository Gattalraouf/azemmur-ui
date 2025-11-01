'use client';

import {
  forwardRef,
  useCallback,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from '@workspace/ui/lib/utils';
import {
  ScrollArea,
  ScrollBar,
  ScrollViewport,
} from '@workspace/ui/components/ui/scroll-area';
import type { ScrollArea as ScrollAreaPrimitive } from 'radix-ui';
import { CopyButton } from '@/components/ui/buttons/copy';
import { copyToClipboard } from '@/utils/copy-to-clipboard';

/* -------------------------------------------------------------------------- */
/*                                  Types                                     */
/* -------------------------------------------------------------------------- */

export type CodeBlockProps = Omit<HTMLAttributes<HTMLElement>, 'popover'> & {
  icon?: ReactNode;
  allowCopy?: boolean;
  viewportProps?: ScrollAreaPrimitive.ScrollAreaViewportProps;
  onCopy?: () => void;
  title?: string;
};

export type PreProps = Omit<React.HTMLAttributes<HTMLPreElement>, 'popover'>;

/* -------------------------------------------------------------------------- */
/*                                   <Pre>                                    */
/* -------------------------------------------------------------------------- */

export const Pre = forwardRef<HTMLPreElement, PreProps>(
  ({ className, children, ...props }, ref) => (
    <pre
      ref={ref}
      className={cn('p-4 focus-visible:outline-none', className)}
      {...props}
    >
      {children}
    </pre>
  ),
);

Pre.displayName = 'Pre';

/* -------------------------------------------------------------------------- */
/*                               <CodeBlock>                                  */
/* -------------------------------------------------------------------------- */

export const CodeBlock = forwardRef<HTMLElement, CodeBlockProps>(
  (
    {
      title,
      allowCopy = true,
      icon,
      viewportProps,
      onCopy: onCopyEvent,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [isCopied, setIsCopied] = useState(false);
    const areaRef = useRef<HTMLDivElement>(null);

    const handleCopy = useCallback(() => {
      const pre = areaRef.current?.querySelector('pre');
      if (!pre) return;

      const clone = pre.cloneNode(true) as HTMLElement;
      clone
        .querySelectorAll('.nd-copy-ignore')
        .forEach((node) => node.remove());

      const text = clone.textContent ?? '';

      copyToClipboard(text).then(() => {
        setIsCopied(true);
        onCopyEvent?.();
        setTimeout(() => setIsCopied(false), 3000);
      });
    }, [onCopyEvent]);

    return (
      <figure
        ref={ref}
        {...props}
        className={cn(
          'not-prose group fd-codeblock relative my-6 overflow-hidden rounded-xl text-sm [&.shiki]:!bg-accent',
          className,
        )}
      >
        {/* Header */}
        {title ? (
          <div className="flex h-10 items-center gap-2 px-4">
            {icon && (
              <div
                className="text-muted-foreground [&_svg]:size-3.5"
                dangerouslySetInnerHTML={
                  typeof icon === 'string' ? { __html: icon } : undefined
                }
              >
                {typeof icon !== 'string' ? icon : null}
              </div>
            )}
            <figcaption className="flex-1 truncate text-muted-foreground">
              {title}
            </figcaption>
            {allowCopy && (
              <CopyButton
                size="xs"
                variant="ghost"
                className="-me-2 bg-transparent hover:bg-black/5 dark:hover:bg-white/10"
                onClick={handleCopy}
                isCopied={isCopied}
              />
            )}
          </div>
        ) : (
          allowCopy && (
            <div className="absolute right-0 top-0 z-[2] rounded-bl-xl bg-accent p-1.5">
              <CopyButton
                size="xs"
                variant="ghost"
                className="bg-transparent hover:bg-black/5 dark:hover:bg-white/10"
                onClick={handleCopy}
                isCopied={isCopied}
              />
            </div>
          )
        )}

        {/* Code Area */}
        <div className={cn('p-1.5', title && 'pt-0')}>
          <ScrollArea ref={areaRef} dir="ltr">
            <ScrollViewport
              {...viewportProps}
              data-slot="codeblock-viewport"
              className={cn(
                'max-h-[600px] rounded-md bg-background [&_code]:!text-[13px] [&_code_.line]:!px-0',
                viewportProps?.className,
              )}
            >
              {children}
            </ScrollViewport>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </figure>
    );
  },
);

CodeBlock.displayName = 'CodeBlock';
