import BsCashCoin from "../Icons/BsCashCoin.svg";
import BsFillExclamation from "../Icons/BsFillExclamation.svg";
import EventIcon from "../Icons/EventIcon.svg";
import { Notification } from "../notifications.types";
import styles from "./NotificationCard.module.css";

const cardTypeMap = {
  payments: "payments",
  emergency: "emergency messages",
  events: "events",
};

interface Props {
  notification: Notification;
}

export function NotificationCard(props: Props) {
  const { notification } = props;

  return (
    <div
      className={`${styles.container}
      ${notification.type === "payments" && styles.payments}
      ${notification.type === "emergency" && styles.emergency}
      ${notification.type === "events" && styles.events}`}
    >
      <div className={styles.imgBox}>
        {notification.type === "payments" && <img src={BsCashCoin} alt="payment icon" />}
        {notification.type === "emergency" && (
          <img src={BsFillExclamation} alt="emergency messages icon" />
        )}
        {notification.type === "events" && <img src={EventIcon} alt="event icon" />}
      </div>

      <div className={styles.content}>
        <div className={styles.title}>
          <span className={styles.type}>{cardTypeMap[notification.type]}</span>
          {/* <span className={styles.date}>{new Date(notification.createdAt).toLocaleString()}</span> */}
        </div>

        <span className={styles.text}>{notification.text}</span>
      </div>
    </div>
  );
}
