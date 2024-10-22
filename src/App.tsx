import { useState } from "react";
import "./App.css";
import OptionsColumn from "./components/OptionsColumn";
import DraggableArea from "./components/DraggableArea";

function App() {
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
  const [areaDimensions, setAreaDimensions] = useState({ width: 0, height: 0 });
  return (
    <>
      <OptionsColumn
        shapesList={shapesList}
        imagesList={imagesList}
        textsList={textsList}
        setAreaDimensions={setAreaDimensions}
        setShapesList={setShapesList}
        setImagesList={setImagesList}
        setTextsList={setTextsList}
        setText={setText}
        text={text}
        setTextSize={setTextSize}
        textSize={textSize}
        setFontFamily={setFontFamily}
        fontFamily={fontFamily}
        setTextColor={setTextColor}
        textColor={textColor}
      />
      <DraggableArea
        areaDimensions={areaDimensions}
        setAreaDimensions={setAreaDimensions}
        shapesList={shapesList}
        imagesList={imagesList}
        textsList={textsList}
      />
    </>
  );
}

export default App;
