import { Ellipse } from "react-konva";
import Konva from "konva";
import { useRef } from "react";
import { EllipseData } from "../../types/items";

interface EllipseProps {
  shapeProps: EllipseData["ellipseData"];
  // fill: string;
  onClick: () => void;
}

function EllipseItem({ shapeProps, onClick }: EllipseProps) {
  const shapeRef = useRef<Konva.Ellipse | null>(null);

  return (
    <Ellipse
      {...shapeProps}
      // fill={fill}
      opacity={0.6}
      stroke={"red"}
      strokeWidth={2}
      onClick={onClick}
      ref={shapeRef}
    />
  );
}

export default EllipseItem;
