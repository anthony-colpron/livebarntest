import { parseGameInfo, type GameInfo } from '../parser/parser';

const host = 'http://localhost';
const port = 9876;

export const fetchGameInfo = async (): Promise<GameInfo | null> => {
  const response = await fetch(`${host}:${port}/init`);

  return parseGameInfo(await response.json());
};
