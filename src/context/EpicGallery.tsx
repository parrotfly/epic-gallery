import { Dispatch, SetStateAction, createContext, useContext } from "react";
import { EpicImageProps } from "../components/EpicImage";

interface EpicGalleryContext {
  imageList: EpicImageProps[];
  activeIndex: number;
  isOpen: boolean;
  isMaximized: boolean;
  showControls: boolean;
  updateImageList: Dispatch<SetStateAction<EpicImageProps[]>>;
  updateActiveIndex: Dispatch<SetStateAction<number>>;
  updateIsOpen: Dispatch<SetStateAction<boolean>>;
  updateIsMaximized: Dispatch<SetStateAction<boolean>>;
  updateShowControls: Dispatch<SetStateAction<boolean>>;
}

export const defaultGalleryContext: EpicGalleryContext = {
  activeIndex: -1,
  imageList: [],
  isOpen: false,
  isMaximized: false,
  showControls: true,
  updateActiveIndex: () => {},
  updateImageList: () => {},
  updateIsOpen: () => {},
  updateIsMaximized: () => {},
  updateShowControls: () => {},
};

const EpicGalleryContext = createContext<EpicGalleryContext>(
  defaultGalleryContext
);
export default EpicGalleryContext;

/**
 * Use context hook
 */
export const useEpicGalleryContext = () => useContext(EpicGalleryContext);
