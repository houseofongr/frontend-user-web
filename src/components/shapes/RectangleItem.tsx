import { Rect } from "react-konva";
import Konva from "konva";
import { useRef } from "react";
import { RectangleData } from "../../types/items";

interface RectangleProps {
  shapeProps: RectangleData["rectangleData"];
  // fill: string;
  onClick: () => void;
}

function RectItem({ shapeProps, onClick }: RectangleProps) {
  const shapeRef = useRef<Konva.Rect | null>(null);

  return <Rect {...shapeProps} opacity={0.6} stroke={"red"} strokeWidth={2} ref={shapeRef} onClick={onClick} />;
}

export default RectItem;
