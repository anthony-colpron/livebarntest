import { createContext, useContext } from 'react';
import type { ShapeColor } from '../../data/types';

export type ColoredSource = {
  x: number;
  y: number;
  color: ShapeColor;
};

type ContextType = {
  coloredSources: ColoredSource[];
  setInitialSourceColor: (x: number, y: number) => void;
  initialMoves: number;
  boardHeight: number;
  boardWidth: number;
};

export const GameContext = createContext<ContextType>({
  coloredSources: [],
  setInitialSourceColor: () => {},
  initialMoves: 3,
  boardHeight: 0,
  boardWidth: 0,
});

export const useGameContext = () => useContext(GameContext);
