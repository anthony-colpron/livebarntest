import styles from './Tile.module.css';

type Props = {
  color?: string;
  x: number;
  y: number;
};

export const Tile = ({ color = 'black' }: Props) => {
  const colorStyle = {
    backgroundColor: color,
  };

  return <div className={styles.container} style={colorStyle} />;
};
