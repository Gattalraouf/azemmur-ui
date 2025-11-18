import { headers } from 'next/headers';

export async function getBaseUrl(): Promise<string> {
  const headersList = headers();
  const headerHost = (await headersList).get('host');
  const isHttps = (await headersList).get('x-forwarded-proto') === 'https';
  const protocol = isHttps ? 'https' : 'http';

  return `${protocol}://${headerHost}`;
}
