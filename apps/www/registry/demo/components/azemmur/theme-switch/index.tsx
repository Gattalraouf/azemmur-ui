import {
  ThemeSwitch,
  type ThemeSwitchProps,
} from '@/registry/components/azemmur/theme-switch';

interface ThemeSwitchDemoProps {
  size?: ThemeSwitchProps['size'];
  styling?: ThemeSwitchProps['styling'];
  intent?: ThemeSwitchProps['intent'];
  shape?: ThemeSwitchProps['shape'];
  elevation?: ThemeSwitchProps['elevation'];
}

export default function ThemeSwitchDemo({
  size,
  styling,
  intent,
  shape,
  elevation,
}: ThemeSwitchDemoProps) {
  return (
    <ThemeSwitch
      size={size}
      styling={styling}
      intent={intent}
      shape={shape}
      elevation={elevation}
    />
  );
}
