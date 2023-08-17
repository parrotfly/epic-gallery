import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

export interface EpicImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
  src: string;
  gridArea?: string;
  imgClassName?: string;
  imgStyle?: React.CSSProperties;
  wrapperClassName?: string;
  loaderClassName?: string;
}

const EpicImage = ({
  alt,
  height,
  src,
  gridArea,
  imgClassName,
  wrapperClassName,
  loaderClassName,
  imgStyle,
  ...props
}: EpicImageProps) => {
  // const [imageSrc, setImageSrc] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={`__epic_gallery_item ${wrapperClassName}`}
      style={{ gridArea: gridArea || "" }}
    >
      <img
        src={src}
        alt={alt}
        onLoad={() => {
          setIsImageLoading(false);
        }}
        onError={() => {
          setIsImageLoading(false);
        }}
        {...props}
        className={twMerge(
          props.className,
          isHover && "__epic_gallery_item_image_hover"
        )}
        style={Object.assign(
          {},
          {
            display: isImageLoading ? "none" : "block",
          },
          imgStyle
        )}
      />
      {isImageLoading && (
        <div
          className={`epic-w-full epic-h-full epic-animate-pulse epic-flex epic-items-center epic-justify-center epic-bg-gradient-to-t epic-from-gray-500 epic-to-gray-50 ${loaderClassName}`}
        >
          <Loader2 size={40} className="epic-animate-spin" />
        </div>
      )}
    </div>
  );
};

export default EpicImage;
