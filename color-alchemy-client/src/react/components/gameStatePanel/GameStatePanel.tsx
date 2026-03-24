import type { GameInfo } from '../../../data/parser/parser';
import { useGameContext } from '../../context/gameContext';
import { Tile } from '../tile/Tile';
import styles from './GameStatePanel.module.css';
type Props = {
  gameInfo: GameInfo;
};

export const GameStatePanel = ({ gameInfo }: Props) => {
  const gameContext = useGameContext();
  return (
    <div>
      <h2>RGB Alchemy</h2>
      <div>User ID: {gameInfo.userId}</div>
      <div className={styles.row}>
        TargetColor: <Tile color={gameInfo.target} />
      </div>
      <div className={styles.row}>
        Closest color:{' '}
        <Tile color={gameContext.closestColor?.color || [0, 0, 0]} /> Δ={' '}
        {gameContext.closestColorDifference}
      </div>
    </div>
  );
};
