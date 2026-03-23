import { useState } from 'react';
import type { GameInfo } from '../../data/parser/parser';
import { fetchGameInfo } from '../../data/provider/provider';
import { useQuery } from '@tanstack/react-query';

export const useGameInfo = (): GameInfo | null => {
  const [gameInfo, setGameInfo] = useState<GameInfo | null>(null);
  useQuery({
    queryKey: ['getGameInfo'],
    queryFn: async () => {
      const parsedGameInfo = await fetchGameInfo();
      setGameInfo(parsedGameInfo);
    },
  });

  return gameInfo;
};
