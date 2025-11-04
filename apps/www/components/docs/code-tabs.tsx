'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@workspace/ui/lib/utils';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TabsContents,
  TabsHighlight,
  TabsHighlightItem,
  type TabsProps,
} from '@workspace/ui/components/ui/tabs/sliding-tabs';
import { CopyButton } from '@workspace/ui/components/ui/buttons/copy';

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export type CodeTabsProps = Omit<TabsProps, 'children'> & {
  codes: Record<string, string>;
  lang?: string;
  themes?: { light: string; dark: string };
  copyButton?: boolean;
  onCopyChange?: (isCopied: boolean, content?: string) => void;
};

/* -------------------------------------------------------------------------- */
/*                                 <CodeTabs>                                 */
/* -------------------------------------------------------------------------- */

export function CodeTabs({
  codes,
  lang = 'bash',
  themes = { light: 'github-light', dark: 'github-dark' },
  className,
  defaultValue,
  value,
  onValueChange,
  copyButton = true,
  onCopyChange,
  ...props
}: CodeTabsProps) {
  const { resolvedTheme } = useTheme();

  const [highlightedCodes, setHighlightedCodes] = useState<Record<
    string,
    string
  > | null>(null);
  const [selectedCode, setSelectedCode] = useState<string>(
    value ?? defaultValue ?? Object.keys(codes)[0] ?? '',
  );

  /* ------------------------ Syntax Highlighting ------------------------ */
  useEffect(() => {
    async function loadHighlightedCode() {
      try {
        const { codeToHtml } = await import('shiki');
        const newHighlighted: Record<string, string> = {};

        for (const [label, content] of Object.entries(codes)) {
          const highlighted = await codeToHtml(content, {
            lang,
            themes: {
              light: themes.light,
              dark: themes.dark,
            },
            defaultColor: resolvedTheme === 'dark' ? 'dark' : 'light',
          });
          newHighlighted[label] = highlighted;
        }

        setHighlightedCodes(newHighlighted);
      } catch (error) {
        console.error('Error highlighting codes:', error);
        setHighlightedCodes(codes);
      }
    }

    loadHighlightedCode();
  }, [resolvedTheme, lang, themes.light, themes.dark, codes]);

  /* ------------------------------ Render ------------------------------- */
  return (
    <figure
      className={cn(
        'w-full gap-0 !m-0 overflow-hidden rounded-xl bg-accent text-accent-foreground',
        className,
      )}
    >
      {/* Header Tabs */}
      <Tabs
        {...props}
        value={selectedCode}
        onValueChange={(val) => {
          setSelectedCode(val);
          onValueChange?.(val);
        }}
        data-slot="install-tabs"
      >
        <TabsHighlight className="absolute z-0 inset-0 rounded-none shadow-none bg-transparent after:content-[''] after:absolute after:inset-x-0 after:h-0.5 after:bottom-0 dark:after:bg-accent-foreground after:bg-accent-foreground after:rounded-t-full">
          <TabsList
            data-slot="install-tabs-list"
            className="w-full relative flex items-center justify-between rounded-none h-10 text-current py-0 pl-5 pr-4.5"
          >
            <div className="flex gap-x-3 h-full">
              {highlightedCodes &&
                Object.keys(highlightedCodes).map((label) => (
                  <TabsHighlightItem
                    key={label}
                    value={label}
                    className="flex items-center justify-center"
                  >
                    <TabsTrigger
                      key={label}
                      value={label}
                      className="text-accent-foreground h-full text-sm font-medium data-[state=active]:font-bold px-0 cursor-pointer"
                    >
                      {label}
                    </TabsTrigger>
                  </TabsHighlightItem>
                ))}
            </div>

            {copyButton && highlightedCodes && (
              <CopyButton
                content={codes[selectedCode] ?? ''}
                size="xs"
                variant="ghost"
                className="-me-2.5 bg-transparent hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
                onCopyChange={onCopyChange}
              />
            )}
          </TabsList>
        </TabsHighlight>

        {/* Code Contents */}
        <div className="px-1.5 pb-1.5">
          <TabsContents
            data-slot="install-tabs-contents"
            className="bg-[var(--codeblock)] rounded-md"
          >
            {highlightedCodes &&
              Object.entries(highlightedCodes).map(([label, html]) => (
                <TabsContent
                  data-slot="install-tabs-content"
                  key={label}
                  value={label}
                  className="w-full"
                >
                  <div
                    className="w-full text-sm overflow-auto flex items-center p-4 
                    [&>pre,_&_code]:!bg-transparent 
                    [&_code_.line]:!px-0 
                    [&>pre,_&_code]:[background:transparent_!important] 
                    [&>pre,_&_code]:border-none 
                    [&_code]:!text-[13px]"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                </TabsContent>
              ))}
          </TabsContents>
        </div>
      </Tabs>
    </figure>
  );
}
