import { BlurImage } from '@/registry/components/azemmur/blur-image';

interface BlurImageDemoProps {
  src: string;
  width?: number;
  height?: number;
}

export default function BlurImageDemo({
  src,
  width = 400,
  height = 210,
}: BlurImageDemoProps) {
  return (
    <div className="max-w-xl">
      <BlurImage
        src={src}
        width={width}
        height={height}
        alt="Demo blur image"
        className="border-4"
      />
    </div>
  );
}
