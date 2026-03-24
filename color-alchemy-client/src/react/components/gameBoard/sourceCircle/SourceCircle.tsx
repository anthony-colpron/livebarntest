import styles from './SourceCircle.module.css';
import { useSourceColor } from '../../../hooks/gameHooks';
import { useGameContext } from '../../../context/gameContext';

type Props = {
  x: number;
  y: number;
};

export const SourceCircle = ({ x, y }: Props) => {
  const { setInitialSourceColor, initialMoves } = useGameContext();
  const [r, g, b] = useSourceColor(x, y);
  const colorStyle = {
    backgroundColor: `rgb(${r}, ${g}, ${b})`,
  };

  return (
    <div
      className={styles.container}
      style={colorStyle}
      onClick={initialMoves ? () => setInitialSourceColor(x, y) : undefined}
    />
  );
};
