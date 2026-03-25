import { useMemo, useState, type PropsWithChildren } from 'react';
import { GameContext } from './gameContext';
import type { GameInfo } from '../../data/parser/parser';
import { EffectsLayer } from './EffectsLayer';
import { getDifferenceWithTargetColor } from './utils';
import { type ColoredTile } from '../../data/types';
import { DEFAULT_CLOSEST } from '../../constants';
import { useColoringMoves } from '../hooks/gameHooks';

type Props = {
  gameInfo: GameInfo;
  restartGame: (userId: string) => void;
} & PropsWithChildren;

export const GameProvider = ({ gameInfo, children, restartGame }: Props) => {
  const defaultDifference = getDifferenceWithTargetColor(
    DEFAULT_CLOSEST.color,
    gameInfo.target,
  );
  const [closestColor, setClosestColor] = useState(DEFAULT_CLOSEST);
  const [closestColorDifference, setClosestColorDifference] =
    useState(defaultDifference);

  const boardWidth = gameInfo.width + 2;
  const boardHeight = gameInfo.height + 2;

  const [coloredBoardTiles, setColoredBoardTiles] = useState<
    Map<string, ColoredTile>
  >(new Map());

  const {
    coloredSources,
    setColoredSource,
    totalMovesLeft,
    initialMoves,
    setInitialSourceColor,
  } = useColoringMoves(gameInfo);

  const value = useMemo(
    () => ({
      coloredSources,
      coloredBoardTiles,
      setInitialSourceColor,
      initialMoves,
      boardWidth,
      boardHeight,
      closestColor,
      closestColorDifference,
      gameInfo,
      setColoredSource,
      totalMovesLeft,
    }),
    [
      coloredSources,
      coloredBoardTiles,
      initialMoves,
      setInitialSourceColor,
      closestColor,
      closestColorDifference,
      boardWidth,
      boardHeight,
      gameInfo,
      setColoredSource,
      totalMovesLeft,
    ],
  );

  return (
    <GameContext.Provider value={value}>
      <EffectsLayer
        setClosestColor={setClosestColor}
        setClosestColorDifference={setClosestColorDifference}
        setColoredBoardTiles={setColoredBoardTiles}
        restartGame={restartGame}
      >
        {children}
      </EffectsLayer>
    </GameContext.Provider>
  );
};
