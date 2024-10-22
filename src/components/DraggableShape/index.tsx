import { useDraggable } from "../../hooks";
import { renderShape } from "./utils";

export const DraggableShape = ({
  shape,
  areaDimensions,
}: {
  shape: { id: number; type: string; position: { x: number; y: number } };
  areaDimensions: { width: number; height: number };
}) => {
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
