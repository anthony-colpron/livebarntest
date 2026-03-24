import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';
import { type ColoredTile, GameContext } from './gameContext';
import { useGameInfo } from '../hooks/dataHooks';
import type { ShapeColor } from '../../data/types';
import { getTileColor } from '../hooks/gameHooks';

type Props = PropsWithChildren;

const getColorForInitialMove = (initialMoves: number): ShapeColor => {
  if (initialMoves === 3) return [255, 0, 0];
  if (initialMoves === 2) return [0, 255, 0];

  return [0, 0, 255];
};

const getDifferenceWithTargetColor = (
  tileColor: ShapeColor,
  targetColor: ShapeColor,
): number => {
  return (
    (((1 / 255) * 1) / Math.sqrt(3)) *
    Math.sqrt(
      Math.pow(targetColor[0] - tileColor[0], 2) +
        Math.pow(targetColor[1] - tileColor[1], 2) +
        Math.pow(targetColor[2] - tileColor[2], 2),
    )
  );
};

export const GameProvider = ({ children }: Props) => {
  const [coloredSources, setColoredSources] = useState<ColoredTile[]>([]);
  const [initialMoves, setInitialMoves] = useState(3);
  const [closestColor, setClosestColor] = useState<ColoredTile>();
  const [closestColorDifference, setClosestColorDifference] =
    useState<number>();

  const gameInfo = useGameInfo();

  const boardWidth = gameInfo ? gameInfo.width + 2 : 0;
  const boardHeight = gameInfo ? gameInfo.height + 2 : 0;

  const [coloredBoardTiles, setColoredBoardTiles] = useState<ColoredTile[]>([]);

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
          getDifferenceWithTargetColor(
            boardTile.color,
            gameInfo?.target || [0, 0, 0],
          ) <
          getDifferenceWithTargetColor(acc.color, gameInfo?.target || [0, 0, 0])
        ) {
          return boardTile;
        }

        return acc;
      },
      null,
    );
  };

  useEffect(() => {
    // no set state loop
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTiles();
  }, [coloredSources]);

  useEffect(() => {
    const closestTile = getClosestColor();
    if (!closestTile) return;
    // no set state loop
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setClosestColor(closestTile);
    setClosestColorDifference(
      getDifferenceWithTargetColor(
        closestTile.color,
        gameInfo?.target || [0, 0, 0],
      ),
    );
  }, [coloredBoardTiles]);

  const setColoredSource = (sourceToSet: ColoredTile) => {
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
      coloredBoardTiles,
      setInitialSourceColor,
      initialMoves,
      boardWidth,
      boardHeight,
      closestColor,
      closestColorDifference,
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
    ],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
