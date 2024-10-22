export interface DraggableShapeProps {
  shape: { id: number; type: string; position: { x: number; y: number } };
  areaDimensions: { width: number; height: number };
}
