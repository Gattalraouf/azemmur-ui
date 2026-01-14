import {
  ThemeSwitch,
  type ThemeSwitchProps,
} from '@/registry/components/azemmur/themeSwitch';

interface ThemeSwitchDemoProps {
  size?: ThemeSwitchProps['size'];
  styling?: ThemeSwitchProps['styling'];
  intent?: ThemeSwitchProps['intent'];
}

export default function ThemeSwitchDemo({
  size,
  styling,
  intent,
}: ThemeSwitchDemoProps) {
  return <ThemeSwitch size={size} styling={styling} intent={intent} />;
}
