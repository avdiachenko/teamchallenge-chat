import { Notification } from "../../notifications.types";
import BsCashCoin from "./Icon/BsCashCoin.svg";
import BsFillExclamation from "./Icon/BsFillExclamation.svg";
import EventIcon from "./Icon/EventIcon.svg";
import styles from "./NotificationCard.module.css";

interface Props {
  notification: Notification;
}

export function NotificationCard(props: Props) {
  const { notification } = props;

  return (
    <div
      className={`${styles.container}
      ${notification.type === "Payments" && styles.payments}
      ${notification.type === "Emergency messages" && styles.emergency}
      ${notification.type === "Events" && styles.events}`}
    >
      <div className={styles.imgBox}>
        {notification.type === "Payments" && <img src={BsCashCoin} alt="payment icon" />}
        {notification.type === "Emergency messages" && (
          <img src={BsFillExclamation} alt="emergency messages icon" />
        )}
        {notification.type === "Events" && <img src={EventIcon} alt="event icon" />}
      </div>

      <div className={styles.content}>
        <span className={styles.type}>{notification.type}</span>

        <span className={styles.text}>{notification.text}</span>
      </div>
    </div>
  );
}
