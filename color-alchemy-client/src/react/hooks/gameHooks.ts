import type { ShapeColor } from '../../data/types';
import { useGameContext } from '../context/gameContext';
import { useGameInfo } from './dataHooks';

const BLACK: ShapeColor = [0, 0, 0];

export const useSourceColor = (x: number, y: number): ShapeColor => {
  const { coloredSources } = useGameContext();

  const foundSource = coloredSources.find(
    ({ x: sourceX, y: sourceY }) => x === sourceX && y === sourceY,
  );

  if (foundSource) return foundSource.color;

  return BLACK;
};

export const useTileColor = (x: number, y: number): ShapeColor => {
  const { coloredSources, boardWidth, boardHeight } = useGameContext();
  const gameInfo = useGameInfo();
  if (!gameInfo) return BLACK;

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
