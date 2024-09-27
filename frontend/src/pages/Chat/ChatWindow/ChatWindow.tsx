import { useChatStore } from "../../../entities/chat/chat.store";
import styles from "./ChatWindow.module.css";

export function ChatWindow() {
  const { messages, sendMessage } = useChatStore();

  const handleSendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const message = e.currentTarget.value;
      sendMessage(message);
      e.currentTarget.value = "";
    }
  };

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
          {messages.map((message, index) => (
            <div className={styles.message} key={index}>
              {message}
            </div>
          ))}
        </div>

        <div className={styles.chatInput}>
          <input
            className={styles.input}
            type="text"
            placeholder={"Type your message here"}
            onKeyDown={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
}
