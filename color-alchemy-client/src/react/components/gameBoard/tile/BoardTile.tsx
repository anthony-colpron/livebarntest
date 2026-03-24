import { useGameContext } from '../../../context/gameContext';
import { BLACK } from '../../../hooks/gameHooks';
import { Tile } from '../../tile/Tile';

type Props = {
  x: number;
  y: number;
};

export const BoardTile = ({ x, y }: Props) => {
  const { coloredBoardTiles } = useGameContext();
  const coloredTile = coloredBoardTiles.find(
    ({ x: tileX, y: tileY }) => x === tileX && y === tileY,
  );

  return <Tile color={coloredTile?.color ?? BLACK} />;
};
