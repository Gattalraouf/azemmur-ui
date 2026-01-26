import { IconPlus } from '@tabler/icons-react';
import { Button, type ButtonProps } from '@/registry/components/azemmur/button';

interface ButtonDemoProps {
  intent: ButtonProps['intent'];
  styling: ButtonProps['styling'];
  size: ButtonProps['size'];
  shape: ButtonProps['shape'];
  elevation: ButtonProps['elevation'];
}

export default function ButtonDemo({
  intent,
  styling,
  size,
  shape,
  elevation,
}: ButtonDemoProps) {
  return (
    <Button
      intent={intent}
      styling={styling}
      size={size}
      shape={shape}
      elevation={elevation}
    >
      {size?.includes('icon') ? <IconPlus /> : 'Click me'}
    </Button>
  );
}
