import styles from './SourceCircle.module.css';
import { useSourceColor } from '../../../hooks/gameHooks';
import { useGameContext } from '../../../context/gameContext';
import { useDraggable, useDroppable } from '@dnd-kit/react';

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

  const { ref: droppableRef, isDropTarget } = useDroppable({
    id: `${x},${y}`,
    data: { x, y },
  });
  const { ref: draggableRef, isDragSource } = useDraggable({
    id: `${x},${y}`,
    data: { x, y, color: [r, g, b] },
    feedback: 'clone',
  });

  return (
    <div ref={droppableRef}>
      {isDropTarget && !isDragSource && (
        <div className={styles.dropIndicator}>+</div>
      )}
      <div
        ref={draggableRef}
        className={styles.container}
        style={colorStyle}
        onClick={initialMoves ? () => setInitialSourceColor(x, y) : undefined}
      />
    </div>
  );
};
