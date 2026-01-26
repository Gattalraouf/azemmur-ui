import { RootProvider } from 'fumadocs-ui/provider/next';
import { Metadata } from 'next';
import '@/app/global.css';
import { Inter } from 'next/font/google';
import { getBaseUrl } from '@/lib/get-base-url';

const inter = Inter({
  subsets: ['latin'],
});

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = await getBaseUrl();
  const ogImage = `/og-image.png`;

  return {
    title: {
      template: '%s - Azemmur',
      default: 'Azemmur - By developers, for developers.',
    },
    description:
      'A personal open-source component distribution built to share, organize, and inspire accessible, animated, and beautiful interfaces.',
    metadataBase: new URL(baseUrl),
    keywords: [
      'Azemmur',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'Motion.dev',
      'Open-source components',
      'Component distribution',
      'Azemmur components',
      'UI library',
    ],
    icons: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/favicon-16x16.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        url: '/apple-touch-icon.png',
      },
    ],
    authors: [
      {
        name: 'raouf.codes',
        url: 'https://raouf.codes',
      },
    ],
    publisher: 'Azemmur',
    openGraph: {
      title: 'Azemmur',
      description:
        'A personal open-source component distribution built to share, organize, and inspire accessible, animated, and beautiful interfaces.',
      url: baseUrl,
      siteName: 'Azemmur',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'Azemmur',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@azemmur',
      title: 'Azemmur',
      description:
        'A personal open-source component distribution built to share, organize, and inspire accessible, animated, and beautiful interfaces.',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'Azemmur',
        },
      ],
    },
  };
}

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
