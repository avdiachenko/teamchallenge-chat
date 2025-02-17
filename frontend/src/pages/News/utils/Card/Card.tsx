import { FC, PropsWithChildren } from "react";
import styles from "./Card.module.css";
import ReactionButton from "../ReactionButton/ReactionButton";
import { ReactionButtonTypes } from "../types";
interface CardProps {
  title: string;
  reactionButtons?: ReactionButtonTypes[];
}
export const Card: FC<CardProps & PropsWithChildren> = ({ title, children, reactionButtons }) => {
  return (
    <div className={styles.container}>
      <div className={styles.image_header}></div>
      <main className={styles.main}>
        <h1 className={styles.title}>{title}</h1>
        <div>{children}</div>
        <footer className={styles.footer}>
          <div className={styles.buttonsContainer}>
            {reactionButtons &&
              reactionButtons.map((button) => <ReactionButton key={button.id} {...button} />)}
          </div>
          <p className={styles.date}>08.08.2024</p>
        </footer>
      </main>
    </div>
  );
};
