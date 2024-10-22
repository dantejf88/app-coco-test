export interface DraggableAreaProps {
  setAreaDimensions: (dimensions: { width: number; height: number }) => void;
  areaDimensions: { width: number; height: number };
  shapesList: {
    id: number;
    type: string;
    position: { x: number; y: number };
  }[];
  imagesList: { id: number; src: string; position: { x: number; y: number } }[];
  textsList: {
    id: number;
    text: string;
    position: { x: number; y: number };
    textSize: string;
    fontFamily: string;
    textColor: string;
  }[];
}
