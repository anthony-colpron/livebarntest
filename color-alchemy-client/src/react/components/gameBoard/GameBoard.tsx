import type { GameInfo } from '../../../data/parser/parser';
import styles from './GameBoard.module.css';
import { SourceCircle } from './sourceCircle/SourceCircle';
import { Tile } from './tile/Tile';
import { isCorner, isSide } from './utils';

type Props = {
  gameInfo: GameInfo;
};

export const GameBoard = ({ gameInfo }: Props) => {
  const boardHeight = gameInfo.height + 2;
  const boardWidth = gameInfo.width + 2;

  const renderShape = (x: number, y: number) => {
    if (isCorner(x, y, boardWidth, boardHeight)) return null;

    if (isSide(x, y, boardWidth, boardHeight)) {
      return <SourceCircle x={x} y={y} />;
    }

    return <Tile x={x} y={y} />;
  };

  return (
    <div className={styles.container}>
      {Array.from({ length: boardHeight }).map((_, y) => (
        <div className={styles.row}>
          {Array.from({ length: boardWidth }).map((__, x) => {
            return (
              <div className={styles.shapeContainer}>{renderShape(x, y)}</div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
