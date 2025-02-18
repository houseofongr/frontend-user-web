import { Rect } from "react-konva";
import Konva from "konva";
import { useRef } from "react";
import { RectangleData } from "../../types/items";
// import { Html, useImage } from "react-konva-utils";

interface RectangleProps {
  shapeProps: RectangleData["rectangleData"];
  onClick: () => void;
}

function RectItem({ shapeProps, onClick }: RectangleProps) {
  const shapeRef = useRef<Konva.Rect | null>(null);
  // const [isHovered, setIsHovered] = useState(false);

  return (
    <Rect
      {...shapeProps}
      // opacity={0.6}
      // stroke={isHovered ? "white" : "black"}
      // strokeWidth={isHovered ? 4 : 2}
      stroke={"red"}
      strokeWidth={2}
      ref={shapeRef}
      onClick={onClick}
      onMouseEnter={() => {
        document.body.style.cursor = "pointer";
        // setIsHovered(true);
      }}
      onMouseLeave={() => {
        document.body.style.cursor = "default";
        // setIsHovered(false);
      }}
    />
  );
}

export default RectItem;
