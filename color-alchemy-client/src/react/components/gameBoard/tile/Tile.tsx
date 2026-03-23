import { useTileColor } from '../../../hooks/gameHooks';
import styles from './Tile.module.css';

type Props = {
  x: number;
  y: number;
};

export const Tile = ({ x, y }: Props) => {
  const [r, g, b] = useTileColor(x, y);

  const colorStyle = {
    backgroundColor: `rgb(${r}, ${g}, ${b})`,
  };

  return <div className={styles.container} style={colorStyle} />;
};
