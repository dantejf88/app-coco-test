import { Dispatch, SetStateAction } from "react";
import { SHAPES } from "./constants";
import { renderShape } from "../DraggableShape/utils";

interface OptionsColumnProps {
  setAreaDimensions: (dimensions: { width: number; height: number }) => void;
  shapesList: {
    id: number;
    type: string;
    position: { x: number; y: number };
  }[];
  setShapesList: Dispatch<
    SetStateAction<
      {
        id: number;
        type: string;
        position: {
          x: number;
          y: number;
        };
      }[]
    >
  >;
  imagesList: { id: number; src: string; position: { x: number; y: number } }[];
  setImagesList: Dispatch<
    SetStateAction<
      {
        id: number;
        src: string;
        position: {
          x: number;
          y: number;
        };
      }[]
    >
  >;
  textsList: {
    id: number;
    text: string;
    position: { x: number; y: number };
    textSize: string;
    fontFamily: string;
    textColor: string;
  }[];
  setTextsList: Dispatch<
    SetStateAction<
      {
        id: number;
        text: string;
        position: {
          x: number;
          y: number;
        };
        textSize: string;
        fontFamily: string;
        textColor: string;
      }[]
    >
  >;
  setTextSize: Dispatch<SetStateAction<string>>;
  textSize: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  text: string;
  setFontFamily: React.Dispatch<React.SetStateAction<string>>;
  fontFamily: string;
  setTextColor: React.Dispatch<React.SetStateAction<string>>;
  textColor: string;
}

const OptionsColumn = (props: OptionsColumnProps) => {
  const {
    setTextSize,
    setShapesList,
    setImagesList,
    shapesList,
    imagesList,
    textsList,
    setTextsList,
    textSize,
    setText,
    text,
    fontFamily,
    setFontFamily,
    textColor,
    setTextColor,
  } = props;

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
    <div style={{ display: "flex", width: "20%", height: "100%" }}>
      <div style={{ width: "100%", padding: "20px", background: "#f0f0f0" }}>
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
            {SHAPES.map((shape) => (
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
    </div>
  );
};

export default OptionsColumn;
