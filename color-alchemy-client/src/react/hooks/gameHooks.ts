import type { ShapeColor } from '../../data/types';
import { useGameContext } from '../context/gameContext';

export const BLACK: ShapeColor = [0, 0, 0];

export const useSourceColor = (x: number, y: number): ShapeColor => {
  const { coloredSources } = useGameContext();

  const foundSource = coloredSources.find(
    ({ x: sourceX, y: sourceY }) => x === sourceX && y === sourceY,
  );

  if (foundSource) return foundSource.color;

  return BLACK;
};

export const useBoardTileColor = (x: number, y: number): ShapeColor => {
  const { coloredBoardTiles } = useGameContext();
  const coloredTile = coloredBoardTiles.find(
    ({ x: tileX, y: tileY }) => x === tileX && y === tileY,
  );

  return coloredTile?.color ?? BLACK;
};
