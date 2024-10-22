export const renderShape = (type: string, size: number = 100) => {
  switch (type) {
    case "circle":
      return {
        borderRadius: "50%",
        width: size,
        height: size,
        background: "blue",
      };
    case "square":
      return { width: size, height: size, background: "yellow" };
    case "triangle":
      return {
        width: 0,
        height: 0,
        borderLeft: `${size / 2}px solid transparent`,
        borderRight: `${size / 2}px solid transparent`,
        borderBottom: `${size}px solid green`,
      };
    case "rectangle":
      return { width: size * 2, height: size, background: "orange" };
    default:
      return {};
  }
};
