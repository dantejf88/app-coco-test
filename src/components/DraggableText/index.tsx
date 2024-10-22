import { useDraggable } from "../../hooks";

export const DraggableText = ({
  text,
  initialPosition,
  areaDimensions,
  textSize,
  fontFamily,
  textColor,
}: {
  text: string;
  initialPosition: { x: number; y: number };
  areaDimensions: { width: number; height: number };
  textSize: string;
  fontFamily: string;
  textColor: string;
}) => {
  const { position, bind } = useDraggable(initialPosition, areaDimensions);

  return (
    <div
      {...bind()}
      style={{
        position: "absolute",
        top: `${position.y}px`,
        left: `${position.x}px`,
        cursor: "move",
        padding: "5px",
        touchAction: "none",
        fontSize: textSize,
        fontFamily: fontFamily,
        color: textColor,
        zIndex: 2,
      }}
    >
      {text}
    </div>
  );
};
