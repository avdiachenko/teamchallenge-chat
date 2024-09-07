import { AsideMenu } from "../../widgets/AsideMenu/AsideMenu";
import { Header } from "../../widgets/Header/Header";
import styles from "./Home.module.css";

export function Home() {
  return (
    <div>
      <AsideMenu />
      <Header title="Residential Complexes" />
      <div className={styles.container}>
        <div className={styles.content}>Home page</div>
      </div>
    </div>
  );
}
