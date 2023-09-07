import KeyPress from "keypress-tool";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  RotateCcw,
  RotateCw,
  X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import "swiper/css";
import "swiper/css/virtual";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { twMerge } from "tailwind-merge";
import { useDebouncedCallback } from "use-debounce";
import { useEpicGalleryContext } from "../context/EpicGallery";
import { enterFullscreen, exitFullscreen } from "../utils";
import EpicImage from "./EpicImage";
import { LightBoxImageList } from "./LightBoxImageList";

const debounceDelay = 400;
const scaleStep = 0.3;

const EpicLightBox = () => {
  const {
    activeIndex,
    imageList,
    isOpen,
    showControls,
    isMaximized,
    updateShowControls,
    updateIsOpen,
    updateActiveIndex,
    updateIsMaximized,
  } = useEpicGalleryContext();

  const [rotate, setRotate] = useState(0);
  const [scale, setScale] = useState(1);
  const slideElemRef = useRef<SwiperRef | null>(null);

  useEffect(() => {
    if (activeIndex === -1) return;

    setScale(1);
    setRotate(0);
    slideElemRef.current?.swiper?.slideTo(activeIndex);
  }, [activeIndex]);

  const handleSlidePrev = useDebouncedCallback(() => {
    slideElemRef.current?.swiper.slidePrev();
  }, debounceDelay);

  const handleSlideNext = useDebouncedCallback(() => {
    slideElemRef.current?.swiper.slideNext();
  }, debounceDelay);

  const handleCloseLightBox = useDebouncedCallback(() => {
    updateIsOpen(false);
    updateActiveIndex(-1);
  }, 100);

  KeyPress("Left").addListener(() => {
    handleSlidePrev();
  });

  KeyPress("Right").addListener(() => {
    handleSlideNext();
  });

  KeyPress("Esc").addListener(() => {
    handleCloseLightBox();
  });

  /**
   * Handle image zoom
   */
  useEffect(() => {
    if (!isOpen) return;

    const handleScroll = (event: WheelEvent) => {
      if (event.deltaY > 0) {
        setScale((p) => {
          if (p <= 0.5) return 0.5;

          return p - scaleStep;
        });
      } else {
        setScale((p) => {
          if (p >= 3) return 3;

          return p + scaleStep;
        });
      }
    };

    window.addEventListener("wheel", handleScroll);

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [isOpen]);

  return (
    <div
      className={twMerge(
        `epic-fixed epic-left-0 epic-top-0 epic-w-full epic-h-full epic-bg-zinc-900/40 epic-backdrop-blur-sm epic-transition-all epic-z-[9999]`,
        isMaximized && "epic-bg-black"
      )}
      style={{
        top: isOpen ? "0" : "-150%",
      }}
    >
      {/* Lightbox header */}
      <div className="epic-w-full epic-absolute epic-top-0 epic-left-0 epic-flex epic-items-center epic-justify-between epic-px-10 epic-py-4 epic-z-50">
        <div>
          <h2 className="epic-text-2xl epic-font-bold epic-text-white">
            {/* {imageList[activeIndex]?.title} */}
          </h2>
        </div>
        <div className="epic-flex  epic-items-center epic-gap-2">
          <button
            className="epic-h-10 epic-w-10 epic-rounded-full epic-bg-black epic-text-white epic-flex epic-items-center epic-justify-center"
            style={{ background: "black", color: "white" }}
            onClick={() => {
              setRotate(rotate - 90);
            }}
          >
            <RotateCcw size={24} />
          </button>
          <button
            className="epic-h-10 epic-w-10 epic-rounded-full epic-bg-black epic-text-white epic-flex epic-items-center epic-justify-center"
            style={{ background: "black", color: "white" }}
            onClick={() => {
              setRotate(rotate + 90);
            }}
          >
            <RotateCw size={24} />
          </button>
          <button
            className="epic-h-10 epic-w-10 epic-rounded-full epic-bg-black epic-text-white epic-flex epic-items-center epic-justify-center"
            style={{ background: "black", color: "white" }}
            onClick={() => {
              updateIsMaximized((p) => {
                if (p) exitFullscreen();
                else enterFullscreen();

                return !p;
              });
            }}
          >
            {isMaximized ? <Minimize2 size={24} /> : <Maximize2 size={24} />}
          </button>
          <button
            className="epic-h-10 epic-w-10 epic-rounded-full epic-bg-black epic-text-white epic-flex epic-items-center epic-justify-center"
            style={{ background: "black", color: "white" }}
            onClick={() => {
              updateIsOpen(false);
              updateActiveIndex(-1);
            }}
          >
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Lightbox navigation */}
      <button
        className={twMerge(
          "epic-absolute epic-top-2/4 epic-left-3 epic-h-16 epic-w-16 epic-rounded-full epic-bg-black epic-text-white epic-flex epic-items-center epic-justify-center disabled:epic-hidden -epic-translate-y-2/4 epic-z-50 epic-transition-all",
          !showControls && "-epic-left-96"
        )}
        style={{
          background: "black",
          color: "white",
          left: showControls ? 12 : -384,
        }}
        onClick={() => {
          slideElemRef.current?.swiper.slidePrev();
        }}
        disabled={slideElemRef.current?.swiper?.isBeginning}
      >
        <ChevronLeft size={44} />
      </button>
      <button
        className={twMerge(
          "epic-absolute epic-top-2/4 epic-right-3 epic-h-16 epic-w-16 epic-rounded-full !epic-bg-black !epic-text-white epic-flex epic-items-center epic-justify-center disabled:epic-hidden -epic-translate-y-2/4 epic-z-50 epic-transition-all",
          !showControls && "-epic-right-96"
        )}
        style={{
          background: "black",
          color: "white",
          right: showControls ? 12 : -384,
        }}
        onClick={() => {
          slideElemRef.current?.swiper.slideNext();
        }}
        disabled={slideElemRef.current?.swiper?.isEnd}
      >
        <ChevronRight size={44} />
      </button>

      {/* Image view */}
      {isOpen && (
        <div className="epic-h-full epic-max-h-screen">
          <TransformWrapper
            minScale={0.6}
            maxScale={3.3}
            centerOnInit
            centerZoomedOut
            smooth
            disablePadding
          >
            {(utils) => (
              <TransformComponent>
                <Swiper
                  ref={slideElemRef}
                  slidesPerView={1}
                  spaceBetween={20}
                  grabCursor
                  className="epic-h-full epic-max-h-screen"
                  pagination={{ clickable: true }}
                  onSlideChange={(swiper) => {
                    updateActiveIndex(swiper.realIndex);

                    utils.resetTransform(1, "easeOut");
                  }}
                  onClick={() => {
                    updateShowControls((p) => !p);
                  }}
                  modules={[Pagination]}
                >
                  {imageList.map((image, index) => (
                    <SwiperSlide
                      key={index}
                      className="epic-z-[9999] epic-flex epic-items-center epic-justify-center"
                    >
                      {/* <img src={image.src} alt="" className="epic-w-full epic-h-full" /> */}
                      <EpicImage
                        key={index}
                        width={image.width}
                        height={image.height}
                        className="epic-w-max epic-max-h-screen epic-transition-all epic-object-contain epic-scale-100"
                        wrapperClassName="epic-flex epic-items-center epic-justify-center epic-h-full"
                        loaderClassName="epic-w-screen"
                        {...image}
                        imgStyle={{
                          rotate:
                            activeIndex === index ? `${rotate}deg` : "0deg",
                        }}
                        title={image.title}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </TransformComponent>
            )}
          </TransformWrapper>
        </div>
      )}

      {/* Image list panel */}
      <div
        className={twMerge(
          "epic-transition-all",
          !showControls && "epic-translate-y-40"
        )}
      >
        <LightBoxImageList slideElemRef={slideElemRef.current} />
      </div>
    </div>
  );
};

export default EpicLightBox;
