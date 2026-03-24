import { useBoardTileColor } from '../../../hooks/gameHooks';
import { Tile } from '../../tile/Tile';

type Props = {
  x: number;
  y: number;
};

export const BoardTile = ({ x, y }: Props) => {
  const color = useBoardTileColor(x, y);
  return <Tile color={color} />;
};
