import { createContext, useContext } from 'react';
import type { ShapeColor } from '../../data/types';
import type { GameInfo } from '../../data/parser/parser';

export type ColoredTile = {
  x: number;
  y: number;
  color: ShapeColor;
};

const stubGameInfo: GameInfo = {
  userId: '',
  height: 0,
  width: 0,
  maxMoves: 0,
  target: [0, 0, 0],
};

type ContextType = {
  coloredSources: ColoredTile[];
  coloredBoardTiles: ColoredTile[];
  gameInfo: GameInfo;
  setInitialSourceColor: (x: number, y: number) => void;
  initialMoves: number;
  totalMovesLeft: number;
  boardHeight: number;
  boardWidth: number;
  closestColor?: ColoredTile;
  closestColorDifference?: number;
  setColoredSource: (coloredTile: ColoredTile) => void;
};

export const GameContext = createContext<ContextType>({
  coloredSources: [],
  coloredBoardTiles: [],
  gameInfo: stubGameInfo,
  setInitialSourceColor: () => {},
  initialMoves: 3,
  totalMovesLeft: 0,
  boardHeight: 0,
  boardWidth: 0,
  setColoredSource: () => {},
});

export const useGameContext = () => useContext(GameContext);
