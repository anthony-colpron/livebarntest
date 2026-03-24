import { useCallback, useMemo, useState, type PropsWithChildren } from 'react';
import { type ColoredSource, GameContext } from './gameContext';
import { useGameInfo } from '../hooks/dataHooks';
import type { ShapeColor } from '../../data/types';

type Props = PropsWithChildren;

const getColorForInitialMove = (initialMoves: number): ShapeColor => {
  if (initialMoves === 3) return [255, 0, 0];
  if (initialMoves === 2) return [0, 255, 0];

  return [0, 0, 255];
};

export const GameProvider = ({ children }: Props) => {
  const [coloredSources, setColoredSources] = useState<ColoredSource[]>([]);
  const [initialMoves, setInitialMoves] = useState(3);
  const gameInfo = useGameInfo();

  const setColoredSource = (sourceToSet: ColoredSource) => {
    setColoredSources((prevColoredSources) => {
      const filteredColoredSources = prevColoredSources.filter(
        ({ x, y }) => sourceToSet.x !== x || sourceToSet.y !== y,
      );

      return [...filteredColoredSources, sourceToSet];
    });
  };

  const setInitialSourceColor = useCallback(
    (x: number, y: number) => {
      if (initialMoves < 1) return;
      const color = getColorForInitialMove(initialMoves);

      setColoredSource({ x, y, color });
      setInitialMoves((prevMoves) => prevMoves - 1);
    },
    [initialMoves],
  );

  const value = useMemo(
    () => ({
      coloredSources,
      setInitialSourceColor,
      initialMoves,
      boardWidth: gameInfo ? gameInfo.width + 2 : 0,
      boardHeight: gameInfo ? gameInfo.height + 2 : 0,
    }),
    [coloredSources, initialMoves, setInitialSourceColor, gameInfo],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
