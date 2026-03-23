import { createContext } from 'react';

export type ColoredSource = {
  x: number;
  y: number;
  color: [number, number, number];
};

type ContextType = {
  coloredSources: ColoredSource[];
};

export const GameContext = createContext<ContextType>({ coloredSources: [] });
