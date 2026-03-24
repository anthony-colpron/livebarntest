import { forwardRef, type CSSProperties, type Ref } from 'react';
import type { ShapeColor } from '../../../data/types';
import styles from './Tile.module.css';

type Props = {
  color: ShapeColor;
  cursor?: CSSProperties['cursor'];
};

export const Tile = forwardRef(
  ({ color, cursor = 'default' }: Props, ref: Ref<HTMLDivElement>) => {
    const [r, g, b] = color;

    const style = {
      backgroundColor: `rgb(${r}, ${g}, ${b})`,
      cursor,
    };

    return <div ref={ref} className={styles.container} style={style} />;
  },
);
