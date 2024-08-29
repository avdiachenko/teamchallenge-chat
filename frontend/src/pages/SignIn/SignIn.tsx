import { Header } from "../../widgets/Header/Header";
import styles from "./SignIn.module.css";

export function SignIn() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>SignIn page</div>
    </div>
  );
}
