import type { GameInfo } from '../../data/parser/parser';
import { fetchGameInfo } from '../../data/provider/provider';
import { useQuery } from '@tanstack/react-query';

export type StartingGameInfo = {
  gameNumber: number;
  userId?: string;
};

export const useGameInfo = (
  StartingGameInfo: StartingGameInfo,
): GameInfo | null => {
  const { data, isFetching } = useQuery({
    queryKey: ['getGameInfo', StartingGameInfo.gameNumber],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    gcTime: Infinity,
    staleTime: Infinity,
    queryFn: async () => {
      const parsedGameInfo = await fetchGameInfo(StartingGameInfo.userId);

      return parsedGameInfo;
    },
  });

  if (!data || isFetching) return null;

  return data;
};
