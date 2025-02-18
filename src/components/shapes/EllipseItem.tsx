import { Ellipse } from "react-konva";
import Konva from "konva";
import { useRef } from "react";
import { EllipseData } from "../../types/items";

interface EllipseProps {
  shapeProps: EllipseData["ellipseData"];
  onClick: () => void;
}

function EllipseItem({ shapeProps, onClick }: EllipseProps) {
  const shapeRef = useRef<Konva.Ellipse | null>(null);

  return (
    <Ellipse
      {...shapeProps}
      // fill={fill}
      stroke={"red"}
      strokeWidth={2}
      onClick={onClick}
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

export default EllipseItem;
