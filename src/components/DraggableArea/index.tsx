import { useRef, useEffect } from "react";
import { DraggableText } from "../DraggableText";
import { DraggableImage } from "../DraggableImage";
import { DraggableShape } from "../DraggableShape";
import { DraggableAreaProps } from "./types";

const DraggableArea = (props: DraggableAreaProps) => {
  const areaRef = useRef<HTMLDivElement>(null);
  const {
    setAreaDimensions,
    areaDimensions,
    shapesList,
    imagesList,
    textsList,
  } = props;

  useEffect(() => {
    if (areaRef.current) {
      const { offsetWidth, offsetHeight } = areaRef.current;
      setAreaDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, [areaRef, setAreaDimensions]);

  return (
    <div
      ref={areaRef}
      style={{ display: "flex", width: "80%", height: "100%" }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "lightgray",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {shapesList.map((shape) => (
          <DraggableShape
            key={shape.id}
            shape={shape}
            areaDimensions={areaDimensions}
          />
        ))}
        {imagesList.map((image) => (
          <DraggableImage
            key={image.id}
            src={image.src}
            initialPosition={image.position}
            areaDimensions={areaDimensions}
          />
        ))}
        {textsList.map((textItem) => (
          <DraggableText
            key={textItem.id}
            text={textItem.text}
            initialPosition={textItem.position}
            areaDimensions={areaDimensions}
            textSize={textItem.textSize}
            fontFamily={textItem.fontFamily}
            textColor={textItem.textColor}
          />
        ))}
      </div>
    </div>
  );
};

export default DraggableArea;
