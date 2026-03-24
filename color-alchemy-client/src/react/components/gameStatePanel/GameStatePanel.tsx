import { useGameContext } from '../../context/gameContext';
import { Tile } from '../tile/Tile';
import styles from './GameStatePanel.module.css';

export const GameStatePanel = () => {
  const { gameInfo, closestColor, closestColorDifference, totalMovesLeft } =
    useGameContext();
  return (
    <div>
      <h2>RGB Alchemy</h2>
      <div>User ID: {gameInfo.userId}</div>
      <div>Moves left: {totalMovesLeft}</div>
      <div className={styles.row}>
        TargetColor: <Tile color={gameInfo.target} />
      </div>
      <div className={styles.row}>
        Closest color: <Tile color={closestColor?.color || [0, 0, 0]} /> Δ={' '}
        {closestColorDifference}
      </div>
    </div>
  );
};
