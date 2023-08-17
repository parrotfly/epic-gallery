import React, { useRef } from "react";
import "swiper/css";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { useEpicGalleryContext } from "../context/EpicGallery";

interface Props {
  slideElemRef: SwiperRef | null;
}

export const LightBoxImageList = ({ slideElemRef }: Props) => {
  const sliderImageListRef = useRef<SwiperRef | null>(null);

  const { activeIndex, imageList, updateActiveIndex } = useEpicGalleryContext();

  return (
    <Swiper
      ref={sliderImageListRef}
      slidesPerView={5}
      spaceBetween={12}
      grabCursor
      breakpoints={{
        "@0.50": {
          slidesPerView: 8,
          spaceBetween: 20,
        },
        "@0.65": {
          slidesPerView: 12,
          spaceBetween: 20,
        },
        "@1.00": {
          slidesPerView: 16,
          spaceBetween: 20,
        },
        "@1.50": {
          slidesPerView: 20,
          spaceBetween: 20,
        },
      }}
      className="epic-w-full epic-h-20 epic-absolute epic-bottom-2 epic-left-0 epic-px-2 __epic_lightbox_image_list"
    >
      {imageList.map((image, index) => (
        <SwiperSlide
          className=""
          key={index}
          onClick={() => {
            updateActiveIndex(index);

            slideElemRef?.swiper.slideTo(index);
          }}
        >
          <div
            key={image.src}
            className={`epic-w-16 epic-h-16 epic-rounded epic-overflow-hidden epic-bg-black epic-text-white epic-relative epic-border-2 epic-shadow-sm epic-shadow-zinc-200
 hover:epic-grayscale-0 ${
   activeIndex === index
     ? "epic-border-zinc--50 epic-grayscale-0"
     : "epic-border-zinc-700 epic-grayscale"
 }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              width={50}
              height={50}
              className="epic-object-cover epic-max-w-full epic-w-max epic-absolute epic-top-2/4 epic-left-2/4 -epic-translate-x-2/4 -epic-translate-y-2/4"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
