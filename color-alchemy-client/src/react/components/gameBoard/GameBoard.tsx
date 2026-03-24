import styles from './GameBoard.module.css';
import { SourceCircle } from './sourceCircle/SourceCircle';
import { BoardTile } from './tile/BoardTile';
import { isCorner, isSide } from './utils';
import { useGameContext } from '../../context/gameContext';

export const GameBoard = () => {
  const { boardHeight, boardWidth, coloredSources } = useGameContext();

  const renderShape = (x: number, y: number) => {
    if (isCorner(x, y, boardWidth, boardHeight)) return null;

    if (isSide(x, y, boardWidth, boardHeight)) {
      return <SourceCircle x={x} y={y} />;
    }

    return <BoardTile x={x} y={y} />;
  };

  return (
    <>
      {coloredSources.map(({ x, y, color }) => (
        <div key={`${x}${y}`}>
          x: {x} y: {y}, color: {color}
        </div>
      ))}
      <div className={styles.container}>
        {Array.from({ length: boardHeight }).map((_, y) => (
          <div key={y} className={styles.row}>
            {Array.from({ length: boardWidth }).map((__, x) => {
              return (
                <div key={`${x}${y}`} className={styles.shapeContainer}>
                  {renderShape(x, y)}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
};
