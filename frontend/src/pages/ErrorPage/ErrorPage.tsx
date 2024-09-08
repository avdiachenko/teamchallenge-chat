import { Link } from "react-router-dom";
import styles from "./ErrorPage.module.css";

export function ErrorPage() {
  return (
    <div className={styles.container}>
      <span className={styles.text}>Oops! Something went wrong.</span>
      <Link to="/" className={styles.link}>
        Back to Home
      </Link>
    </div>
  );
}
