import BsCashCoin from "../Icons/BsCashCoin.svg";
import BsFillExclamation from "../Icons/BsFillExclamation.svg";
import EventIcon from "../Icons/EventIcon.svg";
import { Notification } from "../notifications.types";
import styles from "./NotificationCard.module.css";

const cardTypeMap = {
  Payments: "Payments",
  Emergency: "Emergency messages",
  Events: "Events",
};

interface Props {
  notification: Notification;
}

export function NotificationCard(props: Props) {
  const { notification } = props;

  return (
    <div
      className={`${styles.container}
      ${notification.type === "Payments" && styles.payments}
      ${notification.type === "Emergency" && styles.emergency}
      ${notification.type === "Events" && styles.events}`}
    >
      <div className={styles.imgBox}>
        {notification.type === "Payments" && <img src={BsCashCoin} alt="payment icon" />}
        {notification.type === "Emergency" && (
          <img src={BsFillExclamation} alt="emergency messages icon" />
        )}
        {notification.type === "Events" && <img src={EventIcon} alt="event icon" />}
      </div>

      <div className={styles.content}>
        <div className={styles.title}>
          <span className={styles.type}>{cardTypeMap[notification.type]}</span>
          <span className={styles.date}>{new Date(notification.createdAt).toLocaleString()}</span>
        </div>

        <span className={styles.text}>{notification.text}</span>
      </div>
    </div>
  );
}
