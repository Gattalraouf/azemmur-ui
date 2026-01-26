import { ExternalLink } from '@workspace/ui/components/ui/buttons/external-link';
import { cn } from '@workspace/ui/lib/utils';
import { Card } from 'fumadocs-ui/components/card';
import { Steps, Step } from 'fumadocs-ui/components/steps';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Callout } from '@/components/docs/callout';
import {
  CodeBlock,
  Pre,
  type CodeBlockProps,
} from '@/components/docs/codeblock';
import { ComponentInstallation } from '@/components/docs/component-installation';
import { ComponentPreview } from '@/components/docs/component-preview';
import { TypeTable } from '@/components/docs/type-table';

// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...components,
    Card: ({ children, className, accent, ...props }) => (
      <Card
        className={cn(
          'flex flex-col items-center justify-center py-7 bg-accent/50 border-none [&>h3]:text-base [&>h3]:text-current [&>div]:bg-transparent [&>div]:shadow-none [&>div]:border-none [&_svg]:size-10',
          accent && '[&>h3]:text-fd-muted-foreground',
          className,
        )}
        {...props}
      >
        {children}
      </Card>
    ),
    ComponentPreview,
    ComponentInstallation,
    TypeTable,
    ExternalLink,
    Steps,
    Step,
    Callout,
    pre: (props: CodeBlockProps) => (
      <CodeBlock {...props}>
        <Pre>{props.children}</Pre>
      </CodeBlock>
    ),
  };
}
