import { createContext, useContext } from 'react';
import type { ShapeColor } from '../../data/types';

export type ColoredTile = {
  x: number;
  y: number;
  color: ShapeColor;
};

type ContextType = {
  coloredSources: ColoredTile[];
  coloredBoardTiles: ColoredTile[];
  setInitialSourceColor: (x: number, y: number) => void;
  initialMoves: number;
  boardHeight: number;
  boardWidth: number;
  closestColor?: ColoredTile;
  closestColorDifference?: number;
};

export const GameContext = createContext<ContextType>({
  coloredSources: [],
  coloredBoardTiles: [],
  setInitialSourceColor: () => {},
  initialMoves: 3,
  boardHeight: 0,
  boardWidth: 0,
});

export const useGameContext = () => useContext(GameContext);
