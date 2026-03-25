import { Tooltip } from 'react-tooltip';
import { GameBoard } from './components/gameBoard/GameBoard';
import { GameStatePanel } from './components/gameStatePanel/GameStatePanel';
import { GameProvider } from './context/GameProvider';
import { useGameInfo, type StartingGameInfo } from './hooks/dataHooks';
import { useState } from 'react';

export const App = () => {
  const [startingGameInfo, setStartingGameIndo] = useState<StartingGameInfo>({
    gameNumber: 1,
  });

  const restartGame = (userId: string) => {
    setStartingGameIndo((prevGameInfo) => {
      return {
        gameNumber: prevGameInfo.gameNumber + 1,
        userId,
      };
    });
  };

  const gameInfo = useGameInfo(startingGameInfo);
  if (!gameInfo) return null;

  return (
    <GameProvider gameInfo={gameInfo} restartGame={restartGame}>
      <div>
        <GameStatePanel />
        <GameBoard />
      </div>
      <Tooltip id="color-tooltip" />
    </GameProvider>
  );
};
