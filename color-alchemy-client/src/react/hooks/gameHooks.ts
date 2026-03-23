import { useContext } from 'react';
import { GameContext } from '../context/gameContext';
import { useGameInfo } from './dataHooks';

const BLACK: [number, number, number] = [0, 0, 0];

export const useSourceColor = (
  x: number,
  y: number,
): [number, number, number] => {
  const { coloredSources } = useContext(GameContext);

  const foundSource = coloredSources.find(
    ({ x: sourceX, y: sourceY }) => x === sourceX && y === sourceY,
  );

  if (foundSource) return foundSource.color;

  return BLACK;
};

export const useTileColor = (
  x: number,
  y: number,
): [number, number, number] => {
  const { coloredSources } = useContext(GameContext);
  const gameInfo = useGameInfo();
  if (!gameInfo) return BLACK;
  if (!coloredSources[0]) return BLACK;
  if (coloredSources[0].x !== x && coloredSources[0].y !== y) return BLACK;

  const isXSource =
    coloredSources[0].x === 0 || coloredSources[0].x === gameInfo.width - 1;

  const distanceToSource = Math.abs(
    isXSource ? x - coloredSources[0].x : y - coloredSources[0].y,
  );

  const { width, height } = gameInfo;

  if (isXSource) {
    return [
      ((width + 1 - distanceToSource) / (width + 1)) *
        coloredSources[0].color[0],
      ((width + 1 - distanceToSource) / (width + 1)) *
        coloredSources[0].color[1],
      ((width + 1 - distanceToSource) / (width + 1)) *
        coloredSources[0].color[2],
    ];
  }

  return [
    ((height + 1 - distanceToSource) / (height + 1)) *
      coloredSources[0].color[0],
    ((height + 1 - distanceToSource) / (height + 1)) *
      coloredSources[0].color[1],
    ((height + 1 - distanceToSource) / (height + 1)) *
      coloredSources[0].color[2],
  ];

  // const affectingSources = coloredSources.filter(
  //   ({ x: sourceX, y: sourceY }) => sourceX === x || sourceY === y,
  // );
};
