import { useEffect, type PropsWithChildren, type SetStateAction } from 'react';
import { getDifferenceWithTargetColor } from './utils';
import { useGameContext } from './gameContext';
import type { ColoredTile } from '../../data/types';
import { useColoredTiles, useGameEnd } from '../hooks/gameHooks';

type Props = {
  setColoredBoardTiles: React.Dispatch<
    SetStateAction<Map<string, ColoredTile>>
  >;
  setClosestColor: React.Dispatch<SetStateAction<ColoredTile>>;
  setClosestColorDifference: React.Dispatch<SetStateAction<number>>;
  restartGame: (userId: string) => void;
} & PropsWithChildren;

export const EffectsLayer = ({
  setColoredBoardTiles,
  setClosestColor,
  setClosestColorDifference,
  restartGame,
  children,
}: Props) => {
  const { coloredBoardTiles, gameInfo } = useGameContext();

  useColoredTiles(setColoredBoardTiles);

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

  useGameEnd(restartGame);

  return <>{children}</>;
};
