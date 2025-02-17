import { FC } from "react";
import styles from "./ReactionButton.module.css";
import { ReactionButtonTypes } from "../types";

const ReactionButton: FC<ReactionButtonTypes> = ({ emoji, count }) => {
  return (
    <button className={styles.button}>
      <span>{emoji}</span> <span>{count}</span>
    </button>
  );
};

export default ReactionButton;
