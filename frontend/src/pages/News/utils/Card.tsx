import { FC, PropsWithChildren } from "react";
import styles from "./Card.module.css";
interface CardProps {
  title: string;
}
export const Card: FC<CardProps & PropsWithChildren> = ({ title, children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.image_header}></div>
      <main className={styles.main}>
        <h1 className={styles.title}>{title}</h1>
        <div>{children}</div>

        <p className={styles.date}>08.08.2024</p>
      </main>
    </div>
  );
};
