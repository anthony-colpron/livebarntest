import styles from './SourceCircle.module.css';

type Props = {
  color?: string;
  x: number;
  y: number;
};

export const SourceCircle = ({ color = 'black' }: Props) => {
  const colorStyle = {
    backgroundColor: color,
  };

  return <div className={styles.container} style={colorStyle} />;
};
