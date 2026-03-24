import type { ShapeColor } from '../../data/types';
import { BLACK } from '../hooks/gameHooks';
import type { ColoredTile } from './gameContext';

export const getDifferenceWithTargetColor = (
  tileColor: ShapeColor,
  targetColor: ShapeColor,
): number => {
  return (
    (((1 / 255) * 1) / Math.sqrt(3)) *
    Math.sqrt(
      Math.pow(targetColor[0] - tileColor[0], 2) +
        Math.pow(targetColor[1] - tileColor[1], 2) +
        Math.pow(targetColor[2] - tileColor[2], 2),
    )
  );
};

export const getTileColor = (
  x: number,
  y: number,
  boardWidth: number,
  boardHeight: number,
  coloredSources: ColoredTile[],
): ShapeColor => {
  const validSources = coloredSources.filter(
    ({ x: sourceX, y: sourceY }) => sourceX === x || sourceY === y,
  );

  if (validSources.length === 0) return BLACK;

  const colorsSum = validSources.reduce((acc, validSource): ShapeColor => {
    if (validSource.x !== x && validSource.y !== y) return BLACK;

    const isXSource = validSource.x === 0 || validSource.x === boardWidth - 1;

    const distanceToSource = Math.abs(
      isXSource ? x - validSource.x : y - validSource.y,
    );

    let currentSourceColorInfluence: ShapeColor;

    if (isXSource) {
      currentSourceColorInfluence = [
        ((boardWidth + 1 - distanceToSource) / (boardWidth + 1)) *
          validSource.color[0],
        ((boardWidth + 1 - distanceToSource) / (boardWidth + 1)) *
          validSource.color[1],
        ((boardWidth + 1 - distanceToSource) / (boardWidth + 1)) *
          validSource.color[2],
      ];
    } else {
      currentSourceColorInfluence = [
        ((boardHeight + 1 - distanceToSource) / (boardHeight + 1)) *
          validSource.color[0],
        ((boardHeight + 1 - distanceToSource) / (boardHeight + 1)) *
          validSource.color[1],
        ((boardHeight + 1 - distanceToSource) / (boardHeight + 1)) *
          validSource.color[2],
      ];
    }

    return acc.map(
      (accValue, index) => accValue + currentSourceColorInfluence[index],
    ) as ShapeColor;
  }, BLACK);

  const [r, g, b] = colorsSum;

  const normalizationFactor = 255 / Math.max(r, g, b, 255);

  return colorsSum.map((value) => value * normalizationFactor) as ShapeColor;
};
