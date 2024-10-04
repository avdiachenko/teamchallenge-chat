import styles from "./Spinner.module.css";

export const Spinner = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner} />
    </div>
  );
};
