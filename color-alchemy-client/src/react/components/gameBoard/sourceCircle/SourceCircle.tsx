import styles from './SourceCircle.module.css';
import { useSourceColor } from '../../../hooks/gameHooks';
import { useGameContext } from '../../../context/gameContext';
import { useDraggable, useDroppable } from '@dnd-kit/react';

type Props = {
  x: number;
  y: number;
};

export const SourceCircle = ({ x, y }: Props) => {
  const { setInitialSourceColor, initialMoves, totalMovesLeft } =
    useGameContext();
  const [r, g, b] = useSourceColor(x, y);

  const hasInitialMoves = initialMoves > 0;
  const hasMovesLeft = totalMovesLeft > 0;

  const { ref: droppableRef, isDropTarget } = useDroppable({
    id: `${x},${y}`,
    data: { x, y },
  });
  const { ref: draggableRef, isDragSource } = useDraggable({
    id: `${x},${y}`,
    data: { x, y, color: [r, g, b] },
    feedback: 'clone',
    disabled: !hasMovesLeft || hasInitialMoves,
  });

  const getCursorStyle = () => {
    if (hasInitialMoves) return 'pointer';
    if (hasMovesLeft) return 'grab';

    return 'default';
  };

  const style = {
    backgroundColor: `rgb(${r}, ${g}, ${b})`,
    cursor: getCursorStyle(),
  };

  return (
    <div ref={droppableRef}>
      {isDropTarget && !isDragSource && (
        <div className={styles.dropIndicator}>+</div>
      )}
      <div
        ref={draggableRef}
        className={styles.container}
        style={style}
        onClick={
          hasInitialMoves ? () => setInitialSourceColor(x, y) : undefined
        }
      />
    </div>
  );
};
