import { Header } from "../../widgets/Header/Header";
import styles from "./Home.module.css";

export function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>Home page</div>
    </div>
  );
}
