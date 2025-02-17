import Konva from "konva";
import { useRef } from "react";
import { Circle } from "react-konva";
import { CircleData } from "../../types/items";

interface CircleProps {
  shapeProps: CircleData["circleData"];
  fill: string;
  onClick: () => void;
}

function CircleItem({ shapeProps, fill, onClick }: CircleProps) {
  const shapeRef = useRef<Konva.Circle | null>(null);

  return (
    <Circle
      {...shapeProps}
      fill={fill}
      draggable
      onClick={onClick}
      opacity={0.6}
      stroke={"red"}
      strokeWidth={2}
      ref={shapeRef}
    />
  );
}

export default CircleItem;
