import { type PropsWithChildren, type SetStateAction } from 'react';
import type { ColoredTile } from '../../data/types';
import {
  useClosestColor,
  useColoredTiles,
  useGameEnd,
} from '../hooks/gameHooks';

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
  useColoredTiles(setColoredBoardTiles);
  useClosestColor(setClosestColor, setClosestColorDifference);
  useGameEnd(restartGame);

  return <>{children}</>;
};
