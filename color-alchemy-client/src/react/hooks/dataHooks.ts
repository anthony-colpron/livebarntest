import type { GameInfo } from '../../data/parser/parser';
import { fetchGameInfo } from '../../data/provider/provider';
import { useQuery } from '@tanstack/react-query';

export const useGameInfo = (): GameInfo | null => {
  const { data } = useQuery({
    queryKey: ['getGameInfo'],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    gcTime: Infinity,
    staleTime: Infinity,
    queryFn: async () => {
      const parsedGameInfo = await fetchGameInfo();

      return parsedGameInfo;
    },
  });

  if (!data) return null;

  return data;
};
