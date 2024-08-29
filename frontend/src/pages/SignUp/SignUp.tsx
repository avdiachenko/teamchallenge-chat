import { Header } from "../../widgets/Header/Header";
import styles from "./SignUp.module.css";

export function SignUp() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>SignUp page</div>
    </div>
  );
}
