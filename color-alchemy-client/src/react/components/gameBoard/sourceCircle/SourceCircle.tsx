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

  const hasInitialMoves = initialMoves > 0;

  const { ref, isDropTarget } = useDroppable({
    id: `${x},${y}`,
    data: { x, y },
  });

  const style = {
    backgroundColor: `rgb(${r}, ${g}, ${b})`,
    cursor: hasInitialMoves ? 'pointer' : 'default',
  };

  return (
    <div>
      {isDropTarget && <div className={styles.dropIndicator}>+</div>}
      <div
        ref={ref}
        className={styles.container}
        style={style}
        onClick={
          hasInitialMoves ? () => setInitialSourceColor(x, y) : undefined
        }
        data-tooltip-id="color-tooltip"
        data-tooltip-content={`${r}, ${g}, ${b}`}
        data-tooltip-variant="info"
        data-tooltip-offset={5}
      />
    </div>
  );
};
