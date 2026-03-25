import { useDraggable } from '@dnd-kit/react';
import { useBoardTileColor } from '../../../hooks/gameHooks';
import { Tile } from '../../tile/Tile';
import { useGameContext } from '../../../context/gameContext';
import { isBlack } from '../../../context/utils';

type Props = {
  x: number;
  y: number;
};

export const BoardTile = ({ x, y }: Props) => {
  const { totalMovesLeft, initialMoves, closestColor } = useGameContext();
  const color = useBoardTileColor(x, y);

  const { ref } = useDraggable({
    id: `${x},${y}`,
    feedback: 'clone',
    data: { color },
    disabled: totalMovesLeft < 1,
  });

  const cursor = totalMovesLeft > 1 && initialMoves < 1 ? 'grab' : 'default';
  const isClosest =
    !isBlack(closestColor.color) &&
    x === closestColor.x &&
    y === closestColor.y;

  return (
    <Tile ref={ref} color={color} cursor={cursor} isSelected={isClosest} />
  );
};
