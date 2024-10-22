import { useState, useRef, useEffect } from "react";
import { useDrag } from "@use-gesture/react";
import { Resizable } from "re-resizable";

const shapes = [
  { id: 1, type: "circle", label: "Circle" },
  { id: 2, type: "square", label: "Square" },
  { id: 3, type: "triangle", label: "Triangle" },
  { id: 4, type: "rectangle", label: "Rectangle" },
];

const renderShape = (type: string, size: number = 50) => {
  switch (type) {
    case "circle":
      return {
        borderRadius: "50%",
        width: size,
        height: size,
        background: "blue",
      };
    case "square":
      return { width: size, height: size, background: "red" };
    case "triangle":
      return {
        width: 0,
        height: 0,
        borderLeft: `${size / 2}px solid transparent`,
        borderRight: `${size / 2}px solid transparent`,
        borderBottom: `${size}px solid green`,
      };
    case "rectangle":
      return { width: size * 1.5, height: size, background: "orange" };
    default:
      return {};
  }
};

const useDraggable = (
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

const DraggableShape = ({
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

const DraggableText = ({
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

const DraggableImage = ({
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

  console.log("bind", bind());

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

const BaseComponentDraggableShapes = () => {
  const [shapesList, setShapesList] = useState<
    { id: number; type: string; position: { x: number; y: number } }[]
  >([]);
  const [imagesList, setImagesList] = useState<
    { id: number; src: string; position: { x: number; y: number } }[]
  >([]);
  const [textsList, setTextsList] = useState<
    {
      id: number;
      text: string;
      position: { x: number; y: number };
      textSize: string;
      fontFamily: string;
      textColor: string;
    }[]
  >([]);
  const [text, setText] = useState<string>("");
  const [textSize, setTextSize] = useState<string>("16px");
  const [fontFamily, setFontFamily] = useState<string>("Arial");
  const [textColor, setTextColor] = useState<string>("#000000");
  const areaRef = useRef<HTMLDivElement>(null);
  const [areaDimensions, setAreaDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (areaRef.current) {
      const { offsetWidth, offsetHeight } = areaRef.current;
      setAreaDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, []);

  const addShape = (type: string) => {
    setShapesList((prevShapes) => [
      ...prevShapes,
      { id: prevShapes.length + 1, type, position: { x: 0, y: 0 } },
    ]);
  };

  const addText = () => {
    setTextsList((prevTexts) => [
      ...prevTexts,
      {
        id: prevTexts.length + 1,
        text,
        position: { x: 0, y: 0 },
        textSize,
        fontFamily,
        textColor,
      },
    ]);
    setText("");
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target?.result as string;
        setImagesList((prevImages) => [
          ...prevImages,
          { id: prevImages.length + 1, src, position: { x: 0, y: 0 } },
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearAll = () => {
    setShapesList([]);
    setImagesList([]);
    setTextsList([]);
  };

  return (
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      <div style={{ width: "20%", padding: "20px", background: "#f0f0f0" }}>
        <h2 style={{ marginBottom: "15px" }}>Upload an Image</h2>
        <div
          style={{
            borderBottom: "1px solid black",
            paddingBottom: "20px",
            marginBottom: "40px",
          }}
        >
          <label
            htmlFor="imageUpload"
            style={{
              display: "block",
              padding: "10px",
              backgroundColor: "#4CAF50",
              color: "white",
              textAlign: "center",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            Select Image...
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </div>
        <div
          style={{
            borderBottom: "1px solid black",
            paddingBottom: "20px",
            marginBottom: "40px",
          }}
        >
          <h2 style={{ marginBottom: 0 }}>Create New Text</h2>
          <div style={{ marginRight: "23px" }}>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type something..."
              style={{ width: "100%", padding: "10px", marginTop: "20px" }}
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <label>Text Size: </label>
            <select
              value={textSize}
              onChange={(e) => setTextSize(e.target.value)}
              style={{ width: "100%", padding: "10px", marginTop: "10px" }}
            >
              <option value="12px">12px</option>
              <option value="14px">14px</option>
              <option value="16px">16px</option>
              <option value="18px">18px</option>
              <option value="20px">20px</option>
              <option value="24px">24px</option>
            </select>
          </div>
          <div style={{ marginTop: "20px" }}>
            <label>Font Family: </label>
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              style={{ width: "100%", padding: "10px", marginTop: "10px" }}
            >
              <option value="Arial">Arial</option>
              <option value="Courier New">Courier New</option>
              <option value="Georgia">Georgia</option>
              <option value="Times New Roman">Times New Roman</option>
            </select>
          </div>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label>Text Color: </label>
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              style={{
                width: "50px",
                height: "50px",
                padding: "10px",
                marginTop: "10px",
              }}
            />
          </div>
          <button
            onClick={addText}
            disabled={!text}
            style={{
              marginTop: "20px",
              padding: "10px",
              width: "100%",
              backgroundColor: text ? "#4CAF50" : "#A5D6A7",
              color: "white",
              border: "none",
              cursor: text ? "pointer" : "not-allowed",
            }}
          >
            Add
          </button>
        </div>
        <div
          style={{
            borderBottom: "1px solid black",
            paddingBottom: "20px",
            marginBottom: "40px",
          }}
        >
          <h2 style={{ marginBottom: 0 }}>Add Shape</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {shapes.map((shape) => (
              <div
                key={shape.id}
                onClick={() => addShape(shape.type)}
                style={{
                  cursor: "pointer",
                  padding: "10px",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "60px",
                  width: "60px",
                }}
              >
                <div style={{ ...renderShape(shape.type) }} />
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={clearAll}
          disabled={
            !shapesList.length && !imagesList.length && !textsList.length
          }
          style={{
            marginTop: "20px",
            padding: "10px",
            width: "100%",
            backgroundColor:
              !shapesList.length && !imagesList.length && !textsList.length
                ? "#A5D6A7"
                : "#4CAF50",
            color: "white",
            border: "none",
            cursor:
              !shapesList.length && !imagesList.length && !textsList.length
                ? "not-allowed"
                : "pointer",
          }}
        >
          Remove All
        </button>
      </div>

      <div
        ref={areaRef}
        style={{
          width: "80%",
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

export default BaseComponentDraggableShapes;
