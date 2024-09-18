import styles from "./ChatWindow.module.css";

export function ChatWindow() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.chatHeader}>
          <div className={styles.card}>
            <img src={"img.png"} alt={"John Doe"} className={styles.cardImg} />
            <div className={styles.cardInfo}>
              <span className={styles.cardName}>{"John Doe"}</span>
              <span className={styles.cardStatus}>{"Online"}</span>
            </div>
          </div>
          <div className={styles.points}>{"..."}</div>
        </div>

        <div className={styles.messageList}>
          <div className={styles.message}>Hello world</div>
        </div>

        <div className={styles.chatInput}>
          <input className={styles.input} type="text" placeholder={"Type your message here"} />
        </div>
      </div>
    </div>
  );
}
