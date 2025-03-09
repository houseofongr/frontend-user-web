import Konva from "konva";
import { useEffect, useRef, useState } from "react";
import { Circle } from "react-konva";
import { CircleData } from "../../types/items";
import { Html } from "react-konva-utils";

interface CircleProps {
  shapeProps: CircleData["circleData"];
  onClick: () => void;
}

function CircleItem({ shapeProps, onClick }: CircleProps) {
  const shapeRef = useRef<Konva.Circle | null>(null);
  const [effectSize, setEffectSize] = useState(window.innerWidth <= 768 ? 50 : 90);

  useEffect(() => {
    const handleResize = () => {
      setEffectSize(window.innerWidth <= 768 ? 50 : 90);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Circle
        {...shapeProps}
        onClick={onClick}
        onTap={onClick}
        // stroke={"blue"}
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
            top: `${shapeProps.y - effectSize / 2}px `,
            left: `${shapeProps.x - effectSize / 2}px`,
            // left: `${shapeProps.rotation === 0 ? shapeProps.x + shapeProps.width - 30 : shapeProps.x - 30}px`,
            // transform: `rotate(${shapeProps.rotation}deg)`,
            // transformOrigin: `${shapeProps.radiusY}px ${shapeProps.radiusX}px`,
          },
        }}
      >
        <img
          src="/images/effect/03-unscreen.gif"
          className="bg-transparent opacity-80"
          style={{ position: "relative", width: `${effectSize}px` }}
        />
      </Html>
    </>
  );
}

export default CircleItem;
