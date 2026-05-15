import {
  BlurImage,
  type BlurImageProps,
} from '@/registry/components/azemmur/blur-image';

interface BlurImageDemoProps {
  src: string;
  width?: number;
  height?: number;
  intent?: BlurImageProps['intent'];
  visuals?: BlurImageProps['visuals'];
  shape?: BlurImageProps['shape'];
  elevation?: BlurImageProps['elevation'];
}

export default function BlurImageDemo({
  src,
  width = 400,
  height = 210,
  intent,
  visuals,
  shape,
  elevation,
}: BlurImageDemoProps) {
  return (
    <div className="max-w-xl">
      <BlurImage
        src={src}
        width={width}
        height={height}
        alt="Demo blur image"
        intent={intent}
        visuals={visuals}
        shape={shape}
        elevation={elevation}
      />
    </div>
  );
}
