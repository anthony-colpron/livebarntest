import { Tooltip } from 'react-tooltip';
import { GameBoard } from './components/gameBoard/GameBoard';
import { GameStatePanel } from './components/gameStatePanel/GameStatePanel';
import { GameProvider } from './context/GameProvider';
import { useGameInfo } from './hooks/dataHooks';

export const App = () => {
  const gameInfo = useGameInfo();
  if (!gameInfo) return null;

  return (
    <GameProvider gameInfo={gameInfo}>
      <div>
        <GameStatePanel />
        <GameBoard />
      </div>
      <Tooltip id="color-tooltip" />
    </GameProvider>
  );
};
