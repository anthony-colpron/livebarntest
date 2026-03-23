import styles from './SourceCircle.module.css';
import { useSourceColor } from '../../../hooks/gameHooks';

type Props = {
  x: number;
  y: number;
};

export const SourceCircle = ({ x, y }: Props) => {
  const [r, g, b] = useSourceColor(x, y);
  const colorStyle = {
    backgroundColor: `rgb(${r}, ${g}, ${b})`,
  };

  return <div className={styles.container} style={colorStyle} />;
};
