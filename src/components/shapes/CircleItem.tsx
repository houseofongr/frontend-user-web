import Konva from "konva";
import { useRef } from "react";
import { Circle } from "react-konva";
import { CircleData } from "../../types/items";
import { Html } from "react-konva-utils";
import { EFFECT_SIZE } from "../../constants/componentSize";

interface CircleProps {
  shapeProps: CircleData["circleData"];
  onClick: () => void;
}

function CircleItem({ shapeProps, onClick }: CircleProps) {
  const shapeRef = useRef<Konva.Circle | null>(null);

  return (
    <>
      <Circle
        {...shapeProps}
        onClick={onClick}
        // stroke={"red"}
        // strokeWidth={2}
        ref={shapeRef}
        onMouseEnter={() => {
          document.body.style.cursor = "pointer";
        }}
        onMouseLeave={() => {
          document.body.style.cursor = "default";
        }}
      />
      <Html
        divProps={{
          style: {
            position: "absolute",
            pointerEvents: "none",
            top: `${shapeProps.y - EFFECT_SIZE / 2}px `,
            left: `${shapeProps.x - EFFECT_SIZE / 2}px`,
            // left: `${shapeProps.rotation === 0 ? shapeProps.x + shapeProps.width - 30 : shapeProps.x - 30}px`,
            // transform: `rotate(${shapeProps.rotation}deg)`,
            // transformOrigin: `${shapeProps.radiusY}px ${shapeProps.radiusX}px`,
          },
        }}
      >
        <img
          src="/images/effect/03-unscreen.gif"
          className="bg-transparent opacity-80"
          style={{ position: "relative", width: `${EFFECT_SIZE}px` }}
        />
      </Html>
    </>
  );
}

export default CircleItem;
