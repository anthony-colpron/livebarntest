import { useCallback, useMemo, useState, type PropsWithChildren } from 'react';
import { type ColoredTile, DEFAULT_CLOSEST, GameContext } from './gameContext';
import type { ShapeColor } from '../../data/types';
import type { GameInfo } from '../../data/parser/parser';
import { EffectsLayer } from './EffectsLayer';
import { getDifferenceWithTargetColor } from './utils';

type Props = { gameInfo: GameInfo } & PropsWithChildren;

const getColorForInitialMove = (initialMoves: number): ShapeColor => {
  if (initialMoves === 3) return [255, 0, 0];
  if (initialMoves === 2) return [0, 255, 0];

  return [0, 0, 255];
};

export const GameProvider = ({ gameInfo, children }: Props) => {
  const [coloredSources, setColoredSources] = useState<ColoredTile[]>([]);
  const [initialMoves, setInitialMoves] = useState(3);
  const [totalMovesLeft, setTotalMovesLeft] = useState(gameInfo.maxMoves);
  const [closestColor, setClosestColor] =
    useState<ColoredTile>(DEFAULT_CLOSEST);
  const [closestColorDifference, setClosestColorDifference] = useState<number>(
    getDifferenceWithTargetColor(DEFAULT_CLOSEST.color, gameInfo.target),
  );

  const boardWidth = gameInfo.width + 2;
  const boardHeight = gameInfo.height + 2;

  const [coloredBoardTiles, setColoredBoardTiles] = useState<ColoredTile[]>([]);

  const setColoredSource = useCallback((sourceToSet: ColoredTile) => {
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
  }, []);

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
      >
        {children}
      </EffectsLayer>
    </GameContext.Provider>
  );
};
