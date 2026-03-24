import { forwardRef, type Ref } from 'react';
import type { ShapeColor } from '../../../data/types';
import styles from './Tile.module.css';

type Props = {
  color: ShapeColor;
};

export const Tile = forwardRef(({ color }: Props, ref: Ref<HTMLDivElement>) => {
  const [r, g, b] = color;

  const colorStyle = {
    backgroundColor: `rgb(${r}, ${g}, ${b})`,
  };

  return <div ref={ref} className={styles.container} style={colorStyle} />;
});
