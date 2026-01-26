'use client';

import { cn } from '@workspace/ui/lib/utils';
import type {
  HighlightOptionsCommon,
  HighlightOptionsThemes,
} from 'fumadocs-core/highlight';
import { useShiki } from 'fumadocs-core/highlight/client';
import { CodeBlock, Pre } from '@/components/docs/codeblock';

/* -------------------------------------------------------------------------- */
/*                          Utility Functions                                  */
/* -------------------------------------------------------------------------- */

/**
 * Returns components used by the syntax highlighter.
 * Currently wraps `pre` elements in our `CodeBlock` with optional title/icon/copy.
 */
const getComponents = ({
  title,
  icon,
  onCopy,
  className,
}: {
  title?: string;
  icon?: React.ReactNode;
  onCopy?: () => void;
  className?: string;
}) =>
  ({
    pre(props) {
      return (
        <CodeBlock
          {...props}
          title={title}
          icon={icon}
          onCopy={onCopy}
          className={cn('my-0', props.className, className)}
        >
          <Pre>{props.children}</Pre>
        </CodeBlock>
      );
    },
  }) satisfies HighlightOptionsCommon['components'];

/* -------------------------------------------------------------------------- */
/*                                  Types                                     */
/* -------------------------------------------------------------------------- */

export type DynamicCodeBlockProps = {
  lang: string;
  code: string;
  title?: string;
  icon?: React.ReactNode;
  onCopy?: () => void;
  options?: Omit<HighlightOptionsCommon, 'lang'> & HighlightOptionsThemes;
  className?: string;
};

/* -------------------------------------------------------------------------- */
/*                           Dynamic CodeBlock                                */
/* -------------------------------------------------------------------------- */

/**
 * A flexible code block component that uses Shiki for syntax highlighting.
 * Supports optional title, icon, and copy button.
 */
export function DynamicCodeBlock({
  lang,
  code,
  options,
  title,
  icon,
  onCopy,
  className,
}: DynamicCodeBlockProps) {
  // Generate components for syntax highlighting
  const components = getComponents({ title, icon, onCopy, className });

  // Render highlighted code with Shiki
  return useShiki(code, {
    lang,
    ...options,
    components: {
      ...components,
      ...options?.components,
    },
  });
}
