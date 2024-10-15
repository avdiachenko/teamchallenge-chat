import { MessageType } from "../../../entities/chat/chat.types";
import styles from "./Message.module.css";

interface Props {
  message: MessageType;
}

export function Message(props: Props) {
  const { message } = props;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {message.profilePicture && message.name && (
          <img src={message.profilePicture} alt={message.name} className={styles.avatar} />
        )}
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <span className={styles.cardName}>{message.name}</span>
            <span className={styles.cardText}>{message.text}</span>
          </div>
          <span className={styles.cardDate}>
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
