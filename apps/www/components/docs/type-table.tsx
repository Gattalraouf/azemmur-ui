'use client';

import { IconInfoCircle as Info } from '@tabler/icons-react';
import { ExternalLink } from '@workspace/ui/components/ui/buttons/external-link';
import { TypeNode, ParameterNode } from 'fumadocs-ui/components/type-table';
import { Popover } from 'radix-ui';

interface TypeTableProps {
  type: Record<string, TypeNode>;
}

export function TypeTable({ type }: TypeTableProps) {
  const keys = Object.keys(type);

  return (
    <div className="prose my-6 overflow-auto prose-no-margin">
      <table className="whitespace-nowrap text-sm text-fd-muted-foreground w-full">
        <thead className="font-bold text-foreground">
          <tr className="border-b border-border">
            <th className="w-[40%] text-left py-2">Prop</th>
            <th className="w-[30%] text-left py-2">Type</th>
            <th className="w-[30%] text-left py-2">Default</th>
          </tr>
        </thead>

        <tbody>
          {keys.map((propName) => {
            const item = type[propName];

            return (
              <tr key={propName}>
                {/* Prop name + deprecated + required */}
                <td className="py-2 align-top">
                  <div className="inline-flex flex-row gap-1">
                    <div className="inline-flex items-center gap-1">
                      <code
                        className={`rounded-md p-1 text-fd-secondary-foreground ${
                          item?.deprecated
                            ? 'line-through text-fd-secondary-foreground/50'
                            : ''
                        }`}
                      >
                        {propName}
                        {item?.required ? '' : '?'}
                      </code>
                    </div>

                    {/* Optional description */}
                    {item?.description && (
                      <Popover.Root>
                        <Popover.Trigger asChild>
                          <button
                            type="button"
                            aria-label="View description"
                            className="ml-1 cursor-pointer h-fit my-auto"
                          >
                            <Info size={16} />
                          </button>
                        </Popover.Trigger>

                        <Popover.Content
                          className="bg-background text-foreground p-4 m-1 rounded-md border z-50 focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:border-ring focus-visible:outline-none"
                          side="top"
                        >
                          {item.description && <div>{item.description}</div>}
                        </Popover.Content>
                      </Popover.Root>
                    )}
                  </div>
                </td>

                {/* Type */}
                <td className="py-2 align-top">
                  <div className="inline-flex items-center gap-1">
                    {item?.type}

                    {(item?.typeDescription ||
                      item?.parameters ||
                      item?.returns) && (
                      <Popover.Root>
                        <Popover.Trigger asChild>
                          <button
                            type="button"
                            aria-label="View type info"
                            className="ml-1 cursor-pointer"
                          >
                            <Info size={16} />
                          </button>
                        </Popover.Trigger>

                        <Popover.Content
                          className="bg-background text-foreground p-4 m-2 rounded-md border z-50 focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:border-ring focus-visible:outline-none"
                          side="top"
                        >
                          <div className="flex flex-col gap-2">
                            <div className="flex flex-row gap-2">
                              {item.typeDescription && (
                                <div>{item.typeDescription}</div>
                              )}

                              {item?.typeDescriptionLink && (
                                <ExternalLink
                                  className="bg-transparent hover:bg-transparent p-0"
                                  href={item.typeDescriptionLink}
                                  text=""
                                />
                              )}
                            </div>

                            {item.type === 'function' && (
                              <div>{`(${
                                item?.parameters?.length
                                  ? item.parameters
                                      .map(
                                        (param: ParameterNode) =>
                                          `${param.name}: ${param.description}`,
                                      )
                                      .join(', ')
                                  : ''
                              }) => ${item.returns ?? 'void'}`}</div>
                            )}
                          </div>
                        </Popover.Content>
                      </Popover.Root>
                    )}
                  </div>
                </td>

                {/* Default value */}
                <td className="py-2 align-top">
                  {item?.default !== undefined ? (
                    <div>{item.default}</div>
                  ) : (
                    '-'
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
