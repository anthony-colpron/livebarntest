import { useMemo, useState, type PropsWithChildren } from 'react';
import { type ColoredSource, GameContext } from './gameContext';

type Props = PropsWithChildren;

export const GameProvider = ({ children }: Props) => {
  const [coloredSources] = useState<ColoredSource[]>([
    { x: 3, y: 0, color: [255, 0, 0] },
  ]);

  const value = useMemo(
    () => ({
      coloredSources,
    }),
    [coloredSources],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
