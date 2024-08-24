import { Header } from "../../widgets/Header/Header";
import styles from "./Home.module.css";
import reactLogo from "/react.svg";
import viteLogo from "/vite.svg";

export function Home() {
  return (
    <div className={styles.home}>
      <Header />
      <div className={styles.content}>
        <img src={reactLogo} className={styles.logo} alt="React logo" />
        <img src={viteLogo} className={styles.logo} alt="Vite logo" />
      </div>
    </div>
  );
}
