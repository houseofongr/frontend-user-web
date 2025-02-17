import { ShapeData } from "../types/items";

const formatShapeDataForView = (shape: ShapeData, imageSize: { width: number; height: number; scale: number }) => {
  const offsetX = (window.innerWidth - imageSize.width * imageSize.scale) / 2;
  const offsetY = (window.innerHeight - imageSize.height * imageSize.scale) / 2;

  if ("circleData" in shape && shape.circleData) {
    return {
      ...shape,
      circleData: {
        x: Number((shape.circleData.x * imageSize.scale + offsetX).toFixed(2)),
        y: Number((shape.circleData.y * imageSize.scale + offsetY).toFixed(2)),
        radius: Number((shape.circleData.radius * imageSize.scale).toFixed(2)),
      },
    };
  } else if ("rectangleData" in shape && shape.rectangleData) {
    return {
      ...shape,
      rectangleData: {
        x: Number((shape.rectangleData.x * imageSize.scale + offsetX).toFixed(2)),
        y: Number((shape.rectangleData.y * imageSize.scale + offsetY).toFixed(2)),
        width: Number((shape.rectangleData.width * imageSize.scale).toFixed(2)),
        height: Number((shape.rectangleData.height * imageSize.scale).toFixed(2)),
        rotation: Number(shape.rectangleData.rotation.toFixed(2)),
      },
    };
  } else if ("ellipseData" in shape && shape.ellipseData) {
    return {
      ...shape,
      ellipseData: {
        x: Number((shape.ellipseData.x * imageSize.scale + offsetX).toFixed(2)),
        y: Number((shape.ellipseData.y * imageSize.scale + offsetY).toFixed(2)),
        radiusX: Number((shape.ellipseData.radiusX * imageSize.scale).toFixed(2)),
        radiusY: Number((shape.ellipseData.radiusY * imageSize.scale).toFixed(2)),
        rotation: Number(shape.ellipseData.rotation.toFixed(2)),
      },
    };
  }
  return shape;
};

export default formatShapeDataForView;
