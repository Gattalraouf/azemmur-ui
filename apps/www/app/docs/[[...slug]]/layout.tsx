import { getBaseUrl } from '@/lib/get-base-url';
import { getPageImage, source } from '@/lib/source';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface Props {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: Props) {
  return <>{children}</>;
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug = [] } = await props.params;
  const page = source.getPage(slug);
  if (!page) notFound();

  const image = getPageImage(page).url;

  const baseUrl = await getBaseUrl();

  const pageUrl = `${baseUrl}/docs/${slug.join('/')}`;

  return {
    title: page.data.title,
    description: page.data.description,
    authors: page.data?.author
      ? [
          {
            name: page.data.author.name,
            ...(page.data.author?.url && { url: page.data.author.url }),
          },
        ]
      : {
          name: 'raouf.codes',
          url: 'https://raouf.codes/',
        },
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      url: pageUrl,
      siteName: 'Azemmur',
      images: image,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@azemmur',
      title: page.data.title,
      description: page.data.description,
      images: image,
    },
  };
}
