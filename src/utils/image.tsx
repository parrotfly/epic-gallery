import { isMobileDevice } from ".";

export interface EmageData {
  width: number;
  height: number;
  ratio: number;
}

export interface MasonryPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface DynamicPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function calculateDynamicLayout(
  images: EmageData[],
  containerId: string
): DynamicPosition[] {
  const container = document.getElementById(containerId);
  if (!container) {
    throw new Error(`Container with id '${containerId}' not found.`);
  }

  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  const positions: DynamicPosition[] = [];
  let currentX = 0;
  let currentY = 0;

  for (let imageIndex = 0; imageIndex < images.length; imageIndex++) {
    const image = images[imageIndex];
    const imageWidth = containerWidth / 4; // Divide container width by the number of images per row
    const imageHeight = imageWidth / image.ratio;

    // Check if the image can fit in the current row without exceeding container height
    if (currentX + imageWidth > containerWidth) {
      currentX = 0;
      currentY =
        positions[positions.length - 1].y +
        positions[positions.length - 1].height; // Set y to the previous image's y-end position
    }

    positions.push({
      x: currentX,
      y: currentY,
      width: imageWidth,
      height: imageHeight,
    });

    currentX += imageWidth;
  }

  return positions;
}

export interface ImageInfo {
  width: number;
  height: number;
  aspectRatio: number;
}

export async function getImageInfo(imageUrl: string): Promise<ImageInfo> {
  return new Promise<ImageInfo>((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const width = img.width;
      const height = img.height;
      const aspectRatio = width / height;

      resolve({ width, height, aspectRatio });
    };

    img.onerror = (error) => {
      reject(error);
    };

    img.src = imageUrl;
  });
}

export function generateGridTemplateAreas(imageListLength: number): string {
  const className = "__epic_gallery_grid_";

  if (isMobileDevice() && imageListLength > 5) {
    return `${className}${5}`;
  }

  return `${className}${imageListLength > 13 ? "13" : imageListLength}`;
}
