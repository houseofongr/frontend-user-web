import { Stage, Layer, Image as KonvaImage } from "react-konva";
import SpinnerIcon from "./icons/SpinnerIcon";
import { ShapeData } from "../types/items";
import RectItem from "./shapes/RectangleItem";
import CircleItem from "./shapes/CircleItem";
import EllipseItem from "./shapes/EllipseItem";

export interface ImageSize {
  width: number;
  height: number;
  scale: number;
  scaleAxis: string;
}

type KonvaContainerProps = {
  backgroundImage: HTMLImageElement | null;
  imageSize: ImageSize;
  shapes: ShapeData[];
  onItemClick: (itmeId: number) => void;
};

export default function KonvaContainer({ backgroundImage, imageSize, shapes, onItemClick }: KonvaContainerProps) {
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

        {shapes.map((shape) => {
          if ("rectangleData" in shape && shape.rectangleData) {
            return (
              <RectItem
                key={shape.id}
                fill={shape.fill ? shape.fill : "#ffff"}
                shapeProps={shape.rectangleData}
                onClick={() => onItemClick(shape.id)}
              />
            );
          } else if ("circleData" in shape && shape.circleData) {
            return (
              <CircleItem
                key={shape.id}
                fill={shape.fill ? shape.fill : "#ffff"}
                shapeProps={shape.circleData}
                onClick={() => onItemClick(shape.id)}
              />
            );
          } else if ("ellipseData" in shape && shape.ellipseData) {
            return (
              <EllipseItem
                key={shape.id}
                fill={shape.fill ? shape.fill : "#ffff"}
                shapeProps={shape.ellipseData}
                onClick={() => onItemClick(shape.id)}
              />
            );
          }
          return null;
        })}
      </Layer>
    </Stage>
  );
}
