import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import EpicGalleryContext, {
  defaultGalleryContext,
} from "../context/EpicGallery";
import "../styles/EpicGallery.css";
import { generateGridTemplateAreas } from "../utils/image";
import EpicImage, { EpicImageProps } from "./EpicImage";
import EpicLightBox from "./EpicLightBox";
import EpicMoreImagesSlider from "./EpicMoreImagesSlider";
import { isMobileDevice } from "../utils";

// TODO: need to provide all functionalities

export interface EpicGalleryProps {
  imageList: EpicImageProps[];
}

const EpicGallery = ({ imageList: providedImageList }: EpicGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(
    defaultGalleryContext.activeIndex
  );
  const [imageList, setImageList] = useState<EpicImageProps[]>(
    defaultGalleryContext.imageList
  );
  const [isOpen, setIsOpen] = useState<boolean>(defaultGalleryContext.isOpen);
  const [isMaximized, setIsMaximized] = useState<boolean>(
    defaultGalleryContext.isMaximized
  );
  const [showControls, setShowControls] = useState<boolean>(
    defaultGalleryContext.showControls
  );
  const [gridTemplateAreas, setGridTemplateAreas] = useState("");
  const [slicedImageList, setSlicedImageList] = useState<EpicImageProps[]>([]);

  useEffect(() => {
    setImageList(providedImageList);
  }, [providedImageList]);

  /**
   * Update layout class on window resize.
   */
  useEffect(() => {
    const handleResize = () => {
      setSlicedImageList(imageList.slice(0, isMobileDevice() ? 4 : 12));
      setGridTemplateAreas(generateGridTemplateAreas(imageList.length));
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [imageList, isMobileDevice()]);

  useEffect(() => {
    if (isOpen) {
      window.document.body.style.overflow = "hidden";
    } else {
      window.document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <EpicGalleryContext.Provider
      value={{
        activeIndex,
        imageList,
        isOpen,
        isMaximized,
        showControls,
        updateActiveIndex: setActiveIndex,
        updateImageList: setImageList,
        updateIsOpen: setIsOpen,
        updateIsMaximized: setIsMaximized,
        updateShowControls: setShowControls,
      }}
    >
      <div className="epic-gallery">
        <div
          className={twMerge(
            "epic-relative __epic_gallery_container __epic_gallery_root",
            isOpen && "epic-pointer-events-none",
            gridTemplateAreas
          )}
        >
          {/* Show first 12 images  */}
          {slicedImageList.map((image, index) => (
            <EpicImage
              key={index}
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              gridArea={`_${index + 1}`}
              onClick={() => {
                setActiveIndex(index);
                setIsOpen(true);
              }}
            />
          ))}

          {/* More image count with rest images slider */}
          <EpicMoreImagesSlider />
        </div>

        {/* Epic lightbox */}
        <EpicLightBox />
      </div>
    </EpicGalleryContext.Provider>
  );
};

export default EpicGallery;
