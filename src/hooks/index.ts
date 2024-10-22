import { useDrag } from "@use-gesture/react";
import { useState } from "react";

export const useDraggable = (
  initialPosition: { x: number; y: number },
  areaDimensions: { width: number; height: number },
  setTextPosition?: (position: { x: number; y: number }) => void
) => {
  const [position, setPosition] = useState(initialPosition);

  const bind = useDrag(({ offset: [x, y], memo = { x: 0, y: 0 } }) => {
    const newX = Math.max(0, Math.min(x, areaDimensions.width - 100));
    const newY = Math.max(0, Math.min(y, areaDimensions.height - 100));
    setPosition({ x: newX, y: newY });
    if (setTextPosition) {
      setTextPosition({ x: newX, y: newY });
    }
    return memo;
  });

  return { position, bind };
};
