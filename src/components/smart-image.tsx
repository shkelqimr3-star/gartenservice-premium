import Image, { type ImageProps } from "next/image";

type SmartImageProps = Omit<ImageProps, "src"> & {
  src: string;
};

export function SmartImage({ src, alt, className, ...props }: SmartImageProps) {
  if (src.startsWith("data:")) {
    return <img src={src} alt={alt} className={className} />;
  }

  return <Image src={src} alt={alt} className={className} {...props} />;
}
