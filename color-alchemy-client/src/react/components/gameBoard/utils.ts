export const isCorner = (
  x: number,
  y: number,
  width: number,
  height: number,
): boolean => {
  return (
    (x === 0 && y === 0) ||
    (x === 0 && y === height - 1) ||
    (x === width - 1 && y === height - 1) ||
    (x === width - 1 && y === 0)
  );
};

export const isSide = (
  x: number,
  y: number,
  width: number,
  height: number,
): boolean => {
  return x === 0 || y === 0 || x === width - 1 || y === height - 1;
};
