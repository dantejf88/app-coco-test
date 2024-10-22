import { useDrag } from "@use-gesture/react";
import { Resizable } from "re-resizable";
import { useState } from "react";

export const DraggableImage = ({
  src,
  initialPosition,
  areaDimensions,
}: {
  src: string;
  initialPosition: { x: number; y: number };
  areaDimensions: { width: number; height: number };
}) => {
  const [position, setPosition] = useState(initialPosition);

  const bind = useDrag(
    ({ movement: [mx, my], memo = { x: position.x, y: position.y } }) => {
      const newX = Math.max(
        0,
        Math.min(memo.x + mx, areaDimensions.width - 100)
      );
      const newY = Math.max(
        0,
        Math.min(memo.y + my, areaDimensions.height - 100)
      );
      setPosition({ x: newX, y: newY });
      return { x: newX, y: newY };
    },
    { from: () => [position.x, position.y], pointer: { touch: false } }
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
        style={{ width: "100%", height: "100%", touchAction: "none" }}
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
