import { useEffect, useState, type SetStateAction } from 'react';
import type { ColoredTile, ShapeColor } from '../../data/types';
import { useGameContext } from '../context/gameContext';
import {
  getColorForInitialMove,
  getDifferenceWithTargetColor,
  getTileColor,
  isBlack,
  makeMapKey,
} from '../context/colorTilesUtils';
import type { GameInfo } from '../../data/parser/parser';
import { BLACK } from '../../data/constants';

type UseColoringMovesReturnType = {
  coloredSources: ColoredTile[];
  setColoredSource: (source: ColoredTile) => void;
  totalMovesLeft: number;
  initialMoves: number;
  setInitialSourceColor: (x: number, y: number) => void;
};

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
  const coloredTile = coloredBoardTiles.get(makeMapKey(x, y));

  return coloredTile?.color ?? BLACK;
};

export const useColoringMoves = (
  gameInfo: GameInfo,
): UseColoringMovesReturnType => {
  const [coloredSources, setColoredSources] = useState<ColoredTile[]>([]);
  const [totalMovesLeft, setTotalMovesLeft] = useState(gameInfo.maxMoves);
  const [initialMoves, setInitialMoves] = useState(3);

  const setColoredSource = (sourceToSet: ColoredTile) => {
    const { color: colorToSet } = sourceToSet;
    const colorToSetIsBlack =
      colorToSet[0] === 0 && colorToSet[1] === 0 && colorToSet[2] === 0;
    setColoredSources((prevColoredSources) => {
      const filteredColoredSources = prevColoredSources.filter(
        ({ x, y }) => sourceToSet.x !== x || sourceToSet.y !== y,
      );

      if (colorToSetIsBlack) return filteredColoredSources;

      return [...filteredColoredSources, sourceToSet];
    });

    setTotalMovesLeft((prevDragMoves) => prevDragMoves - 1);
  };

  const setInitialSourceColor = (x: number, y: number) => {
    if (initialMoves < 1) return;
    const color = getColorForInitialMove(initialMoves);

    setColoredSource({ x, y, color });
    setInitialMoves((prevMoves) => prevMoves - 1);
  };

  return {
    coloredSources,
    setColoredSource,
    totalMovesLeft,
    initialMoves,
    setInitialSourceColor,
  };
};

export const useColoredTiles = (
  setColoredBoardTiles: React.Dispatch<
    SetStateAction<Map<string, ColoredTile>>
  >,
) => {
  const { coloredSources, boardWidth, boardHeight } = useGameContext();
  const setTiles = () => {
    const coloredTiles = new Map<string, ColoredTile>();

    const setTilesForHorizontalSources = (tileY: number) => {
      Array.from({ length: boardWidth }).forEach((_, sourceX) => {
        if (sourceX > 0 && sourceX < boardWidth - 1) {
          coloredTiles.set(makeMapKey(sourceX, tileY), {
            x: sourceX,
            y: tileY,
            color: getTileColor(
              sourceX,
              tileY,
              boardWidth,
              boardHeight,
              coloredSources,
            ),
          });
        }
      });
    };

    const seTilesForVerticalSources = (tileX: number) => {
      Array.from({ length: boardHeight }).forEach((_, sourceY) => {
        if (sourceY > 0 && sourceY < boardHeight - 1) {
          coloredTiles.set(makeMapKey(tileX, sourceY), {
            x: tileX,
            y: sourceY,
            color: getTileColor(
              tileX,
              sourceY,
              boardWidth,
              boardHeight,
              coloredSources,
            ),
          });
        }
      });
    };

    coloredSources.forEach((source) => {
      const { x, y } = source;
      if (x === 0 || x === boardWidth - 1) {
        setTilesForHorizontalSources(y);
      } else {
        seTilesForVerticalSources(x);
      }
    });

    setColoredBoardTiles(coloredTiles);
  };

  useEffect(() => {
    setTiles();
  }, [coloredSources]);
};

export const useClosestColor = (
  setClosestColor: React.Dispatch<SetStateAction<ColoredTile>>,
  setClosestColorDifference: React.Dispatch<SetStateAction<number>>,
) => {
  const { coloredBoardTiles, gameInfo } = useGameContext();

  const getClosestColor = (): ColoredTile | null => {
    return Array.from(coloredBoardTiles.values()).reduce<ColoredTile | null>(
      (acc, boardTile): ColoredTile | null => {
        if (!acc) return boardTile;

        if (
          getDifferenceWithTargetColor(boardTile.color, gameInfo.target) <
          getDifferenceWithTargetColor(acc.color, gameInfo.target)
        ) {
          return boardTile;
        }

        return acc;
      },
      null,
    );
  };

  useEffect(() => {
    const closestTile = getClosestColor();
    if (!closestTile) return;
    setClosestColor(closestTile);
    setClosestColorDifference(
      getDifferenceWithTargetColor(closestTile.color, gameInfo.target),
    );
  }, [coloredBoardTiles]);
};

export const useGameEnd = (restartGame: (userId: string) => void) => {
  const { gameInfo, closestColorDifference, totalMovesLeft, closestColor } =
    useGameContext();

  useEffect(() => {
    const hasLost = totalMovesLeft < 1;
    const hasWon =
      closestColorDifference <= 0.1 && !isBlack(closestColor.color);
    if (hasWon || hasLost) {
      const message = `${hasWon ? 'Success' : 'Failure'}! Closest match is ${(closestColorDifference * 100).toFixed(2)}%! Do you want to play again?`;
      if (window.confirm(message)) {
        restartGame(gameInfo.userId);
      }
    }
  }, [closestColorDifference, totalMovesLeft, restartGame]);
};
