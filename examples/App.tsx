import React, { useState } from "react";
import EpicGallery from "../src/components/EpicGallery";
import { EpicImageProps } from "../src";

// 25 images
const imageList: EpicImageProps[] = [
  {
    title: "The first image",
    alt: "",
    src: "https://picsum.photos/id/95/800/800",
  },
  {
    title: "The first second",
    alt: "",
    src: "https://picsum.photos/id/10/800/800",
  },
  {
    alt: "",
    src: "https://picsum.photos/id/11/800/800",
  },
  {
    alt: "",
    src: "https://picsum.photos/id/7/800/800",
  },
  {
    alt: "",
    height: 400,
    width: 400,
    src: "https://picsum.photos/id/37/800/800",
  },
  {
    alt: "",
    height: 400,
    width: 400,
    src: "https://picsum.photos/id/53/800/800",
  },
  {
    alt: "",
    height: 400,
    width: 400,
    src: "https://picsum.photos/id/66/800/800",
  },
  {
    alt: "",
    height: 400,
    width: 400,
    src: "https://picsum.photos/id/43/800/800",
  },
  {
    alt: "",
    height: 400,
    width: 400,
    src: "https://picsum.photos/id/30/800/800",
  },
  {
    alt: "",
    height: 400,
    width: 400,
    src: "https://picsum.photos/id/15/800/800",
  },
  {
    alt: "",
    height: 400,
    width: 400,
    src: "https://picsum.photos/id/69/800/800",
  },
  {
    alt: "",
    height: 400,
    width: 400,
    src: "https://picsum.photos/id/42/800/800",
  },
  {
    alt: "",
    height: 400,
    width: 400,
    src: "https://picsum.photos/id/48/800/800",
  },
  {
    alt: "",
    height: 400,
    width: 400,
    src: "https://picsum.photos/id/60/800/800",
  },
  {
    alt: "",
    height: 400,
    width: 400,
    src: "https://picsum.photos/id/44/800/800",
  },
  {
    alt: "",
    height: 400,
    width: 400,
    src: "https://picsum.photos/id/46/800/800",
  },
];

const App = () => {
  const [length, setLength] = useState(5)
  
  return (
    <div
      id="epic-container"
      className=""
      style={{ maxWidth: 1200, margin: "auto" }}
    >
      <EpicGallery imageList={imageList.slice(0, length)} />
    </div>
  );
};

export default App;
