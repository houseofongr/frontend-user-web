import Konva from "konva";
import { useRef } from "react";
import { Circle } from "react-konva";
import { CircleData } from "../../types/items";

interface CircleProps {
  shapeProps: CircleData["circleData"];
  onClick: () => void;
}

function CircleItem({ shapeProps, onClick }: CircleProps) {
  const shapeRef = useRef<Konva.Circle | null>(null);

  return (
    <Circle
      {...shapeProps}
      onClick={onClick}
      stroke={"red"}
      strokeWidth={2}
      ref={shapeRef}
      onMouseEnter={() => {
        document.body.style.cursor = "pointer";
      }}
      onMouseLeave={() => {
        document.body.style.cursor = "default";
      }}
    />
  );
}

export default CircleItem;
