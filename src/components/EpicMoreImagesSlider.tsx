import React, { useEffect, useRef, useState } from "react";
import { Autoplay, Virtual } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { useEpicGalleryContext } from "../context/EpicGallery";
import { isMobileDevice } from "../utils";
import EpicImage, { EpicImageProps } from "./EpicImage";

const EpicMoreImagesSlider = () => {
  const { imageList, updateIsOpen, updateActiveIndex } =
    useEpicGalleryContext();
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [slicedImageList, setSlicedImageList] = useState<EpicImageProps[]>([]);

  const sliderRef = useRef<SwiperRef | null>(null);

  useEffect(() => {
    if (isMobileDevice()) {
      setCurrentIndex(3);
    } else {
      setCurrentIndex(12);
    }
  }, [isMobileDevice()]);

  useEffect(() => {
    const handleResize = () => {
      sliderRef.current?.swiper?.removeAllSlides?.();

      if (isMobileDevice()) {
        setCurrentIndex(3);
      } else {
        setCurrentIndex(12);
      }

      if (isMobileDevice() && imageList.length >= 4) {
        setSlicedImageList(imageList.slice(3));

        return;
      }

      setSlicedImageList(imageList.slice(12));
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobileDevice(), imageList]);

  if (isMobileDevice() && imageList.length <= 4) return;
  if (!isMobileDevice() && imageList.length <= 12) return;

  return (
    <div
      className="__epic_gallery_item"
      style={{
        gridArea: `_${13}`,
      }}
    >
      <Swiper
        ref={sliderRef}
        virtual
        slidesPerView={1}
        loop
        autoplay={{ delay: 3000 }}
        modules={[Autoplay, Virtual]}
        className="epic-h-full"
        onSlideChange={(swiper) => {
          const slideIndex = swiper.realIndex + (isMobileDevice() ? 3 : 12); // Plus sliced number for getting the correct index
          setCurrentIndex(slideIndex);
        }}
      >
        {slicedImageList.map((image, index) => (
          <SwiperSlide key={index}>
            <EpicImage
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className="__epic_gallery_item_overlay epic-bg-zinc-950/5 epic-flex epic-items-center epic-justify-center"
        onClick={() => {
          if (currentIndex === -1) return;

          updateActiveIndex(currentIndex);
          updateIsOpen(true);
        }}
      >
        <p className="epic-text-white epic-drop-shadow-xl epic-text-6xl epic-font-bold">
          + {imageList.length - (isMobileDevice() ? 3 : 12)}
        </p>
      </div>
    </div>
  );
};

export default EpicMoreImagesSlider;
