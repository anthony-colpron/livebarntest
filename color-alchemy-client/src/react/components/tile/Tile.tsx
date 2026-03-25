import { forwardRef, type CSSProperties, type Ref } from 'react';
import type { ShapeColor } from '../../../data/types';
import styles from './Tile.module.css';

type Props = {
  color: ShapeColor;
  isSelected?: boolean;
  cursor?: CSSProperties['cursor'];
};

export const Tile = forwardRef(
  (
    { color, cursor = 'default', isSelected = false }: Props,
    ref: Ref<HTMLDivElement>,
  ) => {
    const [r, g, b] = color;

    const roundedColors = `${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}`;

    const style = {
      backgroundColor: `rgb(${roundedColors})`,
      cursor,
      borderColor: isSelected ? 'red' : undefined,
    };

    return (
      <>
        <div
          ref={ref}
          className={styles.container}
          style={style}
          data-tooltip-id="color-tooltip"
          data-tooltip-content={`${roundedColors}`}
          data-tooltip-variant="info"
          data-tooltip-offset={5}
        />
      </>
    );
  },
);
