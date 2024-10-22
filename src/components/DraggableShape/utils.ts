export const renderShape = (type: string, size: number = 50) => {
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