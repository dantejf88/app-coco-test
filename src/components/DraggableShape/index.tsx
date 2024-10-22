import { useDraggable } from "../../hooks";
import { DraggableShapeProps } from "./types";
import { renderShape } from "./utils";

export const DraggableShape = ({
  shape,
  areaDimensions,
}: DraggableShapeProps) => {
  const { position, bind } = useDraggable(shape.position, areaDimensions);
  return (
    <div
      {...bind()}
      style={{
        position: "absolute",
        top: `${position.y}px`,
        left: `${position.x}px`,
        cursor: "move",
        touchAction: "none",
        zIndex: 2,
        ...renderShape(shape.type),
      }}
    />
  );
};
