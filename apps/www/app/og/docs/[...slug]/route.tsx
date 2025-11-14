import { getPageImage, source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: RouteContext<'/og/docs/[...slug]'>,
) {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  return new ImageResponse(
    (
      <div tw="relative flex w-full h-full bg-[#1A2424]">
        <div tw="absolute left-15 top-0 bottom-0 w-0.5 h-full bg-[#82939333]" />
        <div tw="absolute right-15 top-0 bottom-0 w-0.5 h-full bg-[#82939333]" />
        <div tw="absolute bottom-15 left-0 right-0 w-full h-0.5 bg-[#82939333]" />
        <div tw="absolute top-15 left-0 right-0 w-full h-0.5 bg-[#82939333]" />

        <div tw="absolute top-15 left-[43.5px] w-[35px] h-0.5 bg-[#82939333]" />
        <div tw="absolute left-15 top-[43.5px] h-[35px] w-0.5 bg-[#82939333]" />

        <div tw="absolute bottom-15 left-[43.5px] w-[35px] h-0.5 bg-[#82939333]" />
        <div tw="absolute left-15 bottom-[43.5px] h-[35px] w-0.5 bg-[#82939333]" />

        <div tw="absolute top-15 right-[43.5px] w-[35px] h-0.5 bg-[#82939333]" />
        <div tw="absolute right-15 top-[43.5px] h-[35px] w-0.5 bg-[#82939333]" />

        <div tw="absolute bottom-15 right-[43.5px] w-[35px] h-0.5 bg-[#82939333]" />
        <div tw="absolute right-15 bottom-[43.5px] h-[35px] w-0.5 bg-[#82939333]" />

        <div
          tw="flex flex-col w-full h-full items-start justify-between p-26"
          style={{
            backgroundSize: '100px 100px',
          }}
        >
          <p tw="text-[#e5ebeb] text-6xl font-medium mb-0">@azemmur</p>

          <div tw="flex flex-row gap-10 w-full justify-between items-end">
            <div tw="flex flex-col">
              <p
                tw="text-[#e5ebeb] text-6xl font-medium mb-0 max-w-2xl overflow-hidden"
                style={{
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {page.data.title}
              </p>
              {page.data.description && (
                <p tw="text-[#e5ebeb] text-2xl mt-6 -mb-2 max-w-2xl">
                  {page.data.description}
                </p>
              )}
            </div>

            <div tw="flex ms-6">
              <p tw="text-[#e5ebeb] text-2xl -mb-2">@azemmur</p>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    lang: page.locale,
    slug: getPageImage(page).segments,
  }));
}
