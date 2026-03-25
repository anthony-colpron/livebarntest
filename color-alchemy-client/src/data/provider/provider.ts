import { parseGameInfo, type GameInfo } from '../parser/parser';

const host = 'http://localhost';
const port = 9876;

export const fetchGameInfo = async (
  userId?: string,
): Promise<GameInfo | null> => {
  const url = userId
    ? `${host}:${port}/init/user/${userId}`
    : `${host}:${port}/init`;

  const response = await fetch(url);

  return parseGameInfo(await response.json());
};
