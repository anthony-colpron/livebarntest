import { useEffect, type PropsWithChildren, type SetStateAction } from 'react';
import { getDifferenceWithTargetColor, getTileColor } from './utils';
import { useGameContext, type ColoredTile } from './gameContext';

type Props = {
  setColoredBoardTiles: React.Dispatch<SetStateAction<ColoredTile[]>>;
  setClosestColor: React.Dispatch<SetStateAction<ColoredTile | undefined>>;
  setClosestColorDifference: React.Dispatch<SetStateAction<number | undefined>>;
} & PropsWithChildren;

export const EffectsLayer = ({
  setColoredBoardTiles,
  setClosestColor,
  setClosestColorDifference,
  children,
}: Props) => {
  const {
    coloredSources,
    boardWidth,
    boardHeight,
    coloredBoardTiles,
    gameInfo,
  } = useGameContext();
  const setTiles = () => {
    const tilesToColor: { x: number; y: number }[] = [];

    coloredSources.forEach((source) => {
      const { x, y } = source;
      if (x === 0 || x === boardWidth - 1) {
        Array.from({ length: boardWidth }).forEach((_, index) => {
          if (index > 0 && index < boardWidth - 1) {
            tilesToColor.push({ x: index, y });
          }
        });
      } else {
        Array.from({ length: boardHeight }).forEach((_, index) => {
          if (index > 0 && index < boardHeight - 1) {
            tilesToColor.push({ x, y: index });
          }
        });
      }
    });

    const coloredTiles = tilesToColor.map<ColoredTile>(({ x, y }) => ({
      x,
      y,
      color: getTileColor(x, y, boardWidth, boardHeight, coloredSources),
    }));

    setColoredBoardTiles(coloredTiles);
  };

  const getClosestColor = (): ColoredTile | null => {
    return coloredBoardTiles.reduce<ColoredTile | null>(
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
    setTiles();
  }, [coloredSources]);

  useEffect(() => {
    const closestTile = getClosestColor();
    if (!closestTile) return;
    setClosestColor(closestTile);
    setClosestColorDifference(
      getDifferenceWithTargetColor(closestTile.color, gameInfo.target),
    );
  }, [coloredBoardTiles]);

  return <>{children}</>;
};
