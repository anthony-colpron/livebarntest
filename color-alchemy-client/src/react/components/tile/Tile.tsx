import type { ShapeColor } from '../../../data/types';
import styles from './Tile.module.css';

type Props = {
  color: ShapeColor;
};

export const Tile = ({ color }: Props) => {
  const [r, g, b] = color;

  const colorStyle = {
    backgroundColor: `rgb(${r}, ${g}, ${b})`,
  };

  return <div className={styles.container} style={colorStyle} />;
};
