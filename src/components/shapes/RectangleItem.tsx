import { Rect } from "react-konva";
import Konva from "konva";
import { useEffect, useRef, useState } from "react";
import { RectangleData } from "../../types/items";
import { Html } from "react-konva-utils";

interface RectangleProps {
  shapeProps: RectangleData["rectangleData"];
  onClick: () => void;
}

function RectItem({ shapeProps, onClick }: RectangleProps) {
  const shapeRef = useRef<Konva.Rect | null>(null);
  const [effectSize, setEffectSize] = useState(window.innerWidth <= 768 ? 50 : 90);

  // 1. Rectangle 중심 좌표값
  const centerX = shapeProps.x + shapeProps.width / 2;
  const centerY = shapeProps.y + shapeProps.height / 2;

  // 2. Rotation 적용을 위한 라디안 값 변환
  // 0도 : 0 , 45도 : 0.5236, 90도 : 1.5708, 180도 : 3.1416
  const rotationRad = (shapeProps.rotation * Math.PI) / 180;

  // 3. 회전된 중심 좌표를 계산
  const rotatedX =
    shapeProps.x + (centerX - shapeProps.x) * Math.cos(rotationRad) - (centerY - shapeProps.y) * Math.sin(rotationRad);
  const rotatedY =
    shapeProps.y + (centerX - shapeProps.x) * Math.sin(rotationRad) + (centerY - shapeProps.y) * Math.cos(rotationRad);

  useEffect(() => {
    const handleResize = () => {
      // 모바일에서 50 / 그 이상 디바이스에서는 90으로 effect size 설정
      setEffectSize(window.innerWidth <= 768 ? 50 : 90);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Rect
        {...shapeProps}
        // opacity={0.6}
        // stroke={"red"}
        // strokeWidth={2}
        ref={shapeRef}
        onClick={onClick}
        onTap={onClick}
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
            top: `${rotatedY - effectSize / 2}px`,
            left: `${rotatedX - effectSize / 2}px`,
            // transform: `rotate(${shapeProps.rotation}deg)`,
            // transformOrigin: `${shapeProps.y + shapeProps.height / 2}px ${shapeProps.x + shapeProps.width / 2}px`,
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

export default RectItem;
