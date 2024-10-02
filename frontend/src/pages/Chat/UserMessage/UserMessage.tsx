import { MessageType } from "../../../entities/chat/chat.types";
import styles from "./UserMessage.module.css";

interface Props {
  message: MessageType;
}

export function UserMessage(props: Props) {
  const { message } = props;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <span className={styles.cardText}>{message.message}</span>
        </div>
        <span className={styles.cardDate}>
          {new Date(message.date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}
