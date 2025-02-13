import { Stage, Layer, Image as KonvaImage } from "react-konva";
import SpinnerIcon from "./icons/SpinnerIcon";

export interface ImageSize {
  width: number;
  height: number;
  scale: number;
  scaleAxis: string;
}

type KonvaContainerProps = {
  backgroundImage: HTMLImageElement | null;
  imageSize: ImageSize;
};

export default function KonvaContainer({ backgroundImage, imageSize }: KonvaContainerProps) {
  if (!backgroundImage) return <SpinnerIcon />;
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {backgroundImage && (
          <KonvaImage
            image={backgroundImage}
            x={(window.innerWidth - imageSize.width * imageSize.scale) / 2}
            y={(window.innerHeight - imageSize.height * imageSize.scale) / 2}
            width={imageSize.width * imageSize.scale}
            height={imageSize.height * imageSize.scale}
          />
        )}
      </Layer>
    </Stage>
  );
}
