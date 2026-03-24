import styles from './SourceCircle.module.css';
import { useSourceColor } from '../../../hooks/gameHooks';
import { useGameContext } from '../../../context/gameContext';
import { useDroppable } from '@dnd-kit/react';

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

  const { ref } = useDroppable({ id: `${x},${y}`, data: { x, y } });
  return (
    <div
      ref={ref}
      className={styles.container}
      style={colorStyle}
      onClick={initialMoves ? () => setInitialSourceColor(x, y) : undefined}
    />
  );
};
