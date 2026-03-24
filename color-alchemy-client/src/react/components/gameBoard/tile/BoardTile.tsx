import { useDraggable } from '@dnd-kit/react';
import { useBoardTileColor } from '../../../hooks/gameHooks';
import { Tile } from '../../tile/Tile';

type Props = {
  x: number;
  y: number;
};

export const BoardTile = ({ x, y }: Props) => {
  const color = useBoardTileColor(x, y);

  const { ref } = useDraggable({
    id: `${x},${y}`,
    feedback: 'clone',
    data: { color },
  });

  return <Tile ref={ref} color={color} />;
};
