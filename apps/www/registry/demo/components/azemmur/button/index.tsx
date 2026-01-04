import { PlusIcon } from 'lucide-react';
import { Button, type ButtonProps } from '@/registry/components/azemmur/button';

interface ButtonDemoProps {
  intent: ButtonProps['intent'];
  styling: ButtonProps['styling'];
  size: ButtonProps['size'];
  shape: ButtonProps['shape'];
}

export default function ButtonDemo({
  intent,
  styling,
  size,
  shape,
}: ButtonDemoProps) {
  return (
    <Button intent={intent} styling={styling} size={size} shape={shape}>
      {size?.includes('icon') ? <PlusIcon /> : 'Click me'}
    </Button>
  );
}
