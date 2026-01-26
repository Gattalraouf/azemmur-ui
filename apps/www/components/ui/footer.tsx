import { Button } from '@/registry/components/azemmur/button';

export const Footer = () => {
  return (
    <div className="max-w-7xl mx-auto h-16 z-21">
      <div className="size-full px-4 md:px-6 flex items-center justify-center prose prose-sm text-sm text-muted-foreground">
        <p className="text-center pointer-events-auto">
          Built by{' '}
          <Button styling="link" size="sm" className="px-0">
            <a
              href="https://raouf.codes/en"
              rel="noopener noreferrer"
              target="_blank"
              tabIndex={-1}
            >
              raouf.codes
            </a>
          </Button>
          . The source code is available on{' '}
          <Button styling="link" size="sm" className="px-0">
            <a
              href="https://github.com/Gattalraouf/azemmur-ui"
              rel="noopener noreferrer"
              target="_blank"
              tabIndex={-1}
            >
              GitHub
            </a>
          </Button>
          .
        </p>
      </div>
    </div>
  );
};
