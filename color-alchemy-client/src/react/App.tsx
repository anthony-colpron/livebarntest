import { GameBoard } from './components/gameBoard/GameBoard';
import { GameProvider } from './context/GameProvider';
import { useGameInfo } from './hooks/dataHooks';

export const App = () => {
  const gameInfo = useGameInfo();
  if (!gameInfo) return null;

  return (
    <GameProvider>
      <div>
        {Object.entries(gameInfo).map(([key, value]) => {
          return <div>{`${key}: ${value}`}</div>;
        })}
        <GameBoard gameInfo={gameInfo} />
      </div>
    </GameProvider>
  );
};
