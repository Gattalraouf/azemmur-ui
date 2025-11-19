export const Footer = () => {
  return (
    <div className="max-w-7xl mx-auto h-16 z-21">
      <div className="size-full px-4 md:px-6 flex items-center justify-center prose prose-sm text-sm text-muted-foreground">
        <p className="text-center pointer-events-auto">
          Built by{' '}
          <a
            href="https://raouf.codes/en"
            rel="noopener noreferrer"
            target="_blank"
          >
            raouf.codes
          </a>
          . The source code is available on{' '}
          <a
            href="https://github.com/Gattalraouf/azemmur-ui"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </div>
  );
};
