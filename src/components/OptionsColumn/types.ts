import { Dispatch, SetStateAction } from "react";

export interface OptionsColumnProps {
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
  setText: Dispatch<SetStateAction<string>>;
  text: string;
  setFontFamily: Dispatch<SetStateAction<string>>;
  fontFamily: string;
  setTextColor: Dispatch<SetStateAction<string>>;
  textColor: string;
}
