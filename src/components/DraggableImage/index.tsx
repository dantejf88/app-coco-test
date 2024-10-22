import { useDrag } from "@use-gesture/react";
import { Resizable } from "re-resizable";
import { useState } from "react";
import { DraggableImageProps } from "./types";

export const DraggableImage = ({
  src,
  initialPosition,
  areaDimensions,
}: DraggableImageProps) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);

  const bind = useDrag(
    ({ offset: [mx, my], memo = { x: position.x, y: position.y } }) => {
      setIsDragging(true);
      const newX = Math.max(0, Math.min(mx, areaDimensions.width - 100));
      const newY = Math.max(0, Math.min(my, areaDimensions.height - 100));
      setPosition({ x: newX, y: newY });
      return memo;
    },
    {
      from: () => [position.x, position.y],
      onPointerDown: () => setIsDragging(true),
      onPointerUp: () => setIsDragging(false),
    }
  );

  return (
    <Resizable
      defaultSize={{
        width: 100,
        height: 100,
      }}
      style={{
        position: "absolute",
        top: `${position.y}px`,
        left: `${position.x}px`,
        touchAction: "none",
        zIndex: 1,
      }}
      enable={{
        top: false,
        right: true,
        bottom: true,
        left: false,
        topRight: true,
        bottomRight: true,
        bottomLeft: true,
        topLeft: false,
      }}
    >
      <div
        {...bind()}
        style={{
          width: "100%",
          height: "100%",
          touchAction: "none",
          cursor: isDragging ? "grabbing" : "grab",
        }}
      >
        <img
          src={src}
          alt="Uploaded"
          style={{ width: "100%", height: "100%", touchAction: "none" }}
        />
      </div>
    </Resizable>
  );
};
