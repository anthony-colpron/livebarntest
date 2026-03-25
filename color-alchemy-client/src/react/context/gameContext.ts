import { createContext, useContext } from 'react';
import type { GameInfo } from '../../data/parser/parser';
import { type ColoredTile } from '../../data/types';
import { DEFAULT_CLOSEST } from '../../constants';

const stubGameInfo: GameInfo = {
  userId: '',
  height: 0,
  width: 0,
  maxMoves: 0,
  target: [0, 0, 0],
};

type ContextType = {
  coloredSources: ColoredTile[];
  coloredBoardTiles: Map<string, ColoredTile>;
  gameInfo: GameInfo;
  setInitialSourceColor: (x: number, y: number) => void;
  initialMoves: number;
  totalMovesLeft: number;
  boardHeight: number;
  boardWidth: number;
  closestColor: ColoredTile;
  closestColorDifference?: number;
  setColoredSource: (coloredTile: ColoredTile) => void;
};

export const GameContext = createContext<ContextType>({
  coloredSources: [],
  coloredBoardTiles: new Map(),
  gameInfo: stubGameInfo,
  setInitialSourceColor: () => {},
  initialMoves: 3,
  totalMovesLeft: 0,
  boardHeight: 0,
  boardWidth: 0,
  closestColor: DEFAULT_CLOSEST,
  setColoredSource: () => {},
});

export const useGameContext = () => useContext(GameContext);
